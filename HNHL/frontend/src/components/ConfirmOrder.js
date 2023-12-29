// Import necessary dependencies
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext, CartContext } from "../Context";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

// Define the base URL for API requests
const baseUrl = "http://127.0.0.1:8000/api";

// Define the ConfirmOrder component
function ConfirmOrder() {
  // State variables to manage order information and status
  const [orderId, setOrderId] = useState("");
  const [orderAmount, setOrderAmount] = useState(0);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Get user and cart information from context
  const userContext = useContext(UserContext);
  const { cartData, setCartData } = useContext(CartContext);
  const customerId = localStorage.getItem("customer_id");

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (userContext.login == null) {
      window.location.href = "/customer/login";
    } else {
      // If the user is logged in, call the addOrderInTable function
      if (confirmOrder === false) {
        addOrderInTable();
      }
    }
  }, [userContext.login, confirmOrder]);

  // Function to add order items to the database
  function orderItems(orderId) {
    var previousCart = localStorage.getItem(`cartData_${customerId}`);
    var cartJson = JSON.parse(previousCart);

    if (cartJson != null) {
      cartJson.forEach((cart, index) => {
        const formData = new FormData();
        formData.append("order", orderId);
        formData.append("product", cart.product.id);
        formData.append("qty", 1);
        formData.append("price", cart.product.price);
        formData.append("usd_price", cart.product.usd_price);
        formData.append("eur_price", cart.product.eur_price);

        axios
          .post(baseUrl + "/orderitems/", formData)
          .then(function (response) {
            cartJson.splice(index, cartData.length);
            localStorage.setItem(
              `cartData_${customerId}`,
              JSON.stringify(cartJson)
            );
            setCartData(cartJson);
            console.log("Removed from the cart");
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  }

  // Function to add an order to the orders table in the database
  function addOrderInTable() {
    if (orderId && !confirmOrder) {
      return;
    }

    const customerId = localStorage.getItem("customer_id");

    // Set prices in different currencies
    var totalAmount = 0;
    var totalUsdAmount = 0;
    var totalEurAmount = 0;

    var previousCart = localStorage.getItem(`cartData_${customerId}`);
    var cartJson = JSON.parse(previousCart);

    cartJson.forEach((cart, index) => {
      totalAmount += parseFloat(cart.product.price);
      totalUsdAmount += parseFloat(cart.product.usd_price);
      totalEurAmount += parseFloat(cart.product.eur_price);
    });

    totalAmount = totalAmount.toFixed(2);
    totalUsdAmount = totalUsdAmount.toFixed(2);
    totalEurAmount = totalEurAmount.toFixed(2);

    // Add customer ID and price values to the formData
    const formData = new FormData();
    formData.append("customer", customerId);
    formData.append("total_amount", totalAmount);
    formData.append("total_usd_amount", totalUsdAmount);
    formData.append("total_eur_amount", totalEurAmount);

    // Add to the orders table
    axios
      .post(baseUrl + "/orders/", formData)
      .then(function (response) {
        setOrderId(response.data.id);
        setOrderAmount(response.data.total_usd_amount);

        // Call the function to add order items
        orderItems(response.data.id);

        setConfirmOrder(true);
      })
      .catch(function (error) {
        console.log(error);
        setPaymentError(
          "There was an error processing the payment. Please try again."
        );
      });
  }

  // Function to update the order status in the database
  function updateOrderStatus() {
    // Check if the order has already been confirmed
    if (!confirmOrder) {
      return;
    }

    axios
      .post(baseUrl + "/update-order-status/" + orderId)
      .then(function (response) {
        window.location.href = "/order/success";
      })
      .catch(function (error) {
        console.log(error);
        window.location.href = "/order/failure";
      });
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-6 offset-3">
          <div className="card py-3 text-center">
            {paymentError ? (
              <h3>Error Processing Payment</h3>
            ) : (
              <>
                <h3>
                  <i className="fa fa-check-circle text-success"></i>Your Order
                  has been confirmed
                </h3>
                <h5>ORDER ID: {orderId}</h5>
                <h5>Price: {orderAmount} $</h5>
              </>
            )}
          </div>
          <div className="card p-3 mt-4">
            {orderAmount > 0 && (
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AbaaQ1EeoO_JeUq_Yu5ZaVTbfVvaYceYVpPndM6PXmaxVrY4c0r9U6KdQrLvvDO7GbQmKPzIFHLwDqja",
                }}
              >
                <PayPalButtons
                  className="mt-3"
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: orderAmount,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const name = details.payer.name.given_name;
                      updateOrderStatus();
                    });
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the ConfirmOrder component as the default export
export default ConfirmOrder;

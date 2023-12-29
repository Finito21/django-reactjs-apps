import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext, CurrencyContext } from "../Context";
import axios from "axios";

function Checkout(props) {
  const baseUrl = "http://127.0.0.1:8000/api";
  const { cartData, setCartData } = useContext(CartContext);
  const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
  const [productData, setproductData] = useState([]);
  const { CurrencyData } = useContext(CurrencyContext);
  console.log(cartData);
  console.log(CartContext);

  if (cartData == null || cartData.length == 0) {
    var cartItems = 0;
  } else {
    var cartItems = cartData.length;
  }

  var sum = 0;
  cartData.map((item, index) => {
    if (CurrencyData == "PLN" || CurrencyData == undefined) {
      sum += parseFloat(item.product.price);
    } else if (CurrencyData == "USD") {
      sum += parseFloat(item.product.usd_price);
    } else if (CurrencyData == "EUR") {
      sum += parseFloat(item.product.eur_price);
    }
  });
  sum = sum.toFixed(2);

  const cartRemoveButtonHandler = (product_id) => {
    var previousCart = localStorage.getItem(`cartData_${customer_id}`);
    var cartJson = JSON.parse(previousCart);
    cartJson.map((cart, index) => {
      if (cart != null && cart.product.id == product_id) {
        //delete cartJson[index];
        cartJson.splice(index, 1);
      }
    });
    var cartString = JSON.stringify(cartJson);
    localStorage.setItem(`cartData_${customer_id}`, cartString);
    setcartButtonClickStatus(false);
    setCartData(cartJson);
  };

  const [AddressList, setAddressList] = useState([]);
  var customer_id = localStorage.getItem("customer_id");
  const showProceedToPayment = AddressList.some(
    (address) => address.default_address
  );

  useEffect(() => {
    fetchData(baseUrl + "/customer/" + customer_id + "/address-list/");
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setAddressList(data.results);
      });
  }

  function DefaultAddressHandler(address_id) {
    const formData = new FormData();
    formData.append("address_id", address_id);

    axios
      .post(
        baseUrl + "/mark-default-address/" + parseInt(address_id) + "/",
        formData
      )
      .then(function (response) {
        if (response.data.bool == true) {
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function DefaultAddressHandler(address_id) {
    const formData = new FormData();
    formData.append("address_id", address_id);

    axios
      .post(
        baseUrl + "/mark-default-address/" + parseInt(address_id) + "/",
        formData
      )
      .then(function (response) {
        if (response.data.bool == true) {
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Items ({cartItems})</h3>
      {cartItems != 0 && (
        <div>
          <div className="row">
            <div className="col">
              <div class="table-responsive" style={{ borderRadius: "10px" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" class="h5">
                        Your Orders
                      </th>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems &&
                      cartData.map((item, index) => {
                        return (
                          <tr>
                            <th scope="row">
                              <div class="d-flex align-items-center">
                                <Link>
                                  <img
                                    src={item.product.image}
                                    className="img-thumbail"
                                    width="80"
                                    alt={item.product.title}
                                  />
                                </Link>
                              </div>
                            </th>
                            <td class="align-middle">
                              <div class="flex-column">
                                <p class="mb-2">
                                  <Link>{item.product.title}</Link>
                                </p>
                              </div>
                            </td>
                            <td class="align-middle">
                              {CurrencyData == "PLN" && (
                                <h5 className="card-title">
                                  Price: {item.product.price} zł
                                </h5>
                              )}
                              {CurrencyData == "USD" && (
                                <h5 className="card-title">
                                  Price: {item.product.usd_price} $
                                </h5>
                              )}
                              {CurrencyData == "EUR" && (
                                <h5 className="card-title">
                                  Price: {item.product.eur_price} €
                                </h5>
                              )}
                            </td>
                            <td class="align-middle">
                              <button
                                title="Remove from Cart"
                                type="button"
                                onClick={() =>
                                  cartRemoveButtonHandler(item.product.id)
                                }
                                className="btn btn-warning"
                              >
                                <i className="fa-solid fa-cart-plus"></i>Remove
                                from Cart
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>Total</th>
                      <th>
                        {(CurrencyData == "PLN" ||
                          CurrencyData == undefined) && <th>{sum} zł</th>}
                        {(CurrencyData == "USD" ||
                          CurrencyData == undefined) && <th>{sum} $</th>}
                        {(CurrencyData == "EUR" ||
                          CurrencyData == undefined) && <th>{sum} €</th>}
                      </th>
                    </tr>
                    <tr>
                      <td colSpan="4" align="center">
                        <Link to="/categories" className="btn btn-secondary">
                          Continue Shopping
                        </Link>

                        {showProceedToPayment && (
                          <Link
                            to="/confirm-order"
                            className="btn btn-success ms-1"
                          >
                            Proceed to Payment
                          </Link>
                        )}
                        {!showProceedToPayment && (
                          <Link
                            to="/confirm-order"
                            className="btn btn-success ms-1 disabled"
                          >
                            Proceed to Payment
                          </Link>
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <h3 className="mb-4">Choose Deliver Address</h3>
          <div>
            <Link
              to="/customer/add-address"
              className="btn btn-outline-success mb-4"
            >
              <i className="fa fa-plus-circle"></i>Add Address
            </Link>
          </div>
          <div className="col-md-9 col-12 mb-2">
            <div className="row">
              {AddressList.map((address, index) => {
                return (
                  <div className="col-4 mb-4">
                    <div className="card">
                      <div className="card-body text-muted">
                        <h6>
                          {address.default_address == true && (
                            <span>
                              <i className="fa fa-check-circle text-success mb-2"></i>
                              <br />
                            </span>
                          )}
                          {!address.default_address && (
                            <span
                              onClick={() => DefaultAddressHandler(address.id)}
                              role="button"
                            >
                              <i className="fa fa-check-circle text-secondary mb-2"></i>
                              <br />
                            </span>
                          )}
                          {
                            <Link to={`/customer/update-address/${address.id}`}>
                              {address.address}{" "}
                            </Link>
                          }
                        </h6>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {cartItems == 0 && (
        <div>
          <Link to="/categories" className="btn btn-success">
            Home
          </Link>
        </div>
      )}
    </div>
  );
}
export default Checkout;

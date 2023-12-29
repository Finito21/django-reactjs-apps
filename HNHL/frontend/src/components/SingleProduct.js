import { Link } from "react-router-dom";
import { CurrencyContext, CartContext, UserContext } from "../Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function SingleProduct(props) {
  // Base URL for API requests
  const baseUrl = "http://127.0.0.1:8000/api";

  // Contexts for currency, cart, and user data
  const { CurrencyData } = useContext(CurrencyContext);
  const { cartData, setCartData } = useContext(CartContext);
  const [ProductInWishlist, setProductInWishlist] = useState(false);
  const userContext = useContext(UserContext);
  const customerId = localStorage.getItem("customer_id");

  // Check if the product is in the user's wishlist when the component mounts
  useEffect(() => {
    checkProductInWishList(baseUrl + "/check-in-wishlist/", props.product.id);
  }, []);

  // Handler function to add a product to the cart
  const cartAddButtonHandler = () => {
    // Retrieve and parse the existing cart data from local storage
    var previousCart = localStorage.getItem(`cartData_${customerId}`);
    var cartJson = JSON.parse(previousCart);

    // Create cart data for the current product
    var cartData = {
      product: {
        id: props.product.id,
        title: props.product.title,
        price: props.product.price,
        usd_price: props.product.usd_price,
        eur_price: props.product.eur_price,
        image: props.product.image,
        purchase_count: props.product.purchase_count,
      },
      user: {
        id: 1,
      },
      total_amount: 10,
    };

    // Update cart data in local storage and state
    if (cartJson != null) {
      cartJson.push(cartData);
      var cartString = JSON.stringify(cartJson);
      localStorage.setItem(`cartData_${customerId}`, cartString);
      setCartData(cartJson);
    } else {
      var newCartList = [];
      newCartList.push(cartData);
      var cartString = JSON.stringify(newCartList);
      localStorage.setItem(`cartData_${customerId}`, cartString);
    }
  };

  // Function to save a product in the user's wishlist
  function saveInWishList() {
    const formData = new FormData();
    formData.append("customer", customerId);
    formData.append("product", props.product.id);

    axios
      .post(baseUrl + "/wishlist/", formData)
      .then(function (response) {
        if (response.data.id) {
          setProductInWishlist(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Function to check if a product is in the user's wishlist
  function checkProductInWishList(baseUrl, product_id) {
    const formData = new FormData();
    formData.append("customer", customerId);
    formData.append("product", product_id);

    axios
      .post(baseUrl, formData)
      .then(function (response) {
        if (response.data.bool == true) {
          setProductInWishlist(true);
        } else {
          setProductInWishlist(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Render a card displaying the product information
  return (
    <div className="col-12 col-md-3 mb-4" style={{ minWidth: "250px" }}>
      <div className="card">
        {/* Product image with a clickable link to the product details */}
        <Link to={`/product/${props.product.slug}/${props.product.id}`}>
          <img
            src={props.product.image}
            className="card-img-top"
            alt="..."
            style={{ height: "250px", width: "100%", objectFit: "contain" }}
          />
        </Link>
        <div
          className="card-body"
          style={{ height: "110px", width: "100%", objectFit: "contain" }}
        >
          {/* Product title with a clickable link to the product details */}
          <h4 className="card-title">
            <Link
              to={`/product/${props.product.slug}/${props.product.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {props.product.title}{" "}
            </Link>
          </h4>
          {/* Display price based on the selected currency */}
          {CurrencyData !== "USD" && CurrencyData !== "EUR" && (
            <h5 className="card-title">Price: {props.product.price} zł</h5>
          )}
          {CurrencyData === "USD" && (
            <h5 className="card-title">Price: {props.product.usd_price} $</h5>
          )}
          {CurrencyData === "EUR" && (
            <h5 className="card-title">Price: {props.product.eur_price} €</h5>
          )}
        </div>
        <div className="card-footer">
          {/* Display add to cart and wishlist buttons based on user login status */}
          {userContext.login && (
            <>
              {/* Add to cart button */}
              <button
                title="Add to Cart"
                type="button"
                onClick={cartAddButtonHandler}
                className="btn btn-primary"
              >
                <i className="fa-solid fa-cart-plus"></i>
              </button>

              {/* Add to wishlist button */}
              {!ProductInWishlist && (
                <button
                  onClick={saveInWishList}
                  title="Add to Wishlist"
                  className="btn btn-danger ms-1"
                >
                  <i className="fa fa-heart" />
                </button>
              )}
              {ProductInWishlist && (
                <button
                  title="Add to Wishlist"
                  className="btn btn-danger ms-1 disabled"
                >
                  <i className="fa fa-heart"></i>
                </button>
              )}
            </>
          )}
          {/* Display disabled buttons for non-logged-in users */}
          {userContext.login == null && (
            <>
              {/* Disabled add to cart button */}
              <button
                title="Add to Cart"
                type="button"
                className="btn btn-success disabled"
              >
                <i className="fa-solid fa-cart-plus"></i>
              </button>

              {/* Disabled add to wishlist button */}
              <button
                title="Add to Wishlist"
                className="btn btn-danger ms-1 disabled"
              >
                <i className="fa fa-heart"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Export the SingleProduct component as the default export
export default SingleProduct;

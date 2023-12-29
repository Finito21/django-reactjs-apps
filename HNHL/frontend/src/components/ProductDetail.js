import { Link } from "react-router-dom";
import SingleRelatedProduct from "./SingleRelatedProduct";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext, CartContext, CurrencyContext } from "../Context";
import axios from "axios";

function ProductDetail() {
  // Define the base URL for API requests
  const baseUrl = "http://127.0.0.1:8000/api";

  // State variables for storing product information
  const [productData, setproductData] = useState([]);
  const [productImgs, setproductImgs] = useState([]);
  const [productTags, setproductTags] = useState([]);
  const [relatedProducts, setrelatedProducts] = useState([]);

  // Get the product_id from the URL parameters
  const { product_id } = useParams();

  // State variable to check if the product is in the wishlist
  const [ProductInWishlist, setProductInWishlist] = useState(false);

  // Get cart data and user context from the CartContext and UserContext
  const { cartData, setCartData } = useContext(CartContext);
  const userContext = useContext(UserContext);

  // Get customer ID from local storage and currency data from CurrencyContext
  const customerId = localStorage.getItem("customer_id");
  const { CurrencyData } = useContext(CurrencyContext);

  // Function to fetch product data from the API
  function fetchData(baseurl) {
    fetch(baseurl + "/product/" + product_id);
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setproductData(data);
        setproductImgs(data.product_imgs);
        setproductTags(data.tag_list);
      });
  }

  // Function to fetch related product data from the API
  function fetchRelatedData(baseurl) {
    fetch(baseurl + "/related-products/" + product_id);
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setrelatedProducts(data.results);
      });
  }

  // Array to store links for product tags
  const tagsLinks = [];
  for (let i = 0; i < productTags.length; i++) {
    let tag = productTags[i].trim();
    tagsLinks.push(
      <Link
        className="badge bg-secondary text-white me-1"
        to={`/products/${tag}`}
      >
        {tag}
      </Link>
    );
  }

  // Function to handle adding the product to the cart
  const cartAddButtonHandler = () => {
    var previousCart = localStorage.getItem(`cartData_${customerId}`);
    var cartJson = JSON.parse(previousCart);

    // Prepare data for the current product
    var cartData = {
      product: {
        id: productData.id,
        title: productData.title,
        price: productData.price,
        usd_price: productData.usd_price,
        eur_price: productData.eur_price,
        image: productData.image,
        purchase_count: productData.purchase_count,
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

  // Function to save the product in the wishlist
  function saveInWishList() {
    const customerId = localStorage.getItem("customer_id");
    const formData = new FormData();
    formData.append("customer", customerId);
    formData.append("product", productData.id);

    // Make a POST request to save the product in the wishlist
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

  // Function to check if the product is in the wishlist
  function checkProductInWishList(baseUrl, product_id) {
    const customerId = localStorage.getItem("customer_id");
    const formData = new FormData();
    formData.append("customer", customerId);
    formData.append("product", product_id);

    // Make a POST request to check if the product is in the wishlist
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

  // useEffect to fetch data and check wishlist status on component mount
  useEffect(() => {
    fetchData(baseUrl + "/product/" + product_id);
    fetchRelatedData(baseUrl + "/related-products/" + product_id);
    checkProductInWishList(baseUrl + "/check-in-wishlist/", product_id);
  }, []);

  // Render the product details section
  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-4">
          {/* Product thumbnail carousel */}
          <div
            id="productThumbnailSlider"
            className="carousel carousel-dark slide"
            data-bs-ride="true"
          >
            {/* Carousel indicators */}
            <div className="carousel-indicators">
              {productImgs.map((img, index) => {
                if (index === 0) {
                  return (
                    <button
                      type="button"
                      data-bs-target="#productThumbnailSlider"
                      data-bs-slide-to={index}
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                  );
                } else {
                  return (
                    <button
                      type="button"
                      data-bs-target="#productThumbnailSlider"
                      data-bs-slide-to={index}
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                  );
                }
              })}
            </div>

            {/* Carousel inner content */}
            <div className="carousel-inner">
              {productImgs.map((img, index) => {
                return (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={index}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={img.image}
                        className="img-thumbnail mb-5"
                        alt={index}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel control buttons */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#productThumbnailSlider"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#productThumbnailSlider"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="col-8">
          <h3>{productData.title}</h3>
          <p>{productData.detail}</p>
          <p>{productData.purchase_count}</p>

          {/* Display price based on selected currency */}
          {CurrencyData != "USD" && CurrencyData != "EUR" && (
            <h5 className="card-title">Price: {productData.price} zł</h5>
          )}
          {CurrencyData == "USD" && (
            <h5 className="card-title">Price: {productData.usd_price} $</h5>
          )}
          {CurrencyData == "EUR" && (
            <h5 className="card-title">Price: {productData.eur_price} €</h5>
          )}

          {/* Add to Cart and Wishlist buttons */}
          <p className="mt-3">
            {userContext.login && (
              <>
                <button
                  title="Add to Cart"
                  type="button"
                  onClick={cartAddButtonHandler}
                  className="btn btn-primary"
                >
                  <i className="fa-solid fa-cart-plus"></i> Add to Cart
                </button>

                {!ProductInWishlist && (
                  <button
                    onClick={saveInWishList}
                    title="Add to Wishlist"
                    className="btn btn-danger ms-1"
                  >
                    <i className="fa fa-heart"></i> Wishlist
                  </button>
                )}
                {ProductInWishlist && (
                  <button
                    title="Add to Wishlist"
                    className="btn btn-danger ms-1 disabled"
                  >
                    <i className="fa fa-heart"></i> Wishlist
                  </button>
                )}
              </>
            )}
            {userContext.login == null && (
              <>
                <button
                  title="Add to Cart"
                  type="button"
                  className="btn btn-success disabled"
                >
                  <i className="fa-solid fa-cart-plus"></i> Add to Cart
                </button>

                <button
                  title="Add to Wishlist"
                  className="btn btn-danger ms-1 disabled"
                >
                  <i className="fa fa-heart"></i> Wishlist
                </button>
              </>
            )}
          </p>
          <hr />

          {/* Display product tags */}
          <div className="producttags mt-4">
            <h5>Tags</h5>
            <p>{tagsLinks}</p>
          </div>
        </div>
      </div>

      {/* Display related products */}
      <h3 className="mt-5 mb-3 text-center">Related Products</h3>
      <div
        id="relatedProductsSlider"
        className="carousel carousel-dark slide"
        data-bs-ride="true"
      >
        {/* Carousel indicators */}
        <div className="carousel-indicators">
          {relatedProducts.map((product, index) => {
            if (index === 0) {
              return (
                <button
                  type="button"
                  data-bs-target="#relatedProductsSlider"
                  data-bs-slide-to={index}
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
              );
            } else {
              return (
                <button
                  type="button"
                  data-bs-target="#relatedProductsSlider"
                  data-bs-slide-to={index}
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
              );
            }
          })}
        </div>

        {/* Carousel inner content */}
        <div className="carousel-inner">
          {relatedProducts.map((product, index) => {
            if (index === 0) {
              return (
                <div className="carousel-item active">
                  <SingleRelatedProduct product={product} />
                </div>
              );
            } else {
              return (
                <div className="carousel-item">
                  <SingleRelatedProduct product={product} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}

// Export the ProductDetail component as the default export
export default ProductDetail;

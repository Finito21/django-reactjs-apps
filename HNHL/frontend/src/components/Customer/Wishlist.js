import CustomerSidebar from "./CustomerSidebar";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CurrencyContext } from "../../Context";
import axios from "axios";

function Wishlist() {
  // Base API URL
  const baseUrl = "http://127.0.0.1:8000/api";
  // Base URL for images
  const url = "http://127.0.0.1:8000";
  // Get customer ID from local storage
  const customerId = localStorage.getItem("customer_id");
  // State to store wishlist items
  const [WishItems, setWishItems] = useState([]);

  // Access currency data from context
  const { CurrencyData } = useContext(CurrencyContext);

  // Function to fetch data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved wishlist items in the state
        setWishItems(data.results);
      });
  }

  // Function to remove an item from the wishlist
  function removeFromWishlist(wishlist_id) {
    const formData = new FormData();
    formData.append("wishlist_id", wishlist_id);

    axios
      .post(baseUrl + "/remove-from-wishlist/", formData)
      .then(function (response) {
        if (response.data.bool == true) {
          // Remove the corresponding row from the UI
          document.getElementById("row" + wishlist_id).remove();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Effect to fetch wishlist data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/customer/" + customerId + "/wishitems");
  }, []);

  // Render component
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Customer sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <CustomerSidebar></CustomerSidebar>
        </div>

        {/* Wishlist content */}
        <div className="col-md-9 col-12 mb-2">
          <div class="container">
            <div class="row d-flex justify-content-center align-items-center ">
              <div class="col">
                <div class="table-responsive" style={{ borderRadius: "10px" }}>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" class="h5">
                          Your Wishlist
                        </th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map each wishlist item to a table row */}
                      {WishItems.map((item, index) => {
                        return (
                          <tr id={`row${item.id}`} key={item.id}>
                            {/* Product image */}
                            <th scope="row">
                              <div class="d-flex align-items-center">
                                <Link
                                  to={`/product/${item.product.slug}/${item.product.id}`}
                                >
                                  <img
                                    src={`${url}/${item.product.image}`}
                                    className="img-thumbnail"
                                    width="80"
                                    alt="..."
                                  />
                                </Link>
                              </div>
                            </th>
                            {/* Product details */}
                            <td class="align-middle">
                              <div class="flex-column ms-4">
                                <p class="mb-2">
                                  {/* Link to the product page */}
                                  <Link
                                    to={`/product/${item.product.slug}/${item.product.id}`}
                                  >
                                    {item.product.title}
                                  </Link>
                                </p>
                              </div>
                            </td>
                            {/* Product price */}
                            <td class="align-middle">
                              {CurrencyData == "PLN" && (
                                <td>{item.product.price}</td>
                              )}
                              {CurrencyData == "USD" && (
                                <td>{item.product.usd_price}</td>
                              )}
                              {CurrencyData == "EUR" && (
                                <td>{item.product.eur_price}</td>
                              )}
                            </td>
                            {/* Remove from wishlist button */}
                            <td class="align-middle">
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFromWishlist(item.id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Wishlist;

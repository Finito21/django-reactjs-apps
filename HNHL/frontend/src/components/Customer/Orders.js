import CustomerSidebar from "./CustomerSidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrencyContext } from "../../Context";

//import axios from 'axios';

function Orders() {
  // Base URL for images
  const url = "http://127.0.0.1:8000";
  // Base API URL
  const baseUrl = "http://127.0.0.1:8000/api";
  // Get customer ID from local storage
  const customerId = localStorage.getItem("customer_id");
  // State to store order items
  const [OrderItems, setOrderItems] = useState([]);
  // Access currency data from context
  const { CurrencyData } = useContext(CurrencyContext);
  // State to store the total number of results
  const [totalResult, setTotalResults] = useState(0);

  // Function to fetch order items data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved order items in the state
        setOrderItems(data.results);
        setTotalResults(data.count);
        console.log(data.results);
        console.log(data.count);
      });
  }
  // Function to change the URL and fetch data
  function changeUrl(baseurl) {
    fetchData(baseurl);
  }

  // Fetch order items data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/customer/" + customerId + "/orderitems");
  }, []);

  // Pagination logic
  var links = [];
  var limit = 12;
  var totalLinks = Math.ceil(totalResult / limit);
  console.log(totalLinks);
  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li className="page-item" key={i}>
        {/* Link to navigate to different pages */}
        <Link
          onClick={() =>
            changeUrl(baseUrl + `/customer/${customerId}/orderitems/?page=${i}`)
          }
          to={`/customer/orders/?page=${i}`}
          className="page-link"
        >
          {i}
        </Link>
      </li>
    );
  }

  // Render component
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Customer sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <CustomerSidebar></CustomerSidebar>
        </div>

        {/* Order items content */}
        <div className="col-md-9 col-12 mb-2">
          <div class="container">
            <div class="row d-flex justify-content-center align-items-center ">
              <div class="col">
                <div class="table-responsive" style={{ borderRadius: "10px" }}>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map each order item to a table row */}
                      {OrderItems.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td class="align-middle">{item.order.id}</td>
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
                            {/* Paid status */}
                            <td class="align-middle">
                              <span>
                                {item.order.order_status == true && (
                                  <i className="fa fa-check-circle text-success"></i>
                                )}
                                {item.order.order_status == false && (
                                  <i className="fa fa-warning text-dark"></i>
                                )}
                              </span>
                            </td>
                            {/* Delivery status */}
                            <td class="align-middle">{item.delivery_status}</td>
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
        {/* Pagination navigation */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">{links}</ul>
        </nav>
      </div>
    </div>
  );
}

export default Orders;

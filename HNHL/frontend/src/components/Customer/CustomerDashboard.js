import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";

function CustomerDashboard(props) {
  // Base URL for API
  const baseUrl = "http://127.0.0.1:8000/api";

  // Get customer ID from local storage
  const customerId = localStorage.getItem("customer_id");

  // State variable to store counts
  const [countList, setCountList] = useState({
    totalOrders: 0,
    totalWishList: 0,
    totalAddress: 0,
  });

  // useEffect to fetch data when the component mounts or customerId changes
  useEffect(() => {
    fetchData(`${baseUrl}/customer/dashboard/${customerId}/`);
  }, [baseUrl, customerId]);

  // Function to fetch dashboard data
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Set countList state with data from the API
        setCountList({
          totalOrders: data.totalOrders,
          totalWishList: data.totalWishList,
          totalAddress: data.totalAddress,
        });
      });
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          {/* Include CustomerSidebar component */}
          <CustomerSidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="card" style={{ height: "100%" }}>
                <div className="card-body text-center">
                  <h4>Total</h4>
                  <h5>Orders</h5>
                  <h4>
                    {/* Link to customer orders page with totalOrders count */}
                    <Link to="/customer/orders">{countList.totalOrders}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card" style={{ height: "100%" }}>
                <div className="card-body text-center">
                  <h4>Total</h4>
                  <h5>Wishlist</h5>
                  <h4>
                    {/* Link to customer wishlist page with totalWishList count */}
                    <Link to="/customer/wishlist">
                      {countList.totalWishList}
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card" style={{ height: "100%" }}>
                <div className="card-body text-center">
                  <h4>Total</h4>
                  <h5>Addresses</h5>
                  <h4>
                    {/* Link to customer addresses page with totalAddress count */}
                    <Link to="/customer/addresses">
                      {countList.totalAddress}
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;

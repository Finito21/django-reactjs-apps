import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";

function VendorDashboard(props) {
  // Base URL for API requests
  const baseUrl = "http://127.0.0.1:8000/api";

  // Retrieve vendor ID from local storage
  const vendorId = localStorage.getItem("vendor_id");

  // State to store vendor-related data
  const [vendorData, setVendorData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  // Effect to fetch data when the component mounts or vendorId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the vendor dashboard endpoint
        const response = await fetch(
          `${baseUrl}/vendor/${vendorId}/dashboard/`
        );

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the response data as JSON and update the state
        const data = await response.json();
        setVendorData(data);
      } catch (error) {
        // Log an error message if there's an issue with fetching data
        console.error("Error fetching data:", error.message);
        // You might want to handle errors more gracefully, such as showing an error message to the user.
      }
    };

    // Call the fetchData function
    fetchData();
  }, [baseUrl, vendorId]);

  // Render the component
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          {/* Render the VendorSidebar component */}
          <VendorSidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="card" style={{ height: "100%" }}>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h4>TOTAL</h4>
                    <h6>NUMBER</h6>
                    <h6>OF</h6>
                    <h6>YOUR</h6>
                    <h6>PRODUCT</h6>
                  </div>
                  {/* Render a Link to the vendor products page with the totalProducts data */}
                  <h4>
                    <Link to="/vendor/products">
                      {vendorData.totalProducts}
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card" style={{ height: "100%" }}>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h4>TOTAL</h4>
                    <h6>NUMBER</h6>
                    <h6>OF</h6>
                    <h6>ORDERED</h6>
                    <h6>PRODUCT</h6>
                  </div>
                  {/* Render a Link to the vendor orders page with the totalOrders data */}
                  <h4>
                    <Link to="/vendor/orders">{vendorData.totalOrders}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card" style={{ height: "100%" }}>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h4>TOTAL</h4>
                    <h6>NUMBER</h6>
                    <h6>OF</h6>
                    <h6>YOUR</h6>
                    <h6>CLIENT</h6>
                  </div>
                  {/* Render a Link to the vendor customers page with the totalCustomers data */}
                  <h4>
                    <Link to="/vendor/customers">
                      {vendorData.totalCustomers}
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

// Export the VendorDashboard component as the default export
export default VendorDashboard;

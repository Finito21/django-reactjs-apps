// Importing VendorSidebar component for the vendor's sidebar navigation
import VendorSidebar from "./VendorSidebar";

// Importing necessary hooks and assets for state and UI
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Defining the base URL for API requests
const baseUrl = "http://127.0.0.1:8000/api/";

// Functional component for displaying and managing vendor orders
function VendorOrders() {
  // Retrieving vendor ID from local storage
  const vendor_id = localStorage.getItem("vendor_id");

  // State for storing the list of orders
  const [OrderList, setOrderList] = useState([]);

  // useEffect hook to fetch order data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + `vendor/${vendor_id}/orders/`);
  }, []);

  // Function to fetch order data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setOrderList(data.results);
        console.log(data.results);
      });
  }

  // Rendering the component with order data displayed in a table
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          {/* Displaying the vendor sidebar */}
          <VendorSidebar></VendorSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div>
            {/* Table to display order information */}
            <div
              className="table-responsive d-flex justify-content-center align-items-center"
              style={{ borderRadius: "10px" }}
            >
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Address</th>
                    <th scope="col">Customer Email</th>
                    <th scope="col">Customer Mobile</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderList.map((item, index) => (
                    <tr key={index}>
                      {/* Displaying order details */}
                      <td className="align-middle">{item.id}</td>
                      <td className="align-middle">
                        {item.customer.customer_addresses.map((address) =>
                          address.default_address ? address.address : null
                        )}
                      </td>
                      <td className="align-middle">
                        {item.customer.user.email}
                      </td>
                      <td className="align-middle">{item.customer.mobile}</td>
                      {/* Link to navigate to order details */}
                      <td className="align-middle">
                        <th>
                          <Link
                            to={`/vendor/${vendor_id}/customer/${item.customer.id}/orderitems/${item.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            Details
                          </Link>
                        </th>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting the VendorOrders component as the default export
export default VendorOrders;

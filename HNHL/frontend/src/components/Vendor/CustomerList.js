// CustomersList.js
import React from "react";

// Define the base URL for API requests
const baseUrl = "http://127.0.0.1:8000/api/";

function CustomersList({ customerList }) {
  // Function to show confirmation dialog for deleting a customer
  function showConfirm(customer_id) {
    // Display a confirmation dialog
    var _confirm = window.confirm("Are you sure to delete this Customer?");

    // If user confirms, send a DELETE request to the API
    if (_confirm) {
      fetch(baseUrl + "delete-customer-orders/" + customer_id, {
        method: "DELETE",
      }).then((response) => {
        // Check if the deletion was successful
        if (response.bool === true) {
          // If successful, fetch updated data and refresh the page
          fetchData(baseUrl + "vendor/customer/" + customer_id + "/orderitems");
        }
        // Reload the page to reflect the changes
        window.location.reload();
      });
    }
  }

  // Render the component
  return (
    <div className="container mt-4">
      <div
        className="table-responsive d-flex justify-content-center align-items-center"
        style={{ borderRadius: "10px" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the customerList and render a table row for each customer */}
            {customerList.map((item, index) => (
              <tr key={index}>
                <td className="align-middle">{item.user.username}</td>
                <td className="align-middle">{item.user.email}</td>
                <td className="align-middle">{item.customer.mobile}</td>
                <td className="align-middle">
                  {/* Button to trigger the showConfirm function for customer removal */}
                  <button
                    onClick={() => showConfirm(item.customer.id)}
                    className="btn btn-danger btn-sm ms-1"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Export the CustomersList component as the default export
export default CustomersList;

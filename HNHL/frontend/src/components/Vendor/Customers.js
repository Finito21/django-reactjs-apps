// Customers.js
import VendorSidebar from "./VendorSidebar";
import { useState, useEffect } from "react";
import CustomersList from "./CustomerList";

const baseUrl = "http://127.0.0.1:8000/api/";

function Customers() {
  // Retrieve vendor_id from local storage
  const vendor_id = localStorage.getItem("vendor_id");

  // State variable to store the list of unique customers
  const [customerList, setCustomerList] = useState([]);

  // Fetch customer data on component mount
  useEffect(() => {
    fetchData(`${baseUrl}vendor/${vendor_id}/customers/`);
  }, [vendor_id]);

  // Function to fetch customer data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Remove duplicates based on the customer ID
        const uniqueCustomers = data.results.filter(
          (customer, index, self) =>
            index ===
            self.findIndex((c) => c.customer.id === customer.customer.id)
        );
        setCustomerList(uniqueCustomers);
      });
  }

  // Render the component
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          {/* Render the VendorSidebar component */}
          <VendorSidebar></VendorSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          {/* Render the CustomersList component and pass the customerList as a prop */}
          <CustomersList customerList={customerList} />
        </div>
      </div>
    </div>
  );
}

// Export the Customers component as the default export
export default Customers;

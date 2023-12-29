import CustomerSidebar from "./CustomerSidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AddressList() {
  // Base URL for API
  const baseUrl = "http://127.0.0.1:8000/api";

  // Get customer ID from local storage
  var customer_id = localStorage.getItem("customer_id");

  // State variable to store the list of addresses
  const [addressList, setAddressList] = useState([]);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/customer/" + customer_id + "/address-list/");
  }, []);

  // Function to fetch address data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setAddressList(data.results);
      });
  }

  // Function to handle setting a default address
  function DefaultAddressHandler(address_id) {
    const formData = new FormData();
    formData.append("address_id", address_id);

    axios
      .post(
        baseUrl + "/mark-default-address/" + parseInt(customer_id) + "/",
        formData
      )
      .then(function (response) {
        if (response.data.bool === true) {
          // Reload the page after successfully marking the default address
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          {/* Include CustomerSidebar component */}
          <CustomerSidebar></CustomerSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-12">
              {/* Link to add a new address */}
              <Link
                to="/customer/add-address"
                className="btn btn-outline-success mb-4"
              >
                <i className="fa fa-plus-circle"></i> Add Address
              </Link>
            </div>
          </div>
          <div className="row">
            {/* Map through the list of addresses and display each one */}
            {addressList.map((address, index) => {
              return (
                <div className="col-4 mb-4" key={index}>
                  <div className="card">
                    <div className="card-body text-muted">
                      <h6>
                        {/* Display a check mark for default addresses */}
                        {address.default_address === true && (
                          <span>
                            <i className="fa fa-check-circle text-success mb-2"></i>
                            <br />
                          </span>
                        )}
                        {/* Display an empty circle for non-default addresses */}
                        {!address.default_address && (
                          <span
                            onClick={() => DefaultAddressHandler(address.id)}
                            role="button"
                          >
                            <i className="fa fa-check-circle text-secondary mb-2"></i>
                            <br />
                          </span>
                        )}
                        {/* Link to update the address */}
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
    </div>
  );
}

export default AddressList;

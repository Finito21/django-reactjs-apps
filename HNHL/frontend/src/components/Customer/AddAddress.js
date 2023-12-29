import CustomerSidebar from "./CustomerSidebar";
import { useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function AddAddress() {
  // Get customer ID from local storage
  var customer_id = localStorage.getItem("customer_id");

  // State variables for error message, success message, and address form data
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [addressFormData, setAddressFormData] = useState({
    address: "",
    customer: customer_id,
  });

  // Handler for input changes
  const inputHandler = (event) => {
    setAddressFormData({
      ...addressFormData,
      [event.target.name]: event.target.value,
    });
  };

  // Handler for form submission
  const submitHandler = () => {
    // Create FormData for API request
    const formData = new FormData();
    formData.append("address", addressFormData.address);
    formData.append("customer", addressFormData.customer);

    // API call to add a new address
    axios
      .post(baseUrl + "/address/", formData)
      .then(function (response) {
        if (response.status !== 201) {
          setErrorMsg("Data not saved");
          setSuccessMsg("");
        } else {
          setErrorMsg("");
          setSuccessMsg("Data saved");
          // Clear the address field after successful submission
          setAddressFormData({
            address: "",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Disable the button if the address field is empty
  const disableBtn = addressFormData.address === "";

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          {/* Include CustomerSidebar component */}
          <CustomerSidebar></CustomerSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="card">
            <h4 className="card-header">Add Address</h4>
            <div className="card-body">
              {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
              {successMsg && (
                <p className="alert alert-success">{successMsg}</p>
              )}
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  className="form-control"
                  name="address"
                  onChange={inputHandler}
                  value={addressFormData.address}
                  id="address"
                ></textarea>
              </div>
              {/* Submit button */}
              <button
                type="button"
                disabled={disableBtn}
                onClick={submitHandler}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;

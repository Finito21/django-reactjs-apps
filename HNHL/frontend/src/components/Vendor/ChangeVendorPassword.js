// ChangeVendorPassword.js
import VendorSidebar from "./VendorSidebar";
import { useState } from "react";
import axios from "axios";

// Define the base URL for API requests
const baseUrl = "http://127.0.0.1:8000/api";

function ChangeVendorPassword() {
  // Retrieve vendor_id from local storage
  var vendor_id = localStorage.getItem("vendor_id");

  // State to manage password input data
  const [PasswordData, setPasswordData] = useState({
    password: "",
    c_password: "",
  });

  // State to manage confirmation error
  const [ConfirmError, setConfirmError] = useState(false);

  // Handle input changes for password fields
  const inputHandler = (event) => {
    setPasswordData({
      ...PasswordData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const submitHandler = (event) => {
    // Check if passwords match
    if (PasswordData.password === PasswordData.c_password) {
      setConfirmError(false); // If matched, clear the confirmation error
    } else {
      setConfirmError(true); // If not matched, set the confirmation error
    }

    // Prepare form data for API request
    const formData = new FormData();
    formData.append("password", PasswordData.password);

    // Send a POST request to change the vendor's password
    axios
      .post(baseUrl + "/vendor-change-password/" + vendor_id, formData)
      .then(function (response) {
        console.log(response); // Log the response from the API
      })
      .catch(function (error) {
        console.log(error); // Log any errors that occur during the request
      });
  };

  // Render the component
  return (
    <div className="container mt-4">
      <div className="row">
        {/* VendorSidebar component for navigation */}
        <div className="col-md-3 col-12 mb-2">
          <VendorSidebar></VendorSidebar>
        </div>

        {/* Main content for changing vendor password */}
        <div className="col-md-9 col-12 mb-2">
          <div className="card">
            <h4 className="card-header">Change Password</h4>
            <div className="card-body">
              <form>
                {/* Input for new password */}
                <div className="mb-3">
                  <label htmlFor="pwd" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={PasswordData.password}
                    onChange={inputHandler}
                    className="form-control"
                    id="pwd"
                  />
                </div>

                {/* Input for confirming new password */}
                <div className="mb-3">
                  <label htmlFor="cpwd" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="c_password"
                    value={PasswordData.c_password}
                    onChange={inputHandler}
                    className="form-control"
                    id="cpwd"
                  />
                </div>

                {/* Button to submit the form */}
                <button
                  type="button"
                  onClick={submitHandler}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the ChangeVendorPassword component as the default export
export default ChangeVendorPassword;

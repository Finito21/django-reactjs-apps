import CustomerSidebar from "./CustomerSidebar";
import { useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function ChangeCustomerPassword() {
  // Get customer ID from local storage
  var customer_id = localStorage.getItem("customer_id");

  // State variables for success message, password data, and confirmation error
  const [successMsg, setSuccessMsg] = useState("");
  const [passwordData, setPasswordData] = useState({
    password: "",
    c_password: "",
  });
  const [confirmError, setConfirmError] = useState(false);

  // Handler for input changes
  const inputHandler = (event) => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value,
    });
  };

  // Handler for form submission
  const submitHandler = (event) => {
    // Check if the entered passwords match
    if (passwordData.password === passwordData.c_password) {
      setConfirmError(false); // Passwords match, no error
    } else {
      setConfirmError(true); // Passwords do not match, set error
    }

    // Create FormData for API request
    const formData = new FormData();
    formData.append("password", passwordData.password);

    // API call to change customer password
    axios
      .post(baseUrl + "/customer-change-password/" + customer_id, formData)
      .then(function (response) {
        console.log(response);
        setSuccessMsg(response.data.msg); // Set success message from API response
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          {/* Include CustomerSidebar component */}
          <CustomerSidebar></CustomerSidebar>
        </div>

        <div className="col-md-9 col-12 mb-2">
          <div className="card">
            <h4 className="card-header">Change Password</h4>
            <div className="card-body">
              {successMsg && <p className="text-success">{successMsg}</p>}
              <form>
                {/* Input for new password */}
                <div className="mb-3">
                  <label htmlFor="pwd" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={passwordData.password}
                    onChange={inputHandler}
                    className="form-control"
                    id="pwd"
                  />
                </div>
                {/* Input for confirming the new password */}
                <div className="mb-3">
                  <label htmlFor="cpwd" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="c_password"
                    value={passwordData.c_password}
                    onChange={inputHandler}
                    className="form-control"
                    id="cpwd"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={submitHandler}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
              {/* Display error if passwords do not match */}
              {confirmError && (
                <p className="text-danger">Passwords do not match.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeCustomerPassword;

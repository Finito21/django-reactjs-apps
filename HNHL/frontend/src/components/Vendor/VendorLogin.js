// Importing necessary modules
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../switcher.css";

// Component for handling vendor login
function VendorLogin(props) {
  // Defining the base URL for API requests
  const baseUrl = "http://127.0.0.1:8000/api/";

  // State for managing login form data
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  // Hook for navigation in React Router
  const navigate = useNavigate();

  // Function to toggle between vendor and customer login
  const handleSwitchToggle = () => {
    navigate("/customer/login");
  };

  // States for form error and error message
  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Function to handle input changes in the login form
  const inputHandler = (event) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle form submission
  const submitHandler = (event) => {
    const formData = new FormData();
    formData.append("username", loginFormData.username);
    formData.append("password", loginFormData.password);

    axios
      .post(baseUrl + "vendor/login/", formData)
      .then(function (response) {
        if (response.data.bool === false) {
          setFormError(true);
          setErrorMsg(response.data.msg);
        } else {
          // Storing vendor information in local storage upon successful login
          localStorage.setItem("vendor_id", response.data.id);
          localStorage.setItem("vendor_login", true);
          localStorage.setItem("vendor_username", response.data.user);

          // Resetting form error states
          setFormError(false);
          setErrorMsg("");

          // Redirecting to the vendor dashboard
          window.location.href = "/vendor/dashboard";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Checking if the vendor is already logged in and redirecting if true
  const checkVendor = localStorage.getItem("vendor_login");
  if (checkVendor) {
    window.location.href = "/vendor/dashboard";
  }

  // Enabling the submit button only if both username and password are provided
  const buttonEnable =
    loginFormData.username !== "" && loginFormData.password !== "";

  // Rendering the vendor login component
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header">Login as a Seller</h4>
            <div className="card-body">
              {formError && <p className="text-danger">{errorMsg}</p>}
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={loginFormData.username}
                    onChange={inputHandler}
                    className="form-control"
                    id="username"
                  />
                </div>

                <div className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={loginFormData.password}
                      onChange={inputHandler}
                      className="form-control"
                      id="pwd"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!buttonEnable}
                  onClick={submitHandler}
                  className="btn btn-primary"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
          {/* Switch button to toggle between vendor and customer login */}
          <div className="switch d-flex align-items-center justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSwitchToggle}
            >
              Login as Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting the VendorLogin component as the default export
export default VendorLogin;

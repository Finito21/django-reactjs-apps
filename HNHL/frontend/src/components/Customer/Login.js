import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "../../switcher.css";

function Login(props) {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [formError, setFormError] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Use useNavigate for navigation

  // Handle switch toggle for switching to the seller login
  const handleSwitchToggle = () => {
    navigate("/vendor/login"); // Use navigate for navigation
  };

  // Handle input changes in the form
  const inputHandler = (event) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", loginFormData.username);
    formData.append("password", loginFormData.password);

    axios
      .post(baseUrl + "customer/login/", formData)
      .then(function (response) {
        if (response.data.bool === false) {
          setFormError(true);
          seterrorMsg(response.data.msg);
        } else {
          // Set customer details in local storage upon successful login
          localStorage.setItem("customer_id", response.data.id);
          localStorage.setItem("customer_login", true);
          localStorage.setItem("customer_username", response.data.user);
          setFormError(false);
          seterrorMsg("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Redirect to customer dashboard if already logged in
  const checkCustomer = localStorage.getItem("customer_login");
  if (checkCustomer) {
    window.location.href = "/customer/dashboard";
  }

  // Enable the submit button only if both username and password are provided
  const buttonEnable =
    loginFormData.username !== "" && loginFormData.password !== "";

  // Render the login component
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
              {formError && <p className="text-danger">{errorMsg}</p>}
              {/* Login form */}
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
                {/* Submit button */}
                <button
                  type="button"
                  disabled={!buttonEnable}
                  onClick={submitHandler}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Switch button for navigating to the seller login */}
          <div className="switch d-flex align-items-center justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSwitchToggle}
            >
              Login as Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

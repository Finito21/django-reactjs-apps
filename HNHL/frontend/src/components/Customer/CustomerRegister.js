import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerRegister(props) {
  // Base URL for API
  const baseUrl = "http://127.0.0.1:8000/api/";

  // State variables for error and success messages
  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");

  // Use useNavigate for navigation
  const navigate = useNavigate();

  // State variable for form data
  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  // Handler for input changes
  const inputHandler = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value,
    });
  };

  // Handler for switching to vendor registration
  const handleSwitchToggle = () => {
    navigate("/vendor/register"); // Use navigate for navigation
  };

  // Handler for form submission
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("first_name", registerFormData.first_name);
    formData.append("last_name", registerFormData.last_name);
    formData.append("username", registerFormData.username);
    formData.append("email", registerFormData.email);
    formData.append("mobile", registerFormData.mobile); // Mobile field added to FormData
    formData.append("password", registerFormData.password);

    // API call to register customer
    axios
      .post(baseUrl + "customer/register/", formData)
      .then(function (response) {
        if (response.data.bool === false) {
          seterrorMsg(response.data.msg);
          setsuccessMsg("");
        } else {
          // Clear form data on successful registration
          setRegisterFormData({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
          });
          seterrorMsg("");
          setsuccessMsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Enable submit button when all fields are filled
  const buttonEnable =
    registerFormData.first_name !== "" &&
    registerFormData.last_name !== "" &&
    registerFormData.username !== "" &&
    registerFormData.email !== "" &&
    registerFormData.mobile !== "" && // Mobile field included
    registerFormData.password !== "";

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header">Register</h4>
            <div className="card-body">
              <p className="text-muted">
                <strong>Note:</strong> All fields are required
              </p>
              {successMsg && <p className="text-success">{successMsg}</p>}
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <form>
                {/* Input for first name */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    onChange={inputHandler}
                    value={registerFormData.first_name}
                    name="first_name"
                    className="form-control"
                    id="firstName"
                  />
                </div>
                {/* Input for last name */}
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="email"
                    onChange={inputHandler}
                    value={registerFormData.last_name}
                    name="last_name"
                    className="form-control"
                    id="lastName"
                  />
                </div>
                {/* Input for username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    onChange={inputHandler}
                    value={registerFormData.username}
                    name="username"
                    className="form-control"
                    id="username"
                  />
                </div>
                {/* Input for email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={inputHandler}
                    name="email"
                    value={registerFormData.email}
                    className="form-control"
                    id="email"
                  />
                </div>
                {/* Input for mobile */}
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="number"
                    onChange={inputHandler}
                    name="mobile"
                    value={registerFormData.mobile}
                    className="form-control"
                    id="mobile"
                  />
                </div>
                {/* Input for password */}
                <div className="mb-3">
                  <label htmlFor="pwd" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={inputHandler}
                    name="password"
                    value={registerFormData.password}
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
                  Register
                </button>
              </form>
            </div>
          </div>
          {/* Switch button to register as a seller */}
          <div className="switch d-flex align-items-center justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSwitchToggle}
            >
              Register as Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;

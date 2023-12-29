import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VendorRegister(props) {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  });

  const inputHandler = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSwitchToggle = () => {
    navigate("/customer/register"); // Use navigate for navigation
  };

  const submitHandler = (event) => {
    const formData = new FormData();
    formData.append("first_name", registerFormData.first_name);
    formData.append("last_name", registerFormData.last_name);
    formData.append("username", registerFormData.username);
    formData.append("email", registerFormData.email);
    formData.append("mobile", registerFormData.mobile);
    formData.append("address", registerFormData.address);
    formData.append("password", registerFormData.password);

    axios
      .post(baseUrl + "vendor/register/", formData)
      .then(function (response) {
        if (response.data.bool === false) {
          seterrorMsg(response.data.msg);
          setsuccessMsg("");
        } else {
          setRegisterFormData({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            mobile: "",
            address: "",
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

  const buttonEnable =
    registerFormData.first_name != "" &&
    registerFormData.last_name != "" &&
    registerFormData.username != "" &&
    registerFormData.email != "" &&
    registerFormData.mobile != "" &&
    registerFormData.address != "" &&
    registerFormData.password != "";

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header"> Seller Register</h4>
            <div className="card-body">
              <p className="text-muted">
                <strong>Note:</strong> All fields are required
              </p>
              {successMsg && <p className="text-success">{successMsg}</p>}
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <form>
                <div className="mb-3">
                  <label for="firstName" className="form-label">
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
                <div className="mb-3">
                  <label for="lastName" className="form-label">
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

                <div className="mb-3">
                  <label for="username" className="form-label">
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
                <div className="mb-3">
                  <label for="email" className="form-label">
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
                <div className="mb-3">
                  <label for="mobile" className="form-label">
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
                <div className="mb-3">
                  <div className="mb-3">
                    <label for="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      onChange={inputHandler}
                      name="address"
                      value={registerFormData.address}
                      className="form-control"
                      id="address"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-3">
                    <label for="pwd" className="form-label">
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
                </div>
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
          <div className="switch d-flex align-items-center justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSwitchToggle}
            >
              Register as Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VendorRegister;

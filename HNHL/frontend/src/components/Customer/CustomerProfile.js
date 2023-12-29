import CustomerSidebar from "./CustomerSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../CurrencySwitcher.css";

const baseUrl = "http://127.0.0.1:8000/api";

function CustomerProfile() {
  // State variable for success message
  const [SuccessMsg, setSuccessMsg] = useState("");

  // State variable for profile data
  const [ProfileData, setProfileData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile: "",
    p_image: "",
  });

  // Retrieve customer_id from local storage
  var customer_id = localStorage.getItem("customer_id");

  // Function to fetch profile data
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setProfileData({
          user_id: data.user.id,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          username: data.user.username,
          email: data.user.email,
          mobile: data.mobile,
          p_image: data.profile_img,
        });
      });
  }

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/customer/" + customer_id);
  }, []);

  // Handler for input changes
  const inputHandler = (event) => {
    setProfileData({
      ...ProfileData,
      [event.target.name]: event.target.value,
    });
  };

  // Handler for file changes
  const handleFileChange = (event) => {
    setProfileData({
      ...ProfileData,
      [event.target.name]: event.target.files[0],
    });
  };

  // Handler for form submission
  const submitHandler = (event) => {
    const formData = new FormData();
    formData.append("user", ProfileData.user_id);
    formData.append("mobile", ProfileData.mobile);
    formData.append("profile_image", ProfileData.p_image);

    // API call to update profile information
    axios
      .put(baseUrl + "/customer/" + customer_id + "/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        setSuccessMsg("Profile updated successfully!");
      })
      .catch(function (error) {
        console.log(error);
      });

    // Another FormData for updating user information
    const formUserData = new FormData();
    formUserData.append("first_name", ProfileData.first_name);
    formUserData.append("last_name", ProfileData.last_name);
    formUserData.append("username", ProfileData.username);
    formUserData.append("email", ProfileData.email);

    // API call to update user information
    axios
      .put(baseUrl + "/user/" + ProfileData.user_id + "/", formUserData)
      .then(function (response) {
        console.log(response);
        setSuccessMsg("Profile updated successfully!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container mt-1">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <CustomerSidebar></CustomerSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="card">
            <h4 className="card-header">Update profile</h4>
            <div className="card-body">
              {SuccessMsg && <p className="text-success">{SuccessMsg}</p>}
              <form>
                {/* Input for first name */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    onChange={inputHandler}
                    value={ProfileData.first_name}
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
                    name="last_name"
                    onChange={inputHandler}
                    value={ProfileData.last_name}
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
                    name="username"
                    onChange={inputHandler}
                    value={ProfileData.username}
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
                    name="email"
                    onChange={inputHandler}
                    value={ProfileData.email}
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
                    name="mobile"
                    onChange={inputHandler}
                    value={ProfileData.mobile}
                    className="form-control"
                    id="email"
                  />
                </div>
                {/* Input for profile image */}
                <div className="mb-3">
                  <div className="mb-3">
                    <p>
                      <img
                        src={ProfileData.p_image}
                        width="100"
                        className="mt-2 rounded"
                        alt="Profile"
                      />
                    </p>
                    <label htmlFor="profileImg" className="form-label">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      name="p_image"
                      onChange={handleFileChange}
                      className="form-control"
                      id="profileImg"
                    />
                  </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;

// Importing VendorSidebar component for the vendor's sidebar navigation
import VendorSidebar from "./VendorSidebar";

// Importing necessary hooks and Axios for API requests
import { useState, useEffect } from "react";
import axios from "axios";

// Setting the base URL for API requests
const baseUrl = "http://127.0.0.1:8000/api";

// Functional component for updating vendor profile
function VendorProfile() {
  // States for success message and profile data
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [ProfileData, setProfileData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
    p_image: "",
  });

  // Retrieving vendor ID from local storage
  var vendor_id = localStorage.getItem("vendor_id");

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/vendor/" + vendor_id);
  }, []);

  // Function to fetch profile data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Updating state with the received profile data
        setProfileData({
          user_id: data.user.id,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          username: data.user.username,
          email: data.user.email,
          mobile: data.mobile,
          address: data.address,
          p_image: data.profile_img,
        });
      });
  }

  // Handler for input changes in the form
  const inputHandler = (event) => {
    setProfileData({
      ...ProfileData,
      [event.target.name]: event.target.value,
    });
  };

  // Handler for changing the profile image file
  const handleFileChange = (event) => {
    setProfileData({
      ...ProfileData,
      [event.target.name]: event.target.files[0],
    });
  };

  // Handler for form submission
  const submitHandler = (event) => {
    // Creating a FormData object for profile data
    const formData = new FormData();
    formData.append("user", ProfileData.user_id);
    formData.append("mobile", ProfileData.mobile);
    formData.append("address", ProfileData.address);
    formData.append("profile_img", ProfileData.p_image);

    // Making a PUT request to update vendor profile
    axios
      .put(baseUrl + "/vendor/" + vendor_id + "/", formData, {
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

    // Creating a FormData object for user data
    const formUserData = new FormData();
    formUserData.append("first_name", ProfileData.first_name);
    formUserData.append("last_name", ProfileData.last_name);
    formUserData.append("username", ProfileData.username);
    formUserData.append("email", ProfileData.email);
    formUserData.append("address", ProfileData.address);

    // Making a PUT request to update user data
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

  // Rendering the component with the vendor sidebar and the profile update form
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <VendorSidebar></VendorSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="card">
            <h4 className="card-header">Update profile</h4>
            <div className="card-body">
              {/* Displaying success message if any */}
              {SuccessMsg && <p className="text-success">{SuccessMsg}</p>}
              {/* Profile update form */}
              <form>
                {/* Form fields for updating profile */}
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
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    name="address"
                    onChange={inputHandler}
                    value={ProfileData.address}
                    className="form-control"
                    id="address"
                  />
                </div>
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
                {/* Submit Button */}
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

// Exporting the VendorProfile component as the default export
export default VendorProfile;

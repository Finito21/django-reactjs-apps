import CustomerSidebar from "./CustomerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api";

function UpdateAddress() {
  // Get address_id from URL parameters
  const { address_id } = useParams();
  // Get customer_id from local storage
  var customer_id = localStorage.getItem("customer_id");
  // State to store error messages
  const [ErrorMsg, setErrorMsg] = useState("");
  // State to store success messages
  const [SuccessMsg, setSuccessMsg] = useState("");
  // State to store address form data
  const [AddressFormData, setAddressFormData] = useState({
    address: "",
    customer: customer_id,
  });

  // Function to fetch address data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved address data in the state
        setAddressFormData({
          address: data.address,
          customer: customer_id,
        });
      });
  }

  // Fetch address data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/address/" + address_id);
  }, []);

  // Handle input changes in the form
  const inputHandler = (event) => {
    setAddressFormData({
      ...AddressFormData,
      [event.target.name]: event.target.value,
    });
  };

  // Submit form data to update the address
  const submitHandler = () => {
    const formData = new FormData();
    formData.append("address", AddressFormData.address);
    formData.append("customer", AddressFormData.customer);

    axios
      .put(baseUrl + "/address/" + parseInt(address_id) + "/", formData)
      .then(function (response) {
        // Check response status and set success or error message accordingly
        if (response.status !== 200) {
          setErrorMsg("Data not saved");
          setSuccessMsg("");
        } else {
          setErrorMsg("");
          setSuccessMsg("Data saved");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Disable submit button if the address field is empty
  const disableBtn = AddressFormData.address === "";

  // Render component
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Customer sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <CustomerSidebar></CustomerSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="card">
            <h4 className="card-header">Update Address</h4>
            <div className="card-body">
              {/* Display error message if exists */}
              {ErrorMsg && <p className="alert alert-danger">{ErrorMsg}</p>}
              {/* Display success message if exists */}
              {SuccessMsg && (
                <p className="alert alert-success">{SuccessMsg}</p>
              )}
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                {/* Address text area */}
                <textarea
                  className="form-control"
                  name="address"
                  onChange={inputHandler}
                  value={AddressFormData.address}
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

export default UpdateAddress;

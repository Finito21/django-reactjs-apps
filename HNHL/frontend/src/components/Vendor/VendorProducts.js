// Importing VendorSidebar component for the vendor's sidebar navigation
import VendorSidebar from "./VendorSidebar";

// Importing Link from react-router-dom for navigation
import { Link } from "react-router-dom";

// Importing necessary hooks for state and side effects
import { useState, useEffect } from "react";

// Functional component for displaying and managing vendor products
function VendorProducts(props) {
  // Setting the base URL for API requests and image URL
  const url = "http://127.0.0.1:8000";
  const baseUrl = "http://127.0.0.1:8000/api/";

  // State for storing product data
  const [ProductData, setProductData] = useState([]);

  // Retrieving vendor ID from local storage
  var vendor_id = localStorage.getItem("vendor_id");

  // useEffect hook to fetch product data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "vendor-products/" + vendor_id);
  }, []);

  // Function to fetch product data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data.results);
      });
  }

  // Function to confirm product deletion and trigger the API request
  function showConfirm(product_id) {
    var _confirm = window.confirm("Are you sure to delete this product?");
    if (_confirm) {
      fetch(baseUrl + "product/" + product_id, {
        method: "DELETE",
      }).then((response) => {
        if (response.status === 204) {
          fetchData(baseUrl + "products/");
        }
      });
    }
  }

  // Rendering the component with product data displayed in a table
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2 col-12 mb-2">
          <VendorSidebar></VendorSidebar>
        </div>
        <div className="col-md-9 col-12 ">
          <div className="row">
            <div className="col-12">
              {/* Link to navigate to the add product page */}
              <Link
                to="/vendor/add-product"
                className="btn btn-outline-success mb-4"
              >
                <i className="fa fa-plus-circle"></i>Add Product
              </Link>
            </div>
          </div>
          <div>
            <div
              className="table-responsive d-flex justify-content-center align-items-center"
              style={{ borderRadius: "10px" }}
            >
              {/* Table to display product information */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Product</th>
                    <th scope="col">PLN price</th>
                    <th scope="col">USD price</th>
                    <th scope="col">EUR price</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ProductData.map((product, index) => (
                    <tr key={product.id}>
                      {/* Product Image */}
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          {/* Link to navigate to the product details page */}
                          <Link to={`/product/${product.slug}/${product.id}`}>
                            <img
                              src={product.image}
                              className="img-thumbnail"
                              width="80"
                              alt="Product"
                            />
                          </Link>
                        </div>
                      </td>
                      {/* Product Title */}
                      <td className="align-middle">{product.title}</td>
                      {/* PLN Price */}
                      <td className="align-middle">{product.price} zł</td>
                      {/* USD Price */}
                      <td className="align-middle">{product.usd_price} $</td>
                      {/* EUR Price */}
                      <td className="align-middle">{product.eur_price} €</td>
                      {/* Edit and Delete Buttons */}
                      <td className="align-middle">
                        <th>
                          {/* Link to navigate to the update product page */}
                          <Link
                            to={`/vendor/update-product/${product.id}`}
                            className="btn btn-primary ms-1"
                          >
                            Edit
                          </Link>
                        </th>
                        <th>
                          {/* Button to delete the product */}
                          <Link
                            to={"/vendor/products/"}
                            className="btn btn-danger ms-1"
                            onClick={() => showConfirm(product.id)}
                          >
                            Delete
                          </Link>
                        </th>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting the VendorProducts component as the default export
export default VendorProducts;

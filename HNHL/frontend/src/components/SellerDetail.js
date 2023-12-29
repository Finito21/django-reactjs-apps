import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SingleProduct from "./SingleProduct";

function SellerDetail() {
  // Base URL for API requests
  const baseUrl = "http://127.0.0.1:8000/api";

  // State variables to store product list and vendor data
  const [ProductList, setProductList] = useState([]);
  const [VendorData, setVendorData] = useState({
    profile_img: "",
    user: {
      username: "",
      total_products: 0,
    },
  });

  // Extract the 'seller_id' parameter from the route using useParams
  const { seller_id } = useParams();

  // Function to fetch products for the specified vendor
  function fetchProducts(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setProductList(data.results);
      });
  }

  // Function to fetch vendor details
  function fetchVendor(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setVendorData(data);
      });
  }

  // Fetch products and vendor details when the component mounts
  useEffect(() => {
    fetchProducts(baseUrl + "/vendor-products/" + seller_id);
    fetchVendor(baseUrl + "/vendor/" + seller_id);
  }, [seller_id]);

  // Render the SellerDetail component with vendor information and product list
  return (
    <section className="container mt-4">
      <div className="row mb-4">
        <div className="col-3">
          {/* Display vendor profile image */}
          <img
            src={VendorData.profile_img}
            className="img-thumbnail"
            alt={VendorData.user.username}
          />
        </div>
        <div className="col-9">
          {/* Display vendor details */}
          <h2>{VendorData.user.username}</h2>
          <h3>
            {VendorData.user.first_name} {VendorData.user.last_name}
          </h3>
          <p>Total Products: {VendorData.total_products}</p>
        </div>
      </div>
      <div className="row">
        {/* Display product cards for the vendor */}
        {ProductList.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// Export the SellerDetail component as the default export
export default SellerDetail;

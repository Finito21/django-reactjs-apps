import SingleProduct from "./SingleProduct";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CategoryProducts(props) {
  // Base API URL
  const baseUrl = "http://127.0.0.1:8000/api";
  // State to store products
  const [products, setProducts] = useState([]);
  // Get category id from URL parameters
  const { category_id } = useParams();

  // Function to fetch data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved products in the state
        setProducts(data.results);
      });
  }

  // Side effect to fetch data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/products/?category=" + category_id);
  }, []);

  // Render component
  return (
    <section className="container">
      <h3 className="mb-4">All Products</h3>
      <div className="row mb-4">
        {/* Map products to SingleProduct components */}
        {products.map((product) => (
          <SingleProduct product={product} />
        ))}
      </div>
    </section>
  );
}

// Export the component
export default CategoryProducts;

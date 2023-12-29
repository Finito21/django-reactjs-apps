import SingleProduct from "./SingleProduct";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TagProducts(props) {
  // Define the base URL for API requests
  const baseUrl = "http://127.0.0.1:8000/api";

  // State variable to store products
  const [products, setProducts] = useState([]);

  // Extract the 'tag' parameter from the route using useParams
  const { tag } = useParams();

  // Function to fetch data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setProducts(data.results);
      });
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/products/" + tag);
  }, []);

  // Render the component with product information
  return (
    <section className="container">
      <h3 className="mb-4">All Products with tag {tag}</h3>
      <div className="row mb-4">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// Export the TagProducts component as the default export
export default TagProducts;

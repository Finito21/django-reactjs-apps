import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import { useState, useEffect } from "react";

function AllProducts(props) {
  // Base API URL
  const baseUrl = "http://127.0.0.1:8000/api";
  // State to store the list of products
  const [products, setProducts] = useState([]);
  // State to store the total number of results
  const [totalResult, setTotalResults] = useState(0);

  // Function to fetch data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved list of products and total results in the state
        setProducts(data.results);
        setTotalResults(data.count);
        console.log(data.results);
        console.log(data.count);
      });
  }

  // Function to change the URL and fetch data
  function changeUrl(baseurl) {
    fetchData(baseurl);
  }

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/products");
  }, []);

  // Pagination logic
  var links = [];
  var limit = 8;
  var totalLinks = totalResult / limit;
  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li className="page-item" key={i}>
        {/* Link to navigate to different pages */}
        <Link
          onClick={() => changeUrl(baseUrl + `/products/?page=${i}`)}
          to={`/products/?page=${i}`}
          className="page-link"
        >
          {i}
        </Link>
      </li>
    );
  }

  // Render component
  return (
    <section className="container">
      {/* Heading for the list of products */}
      <h3 className="mb-4">All Products</h3>

      <div className="row mb-4">
        {/* Map each product to the SingleProduct component */}
        {products.map((product) => (
          <SingleProduct product={product} key={product.id} />
        ))}
      </div>

      {/* Pagination navigation */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">{links}</ul>
      </nav>
    </section>
  );
}

// Export the component
export default AllProducts;

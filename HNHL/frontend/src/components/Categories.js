import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Categories() {
  // Base API URL
  const baseUrl = "http://127.0.0.1:8000/api";
  // State to store categories
  const [categories, setCategories] = useState([]);

  // Function to fetch data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved categories in the state
        setCategories(data.results);
      });
  }

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/categories");
  }, []);

  // Render component
  return (
    <section className="container mt-4">
      <h3 className="mb-4">All Categories</h3>
      <div className="row mb-4">
        {/* Map categories to individual card components */}
        {categories.map((category) => (
          <div className="col-12 col-md-3 mb-4" key={category.id}>
            <div className="card text-center">
              {/* Link to the category detail page */}
              <Link to={`/category/${category.title}/${category.id}`}>
                {/* Category image */}
                <img
                  src={category.category_img}
                  className="card-img-top"
                  alt={category.title}
                  style={{ height: "250px", width: "100%" }}
                />
              </Link>
              <div className="card-body text-center">
                {/* Category title with a link to the detail page */}
                <h4 className="card-title">
                  <Link
                    to={`/category/${category.title}/${category.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {category.title}
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Export the component
export default Categories;

import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Blog(props) {
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
    <section className="container">
      {/* Introduction card */}
      <div
        className="card text-center bg-dark mt-3"
        style={{ color: "#9B9D9E" }}
      >
        <p>
          In today's fast-paced world, mental health concerns are becoming an
          integral part of leading a balanced lifestyle. A key part of
          maintaining mental health is healthy nutrition, which directly affects
          our brain function. In the context of this approach to mental health,
          the HNHL shop offers products specifically designed to support brain
          function.
        </p>

        <p>
          Healthy eating is the foundation of a healthy lifestyle. Incorporating
          fresh vegetables, fruit, whole grain cereals, nuts and fish rich in
          omega-3 fatty acids into the diet can benefit mental function. Dietary
          supplementation can provide additional support, especially in cases of
          nutrient deficiencies.
        </p>

        <p>
          The products offered by the HNHL shop are carefully formulated to
          provide essential nutrients to support brain health. Ingredients such
          as vitamins, minerals, amino acids and antioxidants found in HNHL
          dietary supplements are designed to improve memory, concentration and
          overall mental performance.
        </p>
      </div>

      {/* Heading for categories */}
      <h3>
        In our website, you can find products from the following categories:
      </h3>

      {/* Map categories to cards */}
      {categories.map((category) => (
        <div key={category.id}>
          {/* Category card with image */}
          <div
            className="card text-center mb-3"
            style={{ maxWidth: "300px", margin: "auto" }}
          >
            <Link
              to={`/category/${category.title}/${category.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <img
                src={category.category_img}
                className="card-img-top"
                alt={category.title}
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

          {/* Category detail card */}
          <div
            className="card text-center bg-dark mb-3"
            style={{ color: "#9B9D9E" }}
          >
            {category.detail}
          </div>
        </div>
      ))}
    </section>
  );
}

// Export the component
export default Blog;

import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import SingleSeller from "./SingleSeller";
import { useState, useEffect } from "react";

function Blog(props) {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData(baseUrl + "/categories");
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.results);
      });
  }

  return (
    <section className="container">
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
      <h3>In our webside you can find product from below categories:</h3>

      {categories.map((category) => (
        <div>
          <div
            key={category.id}
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

export default Blog;

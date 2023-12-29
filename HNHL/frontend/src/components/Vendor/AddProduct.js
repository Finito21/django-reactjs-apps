// Comment: Importing VendorSidebar from a local file
import VendorSidebar from "./VendorSidebar";

// Comment: Importing useState and useEffect from React
import { useState, useEffect } from "react";

// Comment: Importing axios for handling HTTP requests
import axios from "axios";

// Comment: Constant containing the base API URL
const baseUrl = "http://127.0.0.1:8000/api/";

// Comment: Functional component AddProduct
function AddProduct() {
  // Comment: Retrieving the vendor ID from local storage
  const vendor_id = localStorage.getItem("vendor_id");

  // Comment: State to store error message
  const [ErrorMsg, setErrorMsg] = useState("");

  // Comment: State to store success message
  const [SuccessMsg, setSuccessMsg] = useState("");

  // Comment: State to store category data
  const [CategoryData, setCategoryData] = useState([]);

  // Comment: State to store product data
  const [ProductData, setProductData] = useState({
    category: "",
    vendor: "",
    title: "",
    slug: "",
    detail: "",
    price: "",
    usd_price: "",
    eur_price: "",
    tags: "",
    image: "",
  });

  // Comment: State to store product images
  const [ProductImgs, setProductImgs] = useState([]);

  // Comment: Handling changes in text input values
  const inputHandler = (event) => {
    setProductData({
      ...ProductData,
      [event.target.name]: event.target.value,
    });
  };

  // Comment: Handling file selection
  const fileHandler = (event) => {
    setProductData({
      ...ProductData,
      [event.target.name]: event.target.files[0],
    });
  };

  // Comment: Handling selection of multiple files
  const multipleFilesHandler = (event) => {
    var files = event.target.files;
    if (files.length > 0) {
      setProductImgs(files);
    }
  };

  // Comment: Handling form submission
  const submitHandler = () => {
    const formData = new FormData();
    formData.append("vendor", ProductData.vendor);
    formData.append("category", ProductData.category);
    formData.append("title", ProductData.title);
    formData.append("slug", ProductData.slug);
    formData.append("detail", ProductData.detail);
    formData.append("price", ProductData.price);
    formData.append("usd_price", ProductData.usd_price);
    formData.append("eur_price", ProductData.eur_price);
    formData.append("tags", ProductData.tags);
    formData.append("image", ProductData.image);

    axios
      .post(baseUrl + "products/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response.status == 201) {
          setProductData({
            category: "",
            vendor: "",
            title: "",
            slug: "",
            detail: "",
            price: "",
            usd_price: "",
            eur_price: "",
            tags: "",
            image: "",
          });
          setErrorMsg("");
          setSuccessMsg(response.statusText);

          for (let i = 0; i < ProductImgs.length; i++) {
            const ImageFormData = new FormData();
            ImageFormData.append("product", response.data.id);
            ImageFormData.append("image", ProductImgs[i]);
            axios
              .post(baseUrl + "product-imgs/", ImageFormData)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          }

          setProductImgs("");
        } else {
          setSuccessMsg("");
          setErrorMsg(response.statusText);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Comment: Fetching category data from the server on component render
  useEffect(() => {
    setProductData({
      ...ProductData,
      vendor: vendor_id,
    });
    fetchData(baseUrl + "categories/");
  }, []);

  // Comment: Function to fetch data from the server
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setCategoryData(data.results);
      });
  }

  // Comment: Rendering the component
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <VendorSidebar></VendorSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="card">
            <h4 className="card-header">Add Product</h4>
            <div className="card-body">
              {SuccessMsg && <p className="text-success">{SuccessMsg}</p>}
              {ErrorMsg && <p className="text-danger">{ErrorMsg}</p>}
              <form>
                {/* Category selection */}
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    name="category"
                    onChange={inputHandler}
                  >
                    {CategoryData.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title input */}
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={ProductData.title}
                    onChange={inputHandler}
                    className="form-control"
                    id="Title"
                  />
                </div>

                {/* Slug input */}
                <div className="mb-3">
                  <label htmlFor="Slug" className="form-label">
                    {" "}
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={ProductData.slug}
                    onChange={inputHandler}
                    className="form-control"
                    id="Slug"
                  />
                </div>

                {/* PLN Price input */}
                <div className="mb-3">
                  <label htmlFor="PLN_Price" className="form-label">
                    PLN Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={ProductData.price}
                    onChange={inputHandler}
                    className="form-control"
                    id="PLN_Price"
                  />
                </div>

                {/* USD Price input */}
                <div className="mb-3">
                  <label htmlFor="USD_Price" className="form-label">
                    USD Price
                  </label>
                  <input
                    type="number"
                    name="usd_price"
                    value={ProductData.usd_price}
                    onChange={inputHandler}
                    className="form-control"
                    id="USD_Price"
                  />
                </div>

                {/* EUR Price input */}
                <div className="mb-3">
                  <label htmlFor="EUR_Price" className="form-label">
                    EUR Price
                  </label>
                  <input
                    type="number"
                    name="eur_price"
                    value={ProductData.eur_price}
                    onChange={inputHandler}
                    className="form-control"
                    id="EUR_Price"
                  />
                </div>

                {/* Detail textarea */}
                <div className="mb-3">
                  <label htmlFor="Detail" className="form-label">
                    Detail
                  </label>
                  <textarea
                    className="form-control"
                    name="detail"
                    value={ProductData.detail}
                    onChange={inputHandler}
                    rows="8"
                    id="Detail"
                  />
                </div>

                {/* Tags textarea */}
                <div className="mb-3">
                  <label htmlFor="Tags" className="form-label">
                    Tags
                  </label>
                  <textarea
                    className="form-control"
                    name="tags"
                    value={ProductData.tags}
                    onChange={inputHandler}
                    rows="8"
                    id="Tags"
                  />
                </div>

                {/* Featured Image input */}
                <div className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="ProductImg" className="form-label">
                      Featured Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={fileHandler}
                      id="ProductImg"
                    />
                  </div>
                </div>

                {/* Product Images input */}
                <div className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="Product_Imgs" className="form-label">
                      Product Images
                    </label>
                    <input
                      type="file"
                      multiple
                      name="product_imgs"
                      onChange={multipleFilesHandler}
                      className="form-control"
                      id="Product_Imgs"
                    />
                  </div>
                </div>

                {/* Button to submit the form */}
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

// Comment: Exporting the AddProduct component
export default AddProduct;

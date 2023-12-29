import { Link } from "react-router-dom";
import logo from "../logo.svg";
import SingleSeller from "./SingleSeller";
import { useState, useEffect } from "react";

function AllSellers(props) {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [SellerList, setSellerList] = useState([]);
  const [totalResult, setTotalResults] = useState(0);

  useEffect(() => {
    fetchData(baseUrl + "/vendors");
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setSellerList(data.results);
        setTotalResults(data.count);
      });
  }

  return (
    <section className="container">
      <h3 className="mb-4">All Sellers</h3>
      <div className="row mb-4">
        {SellerList.map((seller) => (
          <SingleSeller seller={seller} />
        ))}
      </div>
    </section>
  );
}
export default AllSellers;

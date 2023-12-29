import SingleSeller from "./SingleSeller";
import { useState, useEffect } from "react";

function AllSellers(props) {
  // Base API URL
  const baseUrl = "http://127.0.0.1:8000/api";
  // State to store the list of sellers
  const [SellerList, setSellerList] = useState([]);

  // Function to fetch data from the API
  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved list of sellers in the state
        setSellerList(data.results);
      });
  }

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData(baseUrl + "/vendors");
  }, []);

  // Render component
  return (
    <section className="container">
      {/* Heading for the list of sellers */}
      <h3 className="mb-4">All Sellers</h3>

      <div className="row mb-4">
        {/* Map each seller to the SingleSeller component */}
        {SellerList.map((seller) => (
          <SingleSeller seller={seller} key={seller.id} />
        ))}
      </div>
    </section>
  );
}

// Export the component
export default AllSellers;

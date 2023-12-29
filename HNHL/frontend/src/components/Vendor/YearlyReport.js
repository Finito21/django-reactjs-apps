// Importing VendorSidebar component for the vendor's sidebar navigation
import VendorSidebar from "./VendorSidebar";

// Importing necessary hooks from React
import { useState, useEffect } from "react";

// Importing Chart component from react-apexcharts for displaying charts
import Chart from "react-apexcharts";

// Setting the base URL for API requests
const baseUrl = "http://127.0.0.1:8000/api/";

// Functional component for displaying yearly reports
function YearlyReport() {
  // Retrieving vendor ID from local storage
  const vendor_id = localStorage.getItem("vendor_id");

  // States for storing dates and data for the yearly chart
  const [Dates, setDates] = useState([]);
  const [Data, setData] = useState([]);

  // Function to fetch yearly orders data from the API
  function fetch_yearly_orders(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Updating state with dates and data received from the API
        setDates(data.show_chart_yearly_orders.dates);
        setData(data.show_chart_yearly_orders.data);
        console.log(data.show_chart_yearly_orders.dates);
        console.log(data.show_chart_yearly_orders.data);
      });
  }

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetch_yearly_orders(baseUrl + "vendor/" + vendor_id + "/");
  }, []);

  // Configuration options for the chart
  const chartOptions = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: Dates,
      },
    },
    series: [
      {
        name: "series-1",
        data: Data,
      },
    ],
  };

  // Creating the Chart component with the specified options and series
  const chartElement = (
    <Chart
      options={chartOptions.options}
      series={chartOptions.series}
      type="bar"
      width="500"
    />
  );

  // Rendering the component with the vendor sidebar and the chart
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <VendorSidebar></VendorSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">{chartElement}</div>
        </div>
      </div>
    </div>
  );
}

// Exporting the YearlyReport component as the default export
export default YearlyReport;

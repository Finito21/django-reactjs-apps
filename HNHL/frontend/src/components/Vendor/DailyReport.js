import VendorSidebar from "./VendorSidebar";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const baseUrl = "http://127.0.0.1:8000/api/";

function DailyReport() {
  // Retrieve vendor_id from local storage
  const vendor_id = localStorage.getItem("vendor_id");

  // State variables to store dates and data for the chart
  const [Dates, setDates] = useState([]);
  const [Data, setData] = useState([]);

  // Function to fetch daily orders data from the API
  function fetchDailyOrders(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        // Set the dates and data for the chart
        setDates(data.show_chart_daily_orders.dates);
        setData(data.show_chart_daily_orders.data);
        console.log(data.show_chart_daily_orders.dates);
        console.log(data.show_chart_daily_orders.data);
      });
  }

  // Fetch daily orders data on component mount
  useEffect(() => {
    fetchDailyOrders(baseUrl + "vendor/" + vendor_id + "/");
  }, []);

  // Chart configuration options
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

  // Chart element to be rendered
  const chartElement = (
    <Chart
      options={chartOptions.options}
      series={chartOptions.series}
      type="bar"
      width="500"
    />
  );

  // Render the component
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          {/* Render the VendorSidebar component */}
          <VendorSidebar></VendorSidebar>
        </div>
        <div className="col-md-9 col-12 mb-2">
          {/* Render the chart element */}
          <div className="row">{chartElement}</div>
        </div>
      </div>
    </div>
  );
}

// Export the DailyReport component as the default export
export default DailyReport;

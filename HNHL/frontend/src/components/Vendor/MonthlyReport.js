import VendorSidebar from './VendorSidebar';
import { useState, useEffect } from 'react';
import Chart from "react-apexcharts"

const baseUrl='http://127.0.0.1:8000/api/';
function MonthlyReport(){

    const vendor_id=localStorage.getItem('vendor_id');
    const [Dates,setDates]=useState([]);
    const [Data,setData]=useState([]);


    function fetch_monthly_orders(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setDates(data.show_chart_monthly_orders.dates)
            setData(data.show_chart_monthly_orders.data)
            console.log(data.show_chart_monthly_orders.dates)
            console.log(data.show_chart_monthly_orders.data)
        });
    }
    

    useEffect(() => {
        fetch_monthly_orders(baseUrl+'vendor/'+vendor_id+'/');
    },[]);

    const chartOptions={
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: Dates
            }
          },
          series: [
            {
              name: "series-1",
              data: Data
            }
          ]
        };
    const chartElement=<Chart options={chartOptions.options} series={chartOptions.series} type="bar" width="500"/>
    

    

    return(
        <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <VendorSidebar></VendorSidebar>
                    </div>
                    <div className='col-md-9 col-12 mb-2'>
                        <div className='row'>
                            {chartElement}
                            
                        </div>

                    </div>

                </div>
                
            </div>

    )
}
export default MonthlyReport;

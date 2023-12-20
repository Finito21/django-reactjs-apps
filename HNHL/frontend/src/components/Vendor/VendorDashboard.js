import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VendorSidebar from './VendorSidebar';

function VendorDashboard(props) {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const vendorId = localStorage.getItem('vendor_id');

  const [vendorData, setVendorData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/vendor/${vendorId}/dashboard/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVendorData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        // You might want to handle errors more gracefully, such as showing an error message to the user.
      }
    };

    fetchData();
  }, [baseUrl, vendorId]);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-3 col-12 mb-2'>
          <VendorSidebar />
        </div>
        <div className='col-md-9 col-12 mb-2'>
          <div className='row'>
            <div className='col-md-4 mb-2'>
              <div className='card' style={{ height: '100%' }}>
                <div className='card-body text-center'>
                  <h4>Total Products</h4>
                  <h4>
                    <Link to='/vendor/products'>{vendorData.totalProducts}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className='col-md-4 mb-2'>
              <div className='card' style={{ height: '100%' }}>
                <div className='card-body text-center'>
                  <h4>Total Orders</h4>
                  <h4>
                    <Link to='/vendor/orders'>{vendorData.totalOrders}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className='col-md-4 mb-2'>
              <div className='card' style={{ height: '100%' }}>
                <div className='card-body text-center'>
                  <h4>Total Customers</h4>
                  <h4>
                    <Link to='/vendor/customers'>{vendorData.totalCustomers}</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;

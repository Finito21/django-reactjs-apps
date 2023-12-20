import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomerSidebar from './CustomerSidebar';

function CustomerDashboard(props) {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const customerId = localStorage.getItem('customer_id');

  const [countList, setCountList] = useState({
    totalOrders: 0,
    totalWishList: 0,
    totalAddress: 0,
  });

  useEffect(() => {
    fetchData(`${baseUrl}/customer/dashboard/${customerId}/`);
  }, [baseUrl, customerId]);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setCountList({
          totalOrders: data.totalOrders,
          totalWishList: data.totalWishList,
          totalAddress: data.totalAddress,
        });
      });
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-3 col-12 mb-2'>
          <CustomerSidebar />
        </div>
        <div className='col-md-9 col-12 mb-2'>
          <div className='row'>
            <div className='col-md-4 mb-2'>
              <div className='card' style={{ height: '100%' }}>
                <div className='card-body text-center'>
                  <h4>Total</h4>
                  <h5>Orders</h5>
                  <h4>
                    <Link to="/customer/orders">{countList.totalOrders}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className='col-md-4 mb-2'>
              <div className='card' style={{ height: '100%' }}>
                <div className='card-body text-center'>
                  <h4>Total</h4>
                  <h5>Wishlist</h5>
                  <h4>
                    <Link to="/customer/wishlist">{countList.totalWishList}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className='col-md-4 mb-2'>
              <div className='card' style={{ height: '100%' }}>
                <div className='card-body text-center'>
                  <h4>Total</h4>
                  <h5>Addresses</h5>
                  <h4>
                    <Link to="/customer/addresses">{countList.totalAddress}</Link>
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

export default CustomerDashboard;

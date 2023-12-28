// Customers.js
import VendorSidebar from './VendorSidebar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomersList from './CustomerList';

const baseUrl = 'http://127.0.0.1:8000/api/';

function Customers() {
    const vendor_id = localStorage.getItem('vendor_id');
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        fetchData(`${baseUrl}vendor/${vendor_id}/customers/`);
    }, []);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                // Usunięcie duplikatów na podstawie identyfikatora klienta
                const uniqueCustomers = data.results.filter(
                    (customer, index, self) =>
                        index === self.findIndex((c) => c.customer.id === customer.customer.id)
                );
                setCustomerList(uniqueCustomers);
            });
    }

    

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <VendorSidebar></VendorSidebar>
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <CustomersList customerList={customerList}  />
                </div>
            </div>
        </div>
    );
}

export default Customers;

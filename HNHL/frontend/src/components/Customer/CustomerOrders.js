
import CustomerSidebar from './CustomerSidebar';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom';
import { useState,useEffect} from 'react';

function CustomerOrders(){
    const url='http://127.0.0.1:8000';
    const baseUrl='http://127.0.0.1:8000/api';
    const customerId=localStorage.getItem('customer_id');
    const [OrderItems,setOrderItems]=useState([])

    useEffect(() => {
        fetchData(baseUrl+'/customer/'+customerId+'/orderitems');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setOrderItems(data.results);
        });
    }


    return(
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <CustomerSidebar></CustomerSidebar>
                    </div>
                    <div className='col-md-9 col-12 mb-2'>
                        <div className='row'>
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        OrderItems.map((item,index)=>{
                                            return<tr>
                                                <td>{index+1}</td>
                                                <td>
                                                    <Link to={`/product/${item.product.slug}/${item.product.id}`}>
                                                        <img src={`${url}/${item.product.image}`} className="img-thumbnail" width='80' alt="..."/>
                                                    </Link>
                                                <p><Link to={`/product/${item.product.slug}/${item.product.id}`}>{item.product.title}</Link></p>
                                                </td>
                                                <td>{item.product.price}</td>
                                                <td>
                                                    <span>
                                                        {
                                                        item.order.order_status==true &&<i className='fa fa-check-circle text-success'></i>
                                                        }
                                                        {
                                                        item.order.order_status==false &&<i className='fa fa-spinner fa-spin text-dark'></i>
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>


                                </table>


                            </div>

                        </div>

                    </div>

                </div>
                
            </div>
    )
}
export default CustomerOrders;
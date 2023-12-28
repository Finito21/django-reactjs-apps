
import CustomerSidebar from './CustomerSidebar';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom';
import { useState,useEffect} from 'react';
import { useContext } from 'react';
import { UserContext, CartContext, CurrencyContext } from '../../Context';
//import axios from 'axios';

function Orders(){
    const url='http://127.0.0.1:8000';
    const baseUrl='http://127.0.0.1:8000/api';
    const customerId=localStorage.getItem('customer_id');
    const [OrderItems,setOrderItems]=useState([])
    const {CurrencyData}=useContext(CurrencyContext);

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
                    <div class="container" >
                        <div class="row d-flex justify-content-center align-items-center " >
                        <div class="col">

                            <div class="table-responsive"  style={{ borderRadius: '10px' }}>
                            <table class="table">
                                <thead>
                                <tr>
                                    
                                    <th scope="col" class="h5">Your Orders</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Paid</th>
                                    <th scope="col">Order ID</th>
                                    
                                </tr>
                                </thead>
                                <tbody>
                                    
                                {
                                OrderItems.map((item,index)=>{
                                    return<tr>

                                    
                                        
                                    <th scope="row">
                                    <div class="d-flex align-items-center">
                                    <Link to={`/product/${item.product.slug}/${item.product.id}`}>
                                        <img src={`${url}/${item.product.image}`} className="img-thumbnail" width='80' alt="..."/>
                                    </Link>
                                        
                                    </div>
                                    </th>
                                    <td class="align-middle">
                                    <div class="flex-column ms-4">
                                        <p class="mb-2"><Link to={`/product/${item.product.slug}/${item.product.id}`}>{item.product.title}</Link></p>
                                        </div>
                                    </td>
                                    <td class="align-middle">

                                    {
                                    CurrencyData == 'PLN' && <td>{item.product.price}</td>
                                    }
                                    {
                                        CurrencyData == 'USD' && <td>{item.product.usd_price}</td>
                                    }
                                    {
                                        CurrencyData == 'EUR' && <td>{item.product.eur_price}</td>
                                    }
                                    
                                    </td>
                                    <td class="align-middle">
                                    <span>
                                                            {
                                                            item.order.order_status==true &&<i className='fa fa-check-circle text-success'></i>
                                                            }
                                                            {
                                                            item.order.order_status==false &&<i className='fa fa-spinner fa-spin text-dark'></i>
                                                            }
                                                        </span>
                                    </td>

                                    <td class="align-middle">
                                        {item.order.id}
                                    </td>
                                    
                                </tr>
                                })}

                                
                                </tbody>
                            </table>
                            </div>

                        
                                
                        
                            

                        </div>
                        </div>
                    </div>
                    </div>
            </div>
            </div>
            
    )
}
export default Orders;
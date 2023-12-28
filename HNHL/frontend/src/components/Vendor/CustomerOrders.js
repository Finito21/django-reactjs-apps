
import VendorSidebar from './VendorSidebar';
import logo from '../../logo.svg';
import {Link,useParams} from 'react-router-dom';
import { useState,useEffect } from 'react';
const baseUrl='http://127.0.0.1:8000/api/';

function CustomerOrders(){
    const url='http://127.0.0.1:8000';
    const vendor_id = localStorage.getItem('vendor_id');
    const { customer_id, order_id } = useParams();  // Dodaj order_id do hooka
    const [OrderItems, setOrderItems] = useState([]);
    console.log('test')

    useEffect(() => {
        fetchData(`${baseUrl}vendor/${vendor_id}/customer/${customer_id}/orderitems/${order_id}`);
    }, [customer_id, order_id]);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setOrderItems(data.results);
            });
    }

    function showConfirm(order_id){
        var _confirm=window.confirm('Are you sure to delete this order?');
        if(_confirm){
            fetch(baseUrl+'delete-customer-orders/'+order_id,{
                method:'DELETE'
            })
            .then((response)=> {
                if(response.status==204){
                    fetchData(baseUrl+'vendor/customer/'+customer_id+'/')
                }
            });
        }
    }

    function changeOrderStatus(order_id,status){
        fetch(baseUrl+'order-modify/'+ order_id + '/',{
            method:"PATCH",
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json',
            },
            body: JSON.stringify({order_status:status})
        })
        .then(function(response){
            if(response.status==200){
                fetchData(baseUrl+'vendor/'+vendor_id+'/orderitems/');
            }
        });
    }

    return(
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <VendorSidebar></VendorSidebar>
                    </div>
                    <div className='col-md-9 col-12 ' >
                        <div>
                            <div className='table-responsive d-flex justify-content-center align-items-center' style={{ borderRadius: '10px' }}>
                                <table className='table' >
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            OrderItems.map((item,index)=> <tr>
                                        <td class="align-middle">{index+1}</td>
                                        <td class="align-middle">
                                            <div class="d-flex align-items-center">
                                                <Link><img src={`${url}/${item.product.image}`} className="img-thumbnail" width='80' alt="..."/></Link>
                                            </div>
                                        </td>
                                        <td class="align-middle">{item.product.title}</td>
                                        <td class="align-middle"> {item.product.price}</td>
                                        <td class="align-middle">
                                            {
                                                item.order.order_status && <span className='text-success'><i className='fa fa-check-circle'> </i> Completed</span>
                                            }
                                            {
                                                !item.order.order_status && <span className='text-warning'><i className='fa fa-spinner'> </i> Pending</span>
                                            }
                                        </td>
                                        
                                       <td class="align-middle">
                                        <div className="dropdown">
                                                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Change Status
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        {
                                                            !item.order.order_status && <a className="dropdown-item" onClick={()=>changeOrderStatus(item.order.id,true)} href="#">Complete</a>
                                                        }
                                                        {
                                                            item.order.order_status && <a className="dropdown-item" onClick={()=>changeOrderStatus(item.order.id,false)} href="#">Pending</a>
                                                        }
                                                
                                                    </li>
                                                </ul>
                                            </div>  
                                       </td>
                                        </tr>)
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
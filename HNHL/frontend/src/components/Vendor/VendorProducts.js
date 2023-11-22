
import VendorSidebar from './VendorSidebar';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
const baseUrl='http://127.0.0.1:8000/api/';

function VendorProducts(props){
    const [ProductData,setProductData]=useState([]);

    useEffect(() => {
        fetchData(baseUrl+'products/');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProductData(data.results);
        });
    }
    return(
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <VendorSidebar></VendorSidebar>
                    </div>
                    <div className='col-md-9 col-12 mb-2'>
                        <div className='row'>
                            <div className='col-12'>
                                <Link to="/vendor/add-product" className='btn btn-outline-success mb-4 float-end'><i className='fa fa-plus-circle'></i>Add Product</Link>
                            </div>
                        </div>
                        
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ProductData.map((product,index)=><tr>
                                        <td>{product.id}</td>
                                        <td>{product.title}</td>
                                        <td>{product.price} zł</td>
                                        <td>{product.usd_price} $</td>
                                        <td>{product.eur_price} €</td>
                                        <td>
                                            {
                                                !product.publish_status && 'Pending'
                                            }
                                            {
                                                product.publish_status && <span class='text-success'>Published</span>
                                            }
                                        </td>
                                        <td>
                                            <a href='#' className='btn btn-info'>View</a>
                                            <a href='#' className='btn btn-primary ms-1'>Edit</a>
                                            <a href='#' className='btn btn-danger ms-1'>Delete</a>
                                        </td>
                                        </tr>)
                                    } 
                                </tbody>
                                
                            </table>


                        </div>

                    </div>

                </div>
                
            </div>
    )
}
export default VendorProducts;
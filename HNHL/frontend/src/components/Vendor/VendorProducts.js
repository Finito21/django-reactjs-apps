
import VendorSidebar from './VendorSidebar';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';


function VendorProducts(props){
    const baseUrl='http://127.0.0.1:8000/api/';
    const [ProductData,setProductData]=useState([]);
    var vendor_id=localStorage.getItem('vendor_id');

    useEffect(() => {
        
        fetchData(baseUrl+'vendor-products/'+vendor_id);
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProductData(data.results);
        });
    }
    function showConfirm(product_id){
        var _confirm=window.confirm('Are you sure to delete this product?');
        if(_confirm){
            fetch(baseUrl+'product/'+product_id,{
                method:'DELETE'
            })
            .then((response)=> {
                if(response.status==204){
                    fetchData(baseUrl+'products/')
                }
            });
        }
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
                                        <th>PLN price</th>
                                        <th>USD price</th>
                                        <th>EUR price</th>
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
                                            <Link to={`/vendor/update-product/${product.id}`} className='btn btn-primary ms-1'>Edit</Link>
                                            <Link to={'/vendor/products/'} className='btn btn-danger ms-1' onClick={()=>showConfirm(product.id)}>Delete</Link>
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
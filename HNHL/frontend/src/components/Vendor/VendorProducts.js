
import VendorSidebar from './VendorSidebar';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';


function VendorProducts(props){
    const url='http://127.0.0.1:8000';
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
                    <div className='col-md-2 col-12 mb-2'>
                        <VendorSidebar></VendorSidebar>
                    </div>
                    <div className='col-md-9 col-12 ' >
                        <div className='row'>
                            <div className='col-12'>
                                <Link to="/vendor/add-product" className='btn btn-outline-success mb-4'><i className='fa fa-plus-circle'></i>Add Product</Link>
                            </div>
                        </div>
                        <div>
                        
                                <div className='table-responsive d-flex justify-content-center align-items-center' style={{ borderRadius: '10px' }}>
                                    <table className='table' >
                                        <thead>
                                            <tr>
                                                <th scope="col">Image</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">PLN price</th>
                                                <th scope="col">USD price</th>
                                                <th scope="col">EUR price</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                        ProductData.map((product,index)=><tr>
                                            <td class="align-middle">
                                            <div class="d-flex align-items-center">
                                            <Link to={`/product/${product.slug}/${product.id}`}>
                                                <img src={product.image} className="img-thumbnail" width='80' alt="..."/>
                                            </Link>
                                            </div>
                                            </td>
                                            <td class="align-middle">{product.title}</td>     
                                            <td class="align-middle">{product.price} zł</td>
                                            <td class="align-middle">{product.usd_price} $</td>
                                            <td class="align-middle">{product.eur_price} €</td>
                                            <td class="align-middle">
                                                {
                                                    !product.publish_status && 'Pending'
                                                }
                                                {
                                                    product.publish_status && <span class='text-success'>Published</span>
                                                }
                                            </td>
                                            <td class="align-middle">
                                                <th>
                                                <Link to={`/vendor/update-product/${product.id}`} className='btn btn-primary ms-1'>Edit</Link>
                                                </th>
                                                <th>
                                                <Link to={'/vendor/products/'} className='btn btn-danger ms-1' onClick={()=>showConfirm(product.id)}>Delete</Link>
                                                </th>
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
export default VendorProducts;
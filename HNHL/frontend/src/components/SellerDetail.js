import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState,useEffect, useContext} from 'react';
import { UserContext, CurrencyContext} from '../Context';
import SingleProduct from './SingleProduct';
import axios from "axios";

function SellerDetail(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [ProductList,setProductList]=useState([]);
    const [VendorData,setVendorData]=useState({
        'profile_img':'',
        'user':{
            'username':'',
            'total_products':0
        }
    });
    const {seller_username,seller_id} = useParams();
    const userContext=useContext(UserContext);
    const {CurrencyData}=useContext(CurrencyContext);

    useEffect(() => {
        fetchProducts(baseUrl+'/vendor-products/'+seller_id);
        fetchVendor(baseUrl+'/vendor/'+seller_id);
    },[]);

  

    function fetchProducts(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProductList(data.results);
        });
    }

    function fetchVendor(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setVendorData(data);
        });
    }


    return (
        <section className='container mt-4'>
            <div className='row mb-4'>
                <div className='col-3'>
                    <img src={VendorData.profile_img} className='img-thumbnail' alt={VendorData.user.username}/>
                </div>
                <div className='col-9'>
                    <h2>{VendorData.user.username}</h2>
                    <h3>{VendorData.user.first_name} {VendorData.user.last_name}</h3>
                    <p>Total Products:{VendorData.total_products}</p>
                </div>
            </div>
            <div className='row'>
                {
                    ProductList.map((product)=> <SingleProduct product={product}/>)
                }
            </div>
        </section>

    )

}
export default SellerDetail;
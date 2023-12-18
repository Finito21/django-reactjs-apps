import {Link} from 'react-router-dom';
import SingleProduct from './SingleProduct';
import logo from '../logo.svg';
import { useState,useEffect } from 'react';
function Home(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [products,setProducts]=useState([]);

    useEffect(() => {
        fetchData(baseUrl+'/products/?fetch_limit=4');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.results);
        });
    }

    return (
    <main className='mt-1'>
        <div className='container'>
        <h3 className='mb-4'>Latest Products<Link to='/products' className='float-end btn btn-sm btn-dark'>View All Products</Link></h3>
        <div className='row mb-4'>

        {
            products.map((product) => <SingleProduct product={product}/>)
        }
        </div>

        <h3 className='mb-4'>Popular Categories<Link to='/categories' className='float-end btn btn-sm btn-dark'>View All Categories</Link></h3>
        <div className='row mb-4'>
            
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Category title</h4>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Category title</h4>
                </div>
                
            </div>
            </div>
            
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Category title</h4>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Category title</h4>
                </div>
                
            </div>
            </div>

        </div>

        <h3 className='mb-4'>Popular Products<a href='#' className='float-end btn btn-sm btn-dark'>View All Products</a></h3>
        <div className='row mb-4'>
            
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price: 500</h5>
                </div>
                <div className='card-footer'>
                <button title="Add to card" className='btn btn-success btn-sm'>
                    <i class="fa-solid fa-cart-plus"></i></button>
                <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                    <i class="fa fa-heart"></i></button>
                </div>
            </div>
            </div>

            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price: 500</h5>
                </div>
                <div className='card-footer'>
                <button title="Add to card" className='btn btn-success btn-sm'>
                    <i class="fa-solid fa-cart-plus"></i></button>
                <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                    <i class="fa fa-heart"></i></button>
                </div>
            </div>
            </div>

            

            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price: 500</h5>
                </div>
                <div className='card-footer'>
                <button title="Add to card" className='btn btn-success btn-sm'>
                    <i class="fa-solid fa-cart-plus"></i></button>
                <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                    <i class="fa fa-heart"></i></button>
                </div>
            </div>
            </div>

            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price: 500</h5>
                </div>
                <div className='card-footer'>
                <button title="Add to card" className='btn btn-success btn-sm'>
                    <i class="fa-solid fa-cart-plus"></i></button>
                <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                    <i class="fa fa-heart"></i></button>
                </div>
            </div>
            </div>
        </div>

        <h3 className='mb-4'>Popular Sellers<Link to='/sellers' className='float-end btn btn-sm btn-dark'>View All Seller</Link></h3>
        <div className='row mb-4'>
            
           
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories: <a href="#">Cat1</a>, <a href="#">Cat2</a>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories <a href="#">Cat1</a>, <a href="#">Cat2</a>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories: <a href="#">Cat1</a>, <a href="#">Cat2</a>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories: <a href="#">Cat1</a>, <a href="#">Cat2</a>
                </div>
            </div>
            </div>

        </div>
        </div>

    </main>
    )
} 
export default Home;
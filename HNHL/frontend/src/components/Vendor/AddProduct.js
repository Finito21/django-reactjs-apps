import VendorSidebar from './VendorSidebar';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom';
import { useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api/';

function AddProduct(){
    const vendor_id=localStorage.getItem('vendor_id');
    const [ErrorMsg,setErrorMsg]=useState('');
    const [SuccessMsg,setSuccessMsg]=useState('');
    const [CategoryData,setCategoryData]=useState([]);
    const [ProductData,setProductData]=useState({
        'category':'',
        'vendor':'',
        'title':'',
        'slug':'',
        'detail':'',
        'price':'',
        'usd_price':'',
        'eur_price':'',
        'tags':'',
        'image':'',
    });

    const inputHandler=(event)=>{
        setProductData({
            ...ProductData,
            [event.target.name]:event.target.value
        })

    };

    const fileHandler=(event)=>{
        setProductData({
            ...ProductData,
            [event.target.name]:event.target.files[0]
        })
    };
    
    const submitHandler=()=>{
        const formData=new FormData();
        formData.append('vendor',ProductData.vendor);
        formData.append('category',ProductData.category);
        formData.append('title',ProductData.title);
        formData.append('slug',ProductData.slug);
        formData.append('detail',ProductData.detail);
        formData.append('price',ProductData.price);
        formData.append('usd_price',ProductData.usd_price);
        formData.append('eur_price',ProductData.eur_price);
        formData.append('tags',ProductData.tags);
        formData.append('image',ProductData.image);
        

        axios.post(baseUrl + 'products/', formData,{
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        .then(function (response) {
            if (response.status==201) {
                setErrorMsg('');
                setSuccessMsg(response.statusText);
            } else {
                setProductData({
                    'category':'',
                    'vendor':'',
                    'title':'',
                    'slug':'',
                    'detail':'',
                    'price':'',
                    'usd_price':'',
                    'eur_price':'',
                    'tags':'',
                    'image':'',
                })
                setErrorMsg('');
                setSuccessMsg(response.statusText);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        setProductData({
            ...ProductData,
            'vendor':vendor_id,
        });
        fetchData(baseUrl+'categories/');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCategoryData(data.results);
        });
    }

    return(
        <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <VendorSidebar></VendorSidebar>
                    </div>
                    <div className='col-md-9 col-12 mb-2'>
                        <div className='card'>
                            <h4 className='card-header'>Add Product</h4>
                            <div className='card-body'>
                                {SuccessMsg && <p className='text-success'>{SuccessMsg}</p>}
                                {ErrorMsg && <p className='text-danger'>{ErrorMsg}</p>}
                                <form>
                                <div className='mb-3'>
                                        <label for="Title" className='form-label'>Category</label>
                                        <select className='form-control' name='category' onChange={inputHandler}>
                                            {
                                                CategoryData.map((item,index)=><option value={item.id}>{item.title}</option>)
                                            }
                                        </select>
                                    </div>

                                    <div className='mb-3'>
                                        <label for="Title" className='form-label'>Title</label>
                                        <input type="text" name='title' value={ProductData.title} onChange={inputHandler} className='form-control' id="Title"/>
                                    </div>

                                    <div className='mb-3'>
                                        <label for="Slug" className='form-label'> Slug</label>
                                        <input type="text" name='slug' value={ProductData.slug} onChange={inputHandler} className='form-control' id="Slug"/>
                                    </div>

                                    <div className='mb-3'>
                                        <label for="PLN_Price" className='form-label'>PLN Price</label>
                                        <input type="number" name='price' value={ProductData.price} onChange={inputHandler} className='form-control' id="PLN_Price"/>
                                    </div>

                                    <div className='mb-3'>
                                        <label for="USD_Price" className='form-label'>USD Price</label>
                                        <input type="number" name='usd_price' value={ProductData.usd_price} onChange={inputHandler} className='form-control' id="USD_Price"/>
                                    </div>

                                    <div className='mb-3'>
                                        <label for="EUR_Price" className='form-label'>EUR Price</label>
                                        <input type="number" name='eur_price' value={ProductData.eur_price} onChange={inputHandler} className='form-control' id="EUR_Price"/>
                                    </div>

                                    <div className='mb-3'>
                                        <label for="Detail" className='form-label'>Detail</label>
                                        <textarea className='form-control' name='detail' value={ProductData.detail} onChange={inputHandler} rows='8' id="Detail"/>
                                    </div>

                                    <div className='mb-3'>
                                        <label for="Tags" className='form-label'>Tags</label>
                                        <textarea className='form-control' name='tags' value={ProductData.tags} onChange={inputHandler} rows="8" id="Tags"/>
                                    </div>

                                    <div className='mb-3'>
                                        <div className='mb-3'>
                                            <label for="ProductImg" className='form-label'>Featured Image</label>
                                            <input type="file" name='image' className='form-control' onChange={fileHandler} id="ProductImg"/>
                                        </div>
                                    </div>

                                    
                                    <button type='button' onClick={submitHandler} className='btn btn-primary'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
                        }
                        export default AddProduct;
import VendorSidebar from './VendorSidebar';
import { useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function UpdateProduct(){
    const {product_id}=useParams();
    const vendor_id=localStorage.getItem('vendor_id');

    const [IsImageDelated,setIsImageDelated]=useState(false);

    const [IsFeatureImageSelected,setIsFeatureImageSelected]=useState(false);
    const [IsMultipleProductImagesSelected,setIsMultipleProductImagesSelected]=useState(false);

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
        'product_imgs':'',
    });

    const [ProductImgs,setProductImgs]=useState([]);
   

    const inputHandler=(event)=>{
        setProductData({
            ...ProductData,
            [event.target.name]:event.target.value
        })

    };
    const fileHandler = (event)=>{
        setProductData({
            ...ProductData,
            [event.target.name]:event.target.files[0]
        })

        if(event.target.name=='image'){
            setIsFeatureImageSelected(true);
        }
    };

    const multipleFilesHandler=(event)=>{
        var files=event.target.files;
        if(files.length>0){
            setIsMultipleProductImagesSelected(true)
            setProductImgs(files);
        }
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
        
        if(IsFeatureImageSelected){
            formData.append('image',ProductData.image);
        }
        
        

        axios.patch(baseUrl + 'product/'+product_id+'/', formData,{
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        .then(function (response) {
            if (response.status==200) {
                
                setErrorMsg('');
                setSuccessMsg('Product updated successfully! ');

                if(IsMultipleProductImagesSelected){
                    for(let i=0;i < ProductImgs.length;i++){
                        const ImageFormData=new FormData();
                        ImageFormData.append('product',response.data.id);
                        ImageFormData.append('image',ProductImgs[i]);
                        axios.post(baseUrl + 'product-imgs/?from_update=1', ImageFormData)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    }
                }

                
            } else {
                setSuccessMsg('');
                setErrorMsg('Product did not updated successfully!');
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
        fetchProductData(baseUrl+'product/'+ product_id);
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCategoryData(data.results);
        });
    }


    function deleteImage(image_id){
        axios.delete(baseUrl + 'product-img/' + image_id + '/')
        .then(function(response){
            if(response.status==204){
                window.location.reload();
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }


    function fetchProductData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProductData({
                'category':data.category,
                'vendor':data.vendor,
                'title':data.title,
                'slug':data.slug,
                'detail':data.detail,
                'price':data.price,
                'usd_price':data.usd_price,
                'eur_price':data.eur_price,
                'tags':data.tags,
                'image':data.image,
                'product_imgs':data.product_imgs,
            });
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
                            <h4 className='card-header'>Update Product</h4>
                            <div className='card-body'>
                                {SuccessMsg && <p className='text-success'>{SuccessMsg}</p>}
                                {ErrorMsg && <p className='text-danger'>{ErrorMsg}</p>}
                                <form>
                                <div className='mb-3'>
                                        <label for="Title" className='form-label'>Category</label>
                                        <select className='form-control' name='category' onChange={inputHandler}>
                                            {
                                                CategoryData.map((item,index)=>
                                                <option selected={item.id==ProductData.category} value={item.id}>{item.title}</ option>)
                                                
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
                                            <img src={ProductData.image} className='img rounded border mt-2' width='200'/>
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <div className='mb-3'>
                                            <label for="Product_Imgs" className='form-label'>Product Images</label>
                                            <input type="file" multiple name='product_imgs' onChange={multipleFilesHandler} className='form-control' id="Product_Imgs"/>
                                            <>
                                            {
                                                ProductData.product_imgs && ProductData.product_imgs.map((img, index) => (
                                                    <span className='mb-3 m-2 mr-2' onClick={() => deleteImage(img.id)} style={{ position: 'relative', display: 'inline-block' }}>
                                                        <img src={img.image} className='img rounded border' width='200' />
                                                        <i class='fa fa-trash text-danger' role='button'
                                                            style={{
                                                                position: 'absolute',
                                                                top: '0',
                                                                right: '0',
                                                                cursor: 'pointer',
                                                                zIndex: '0',
                                                            }}
                                                            ></i>
                                                    </span>
                                                ))
                                            }
                                            </>
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
export default UpdateProduct;
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';
import { useParams } from 'react-router-dom';
import { useState,useEffect} from 'react';
function ProductDetail(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [productData,setproductData]=useState([]);
    const [productImgs,setproductImgs]=useState([]);
    const {product_slug,product_id} = useParams();

    useEffect(() => {
        fetchData(baseUrl+'/product/'+product_id);
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setproductData(data);
            setproductImgs(data.product_imgs)
        });
    }


    return (
        <section className='container mt-4'>
            <div className='row'>
                <div className='col-4'>
                    <div id="productThumbnailSlider" className="carousel carousel-dark slide carousel-fade" data-bs-ride="true">
                        <div className="carousel-indicators">
                        {productImgs.map((img,index)=>{
                                if(index===0){
                                    return <button type="button" data-bs-target="#productThumbnailSlider" 
                                    data-bs-slide-to={index} className="active" aria-current="true" aria-label="Slide 1"></button>
                                }else{
                                    return <button type="button" data-bs-target="#productThumbnailSlider" 
                                    data-bs-slide-to={index}  aria-current="true" aria-label="Slide 1"></button>
                            
                                }
                                    
                            })} 
                        </div>
                        <div className="carousel-inner">
                            {productImgs.map((img,index)=>{
                                if(index===0){
                                    return <div className="carousel-item active">
                                        <img src={img.image} className='img-thumbnail mb-5' alt={index}/>
                                    </div>
                                }else{
                                    return <div className="carousel-item">
                                        <img src={img.image} className="img-thumbnail mb-5" alt={index}/>
                                    </div>
                                }
                            })}
                          
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div> 
                </div>               
                
            
                <div className='col-8'>
                    <h3>{productData.title}</h3>
                    <p>{productData.detail}</p>
                    <h5 className='img-title'>Price: {productData.price}</h5>
                    <p className='mt-3'>
                        <button title="Add to img" className='btn btn-primary'>
                            <i className="fa-solid fa-cart-plus"></i>Add to Cart
                            </button>
                        <button title="buy Now" className='btn btn-success ms-1'>
                            <i className="fa-solid fa-bag-shopping"></i>Buy Now
                            </button>    
                        <button title="Add to Wishlist" className='btn btn-danger ms-1'>
                            <i className="fa fa-heart"></i>Wishlist</button>
                    </p>
                    <hr/>
                    <div className='producttags mt-4'>
                        <h5>Tags</h5>
                        <p>
                            <Link to="#" className='badge bg-secondary text-white me-1'>cat1</Link>
                            <Link to="#" className='badge bg-secondary text-white me-1'>cat2</Link>
                            <Link to="#" className='badge bg-secondary text-white me-1'>cat3</Link>
                            <Link to="#" className='badge bg-secondary text-white me-1'>cat4</Link>
                        </p>
                    </div>
                </div>

            </div>
            {/*

            <h3 className='mt-5 mb-3'>Related Products</h3>

            <div id="relatedProductsSlider" className="carousel carousel-dark slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#relatedProductsSlider" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#relatedProductsSlider" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#relatedProductsSlider" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className='row mb-4'>
                            <SingleProduct title="Django Project 1"/>
                            <SingleProduct title="Django Project 2"/>
                            <SingleProduct title="Django Project 3"/>
                            <SingleProduct title="Django Project 4"/>
                        </div>
                    </div>
                    <div className="carousel-item">
                    <div className='row mb-4'>
                            <SingleProduct title="Django Project 5"/>
                            <SingleProduct title="Django Project 6"/>
                            <SingleProduct title="Django Project 7"/>
                            <SingleProduct title="Django Project 8"/>
                        </div>
                    </div>
                    <div className="carousel-item">
                    <div className='row mb-4'>
                            <SingleProduct title="Django Project 9"/>
                            <SingleProduct title="Django Project 10"/>
                            <SingleProduct title="Django Project 11"/>
                            <SingleProduct title="Django Project 12"/>
                        </div>
                    </div>
                </div>
                {/*<button className="carousel-control-prev" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
    </button
            </div>
            >*/}




        </section>

    )

}
export default ProductDetail;
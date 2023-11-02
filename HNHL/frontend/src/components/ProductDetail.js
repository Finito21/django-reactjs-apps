import { Link } from 'react-router-dom';
import logo from '../logo.svg';
function ProductDetail(){
    return (
        <section className='container mt-4'>
            <div className='row'>
                <div className='col-4'>
                    <img src={logo} className='img-thumbnail' alt="..."/>
                </div>
                
            
                <div className='col-8'>
                    <h3>Product Title</h3>
                    <p>djnakljxnckjznxkjcnzkjnxckjnzcxkjnxzckjnzzxczxczczxczxczxczxczxczxczczcxzcxzxczczcxzdsv c xcvcvxzzvCvzwfdsx SDfCscxezxcczcx</p>
                    <h5 className='card-title'>Price 500</h5>
                    <p className='mt-3'>
                        <button title="Add to card" className='btn btn-primary'>
                            <i class="fa-solid fa-cart-plus"></i>Add to Cart
                            </button>
                        <button title="buy Now" className='btn btn-success ms-1'>
                            <i class="fa-solid fa-bag-shopping"></i>Buy Now
                            </button>    
                        <button title="Add to Wishlist" className='btn btn-danger ms-1'>
                            <i class="fa fa-heart"></i>Wishlist</button>
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




        </section>

    )

}
export default ProductDetail;
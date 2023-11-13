import logo from '../logo.svg';
import {Link} from 'react-router-dom';


function SingleRelatedProduct(props){
    return(
            <div className='col-4 offset-4 mb-4'>
                <div className="card">
                    <Link to={`/product/${props.product.slug}/${props.product.id}`}> 
                        <img src={props.product.image} className="card-img-top" alt="..."/>
                    </Link>
                    <div className="card-body">
                        <h4 className="card-title"><Link to={`/product/${props.product.slug}/${props.product.id}`}>{props.product.title} </Link></h4>
                        <h5 className="card-title text-muted">Price: {props.product.price}</h5>
                    </div>
                    <div className='card-footer'>
                        <button title="Add to card" className='btn btn-success btn-sm'>
                            <i class="fa-solid fa-cart-plus"></i></button>
                        <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                            <i class="fa fa-heart"></i></button>
                    </div>
                </div>
            </div>
)
}
export default SingleRelatedProduct;
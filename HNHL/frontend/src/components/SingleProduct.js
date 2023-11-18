import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import {CurrencyContext} from '../Context';
import {useContext} from 'react';

function SingleProduct(props){
    const {CurrencyData}=useContext(CurrencyContext);
    return(
            <div className='col-12 col-md-3 mb-4'>
                <div className="card">
                    <Link to={`/product/${props.product.slug}/${props.product.id}`}> 
                        <img src={props.product.image} className="card-img-top" alt="..."/>
                    </Link>
                    <div className="card-body">
                        <h4 className="card-title"><Link to={`/product/${props.product.slug}/${props.product.id}`}>{props.product.title} </Link></h4>
                        {
                        CurrencyData == 'PLN' && <h5 className='card-title text-muted'>Price: {props.product.price} PLN</h5>
                    }
                    {
                        CurrencyData != 'PLN' && <h5 className='card-title text-muted'>Price: {props.product.price} USD</h5>
                    }
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
export default SingleProduct;
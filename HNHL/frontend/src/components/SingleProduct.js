import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import {CurrencyContext,CartContext, UserContext} from '../Context';
import {useContext, useEffect,useState} from 'react';
import axios from "axios";

function SingleProduct(props){
    const baseUrl='http://127.0.0.1:8000/api';
    const [productData,setproductData]=useState([]);
    const { CurrencyData } = useContext(CurrencyContext);
    const { cartData, setCartData } = useContext(CartContext);
    const [ProductInWishlist,setProductInWishlist]=useState(false);
    const userContext=useContext(UserContext);
  
    // Sprawdź, czy produkt jest w koszyku
    const isProductInCart = cartData.some((cartItem) => cartItem.product.id === props.product.id);

    useEffect(() => {
        checkProductInWishList(baseUrl + '/check-in-wishlist/',props.product.id);

    },[]);
  
    const addToCartHandler = () => {
      const newCartItem = {
        product: {
          id: props.product.id,
          title: props.product.title,
          price: props.product.price,
          usd_price: props.product.usd_price,
          eur_price: props.product.eur_price,
          image: props.product.image,
        },
        user: {
          id: 1, // Pobierz rzeczywiste ID użytkownika, np. z kontekstu użytkownika
        },
        total_amount: 1,
      };
  
      setCartData((prevCartData) => [...prevCartData, newCartItem]);
    };
  
    const removeFromCartHandler = () => {
      // Usuń produkt z koszyka na podstawie jego ID
      const updatedCart = cartData.filter((cartItem) => cartItem.product.id !== props.product.id);
      setCartData(updatedCart);
    };
  
    function saveInWishList(){
        const customerId=localStorage.getItem('customer_id');
        const formData=new FormData();
        formData.append('customer',customerId);
        formData.append('product',productData.id);

        axios.post(baseUrl + '/wishlist/', formData)
        .then(function(response){
            if(response.data.id){
                setProductInWishlist(true);
            }
            
        })
        .catch(function(error){
            console.log(error);
        })
    }
    function checkProductInWishList(baseUrl,product_id){
        const customerId=localStorage.getItem('customer_id');
        const formData=new FormData();
        formData.append('customer',customerId);
        formData.append('product',product_id);

        axios.post(baseUrl, formData)
        .then(function(response){
            if(response.data.bool==true){
                setProductInWishlist(true);
            }
            else{
                setProductInWishlist(false);
            }
            
        })
        .catch(function(error){
            console.log(error);
        })
    }
  

    return(
            <div className='col-12 col-md-3 mb-4'>
                <div className="card">
                    <Link to={`/product/${props.product.slug}/${props.product.id}`}> 
                        <img src={props.product.image} className="card-img-top" alt="..." style={{ height: '250px', width: '100%', objectFit: 'contain' }}/>
                    </Link>
                    <div className="card-body">
                        <h4 className="card-title"><Link to={`/product/${props.product.slug}/${props.product.id}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        >{props.product.title} </Link></h4>
                        {
                            (CurrencyData!='USD' && CurrencyData!='EUR') && <h5 className='card-title'>Price: {props.product.price} zł</h5>
                        }
                        {
                            CurrencyData == 'USD' && <h5 className='card-title'>Price: {props.product.usd_price} $</h5>
                        }
                        {
                            CurrencyData == 'EUR' && <h5 className='card-title'>Price: {props.product.eur_price} €</h5>
                        }
                    </div>
                    <div className='card-footer'>

                    {(userContext.login &&
                    <>

                        {isProductInCart ? (
                            <button title='Remove from cart' onClick={removeFromCartHandler} className='btn btn-warning btn-sm'>
                                <i className='fa-solid fa-cart-plus'></i>
                            </button>
                        ) : (
                            <button title='Add to cart' onClick={addToCartHandler} className='btn btn-success btn-sm'>
                            <i className='fa-solid fa-cart-plus'></i>
                            </button>
                        )}

                        {!ProductInWishlist && 
                            <button onClick={saveInWishList} title="Add to Wishlist" className='btn btn-danger ms-1'>
                                <i className="fa fa-heart"></i>
                            </button>
                        } 
                        {ProductInWishlist && 
                            <button title="Add to Wishlist" className='btn btn-danger ms-1 disabled'>
                                <i className="fa fa-heart"></i>
                            </button>
                            }   
                    </>
                    )}
                    {(userContext.login == null &&
                        <>
                        <button title='Add to cart' className='btn btn-success btn-sm'>
                            <Link className="nav-link" aria-current="page" to="/customer/login">
                                <i className='fa-solid fa-cart-plus'></i>
                            </Link>
                        </button>

                        <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                            <Link className="nav-link" aria-current="page" to="/customer/login">
                                <i className='fa-solid fa-heart'></i>
                            </Link>
                        </button>
                        
                        
                        </>
                    )}

                    </div>
                </div>
            </div>
)
}
export default SingleProduct;
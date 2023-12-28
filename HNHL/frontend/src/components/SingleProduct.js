import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import {CurrencyContext,CartContext, UserContext} from '../Context';
import {useContext, useEffect,useState} from 'react';
import axios from "axios";

function SingleProduct(props){
    const baseUrl='http://127.0.0.1:8000/api';
    const { CurrencyData } = useContext(CurrencyContext);
    const { cartData, setCartData } = useContext(CartContext);
    const [cartButtonClickStatus,setcartButtonClickStatus]=useState(false);
    const [ProductInWishlist,setProductInWishlist]=useState(false);
    const userContext=useContext(UserContext);
    const customerId = localStorage.getItem('customer_id');
  
    

    useEffect(() => {
        checkProductInWishList(baseUrl + '/check-in-wishlist/',props.product.id);
        checkProductInCart(props.product_id);
    },[]);


    function checkProductInCart(product_id){
        var previousCart=localStorage.getItem(`cartData_${customerId}`);
        var cartJson=JSON.parse(previousCart);
        if(cartJson!=null){
            cartJson.map((cart)=>{
                if(cart!=null && cart.product.id == product_id){
                    setcartButtonClickStatus(true);
                }
            });
        }
    }
  
    const cartAddButtonHandler = ()=>{
        var previousCart=localStorage.getItem(`cartData_${customerId}`);
        var cartJson=JSON.parse(previousCart)
        var cartData={
            'product':{
                'id':props.product.id,
                'title':props.product.title,
                'price':props.product.price,
                'usd_price':props.product.usd_price,
                'eur_price':props.product.eur_price,
                'image':props.product.image,
                'purchase_count':props.product.purchase_count
            },
            'user':{
                'id':1
            },
            'total_amount':10
        }
        console.log(cartData)
        if(cartJson!=null){
            cartJson.push(cartData);
            var cartString=JSON.stringify(cartJson);
            localStorage.setItem(`cartData_${customerId}`,cartString);
            setCartData(cartJson);
        }else{
            var newCartList=[];
            newCartList.push(cartData);
            var cartString=JSON.stringify(newCartList);
            localStorage.setItem(`cartData_${customerId}`,cartString);
        }
        setcartButtonClickStatus(true);
    }
  
    const cartRemoveButtonHandler = ()=>{
        var previousCart=localStorage.getItem(`cartData_${customerId}`);
        var cartJson=JSON.parse(previousCart)
        cartJson.map((cart,index)=>{
            if(cart!=null && cart.product.id==props.product.id){
                //delete cartJson[index];
                cartJson.splice(index,1);
            }
        });
        var cartString=JSON.stringify(cartJson);
        localStorage.setItem(`cartData_${customerId}`,cartString)
        setcartButtonClickStatus(false);
        setCartData(cartJson);
    }




  
    function saveInWishList(){
        const customerId=localStorage.getItem('customer_id');
        const formData=new FormData();
        formData.append('customer',customerId);
        formData.append('product',props.product.id);

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
            <div className='col-12 col-md-3 mb-4' style={{minWidth: '250px'}}>
                <div className="card"  >
                    <Link to={`/product/${props.product.slug}/${props.product.id}`}> 
                        <img src={props.product.image} className="card-img-top" alt="..." style={{ height: '250px', width: '100%', objectFit: 'contain' }}/>
                    </Link>
                    <div className="card-body" style={{ height: '110px', width: '100%', objectFit: 'contain' }}>
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
                            {!cartButtonClickStatus&&
                                <button title="Add to Cart" type='button' onClick={cartAddButtonHandler} className='btn btn-primary'>
                                    <i className="fa-solid fa-cart-plus"></i>
                                    </button>
                            }
                            {cartButtonClickStatus&&
                                <button title="Remove from Cart" type='button' onClick={cartRemoveButtonHandler} className='btn btn-warning'>
                                    <i className="fa-solid fa-cart-plus"></i>
                                    </button>
                            }
                            {!ProductInWishlist && <button onClick={saveInWishList} title="Add to Wishlist" className='btn btn-danger ms-1'>
                                <i className="fa fa-heart"></i></button>
                            }
                            {ProductInWishlist && <button title="Add to Wishlist" className='btn btn-danger ms-1 disabled'>
                                <i className="fa fa-heart"></i></button>
                            }
                        </>
                        )
                        }
                        {
                        (userContext.login == null &&
                        <>
                            
                            <button title="Add to Cart" type='button' className='btn btn-success disabled'>
                                <i className="fa-solid fa-cart-plus"></i>
                            </button>
                            
                            <button title="Add to Wishlist" className='btn btn-danger ms-1 disabled'>
                                <i className="fa fa-heart"></i>
                            </button>
                        </> 
                        )}  

                    </div>
                </div>
            </div>
)
}
export default SingleProduct;
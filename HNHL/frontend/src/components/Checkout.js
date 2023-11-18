import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import { useContext,useState} from 'react';
import { CartContext,CurrencyContext } from '../Context';

function Checkout(props){
    const {cartData,setCartData}=useContext(CartContext);
    const [cartButtonClickStatus,setcartButtonClickStatus]=useState(false);
    const [productData,setproductData]=useState([]);
    const {CurrencyData}=useContext(CurrencyContext);
    if(cartData==null || cartData.length==0){
        var cartItems=0;
    }else{
        var cartItems=cartData.length;
    }

    
    var sum=0;
    cartData.map((item,index)=>{
        if(CurrencyData=='PLN' || CurrencyData==undefined){
            sum+=parseFloat(item.product.price);
        }
        else if(CurrencyData=='USD'){
            sum+=parseFloat(item.product.usd_price);
        }
        else if(CurrencyData=='EUR'){
            sum+=parseFloat(item.product.eur_price);
        }
    })


    const cartRemoveButtonHandler = (product_id)=>{
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart)
        cartJson.map((cart,index)=>{
            if(cart!=null && cart.product.id==product_id){
                //delete cartJson[index];
                cartJson.splice(index,1);
            }
        });
        var cartString=JSON.stringify(cartJson);
        localStorage.setItem('cartData',cartString)
        setcartButtonClickStatus(false);
        setCartData(cartJson);
    }


    return(
            <div className='container mt-4'>
                <h3 className='mb-4'>All Items ({cartItems})</h3>
                {cartItems!=0&&
                <div className='row'>
                    <div className='col-12'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems&&
                                        cartData.map((item,index)=>{
                                            return(
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>
                                                        <Link><img src={item.product.image} className="img-thumbail" width='80' alt={item.product.title}/></Link>
                                                        <p><Link>{item.product.title}</Link></p>
                                                    </td>
                                                    <td> 
                                                        {
                                                        CurrencyData == 'PLN' && <h5 className='card-title'>Price: {item.product.price} zł</h5>
                                                        }
                                                        {
                                                            CurrencyData == 'USD' && <h5 className='card-title'>Price: {item.product.usd_price} $</h5>
                                                        }
                                                        {
                                                            CurrencyData == 'EUR' && <h5 className='card-title'>Price: {item.product.eur_price} €</h5>
                                                        }
                                                    </td>
                                                    <td>
                                                    
                                                        <button title="Remove from Cart" type='button' onClick={()=>cartRemoveButtonHandler(item.product.id)} className='btn btn-warning'>
                                                            <i className="fa-solid fa-cart-plus"></i>Remove from Cart
                                                        </button>
                                                    
                                                    </td>
                                                </tr>
                                            )

                                        })
                                    }   
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Total</th>
                                        <th>
                                            {
                                                (CurrencyData=='PLN'|| CurrencyData==undefined) && <th>{sum} zł</th>
                                            }
                                            {
                                                (CurrencyData=='USD'|| CurrencyData==undefined) && <th>{sum} $</th>
                                            }
                                            {
                                                (CurrencyData=='EUR'|| CurrencyData==undefined) && <th>{sum} €</th>
                                            }
                                        </th>
                                    </tr>
                                    <tr>
                                        <td colSpan='4' align='center'>
                                            <Link to="/categories" className='btn btn-secondary'>Continue Shopping</Link>
                                            <Link to="/confirm-order" className='btn btn-success ms-1'>Proceed to Payment</Link>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                }
                {cartItems==0 &&
                <Link to="/categories" className='btn btn-success'>Home</Link>
                }
                
            </div>
    )
}
export default Checkout;
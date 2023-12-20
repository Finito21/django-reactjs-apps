import {Link} from 'react-router-dom';
import { useState,useContext, useEffect } from 'react';
import {UserContext, CartContext, CurrencyContext} from '../Context';
import logo from '../logo.svg';

function HomeHeader(props){
    const userContext=useContext(UserContext);
    const {cartData}=useContext(CartContext)

    const checkVendor=localStorage.getItem('vendor_login');
   
    const {CurrencyData,setCurrencyData}=useContext(CurrencyContext);
    if(cartData==null){
        var cartItems=0;
    }else{
        var cartItems=cartData.length;
    }

    const changeCurrency=(e)=>
    {
        var _currency=e.target.value;
        localStorage.setItem('currency',_currency)
        setCurrencyData(_currency);
    }
   


          const cartAddButtonHandler = ()=>{
            var previousCart=localStorage.getItem('cartData');
            var cartJson=JSON.parse(previousCart)
            var cartData={
                'product':{
                    'id':productData.id,
                    'title':productData.title,
                    'price':productData.price,
                    'usd_price':productData.usd_price,
                    'eur_price':productData.eur_price,
                    'image':productData.image
                },
                'user':{
                    'id':1
                },
                'total_amount':10
            }
            if(cartJson!=null){
                cartJson.push(cartData);
                var cartString=JSON.stringify(cartJson);
                localStorage.setItem('cartData',cartString);
                setCartData(cartJson);
            }else{
                var newCartList=[];
                newCartList.push(cartData);
                var cartString=JSON.stringify(newCartList);
                localStorage.setItem('cartData',cartString);
            }
            setcartButtonClickStatus(true);
        }

          const cartRemoveButtonHandler = ()=>{
            var previousCart=localStorage.getItem('cartData');
            var cartJson=JSON.parse(previousCart)
            cartJson.map((cart,index)=>{
                if(cart!=null && cart.product.id==productData.id){
                    //delete cartJson[index];
                    cartJson.splice(index,1);
                }
            });
            var cartString=JSON.stringify(cartJson);
            localStorage.setItem('cartData',cartString)
            setcartButtonClickStatus(false);
            setCartData(cartJson);
        }
    return (
        <div className="container text-center">
            
            <div className="row">
                <div className="col">
                    <Link to="/">
                        <img src={logo} alt="Logo" width="250" height="250" />
                    </Link>
                </div>
            </div>
    
            
                <div className="col">
                    <nav className="navbar  navbar-expand-lg navbar-dark bg-dark rounded">
                        <ul className="navbar-nav mx-auto">

                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">
                                Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/categories">
                                Categories
                                </Link>
                            </li>

                            {!checkVendor && (
                                <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">My Account</a>
                                    
                                    <ul className="dropdown-menu">
                                    {userContext.login !== 'true' && (
                                        <>
                                        <li>
                                            <Link className="dropdown-item" to="/customer/register">
                                            Register
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/customer/login">
                                            Login
                                            </Link>
                                        </li>
                                        </>
                                    )}
                                    {userContext.login === 'true' && (
                                        <>
                                        <li>
                                            <Link className="dropdown-item" to="/customer/dashboard">
                                            Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/customer/logout">
                                            Logout
                                            </Link>
                                        </li>
                                        </>
                                    )}
                                    </ul>
                                </li>
                                </>
                                )}

                            {checkVendor && (
                                <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Vendor Panel</a>
                                    
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/vendor/dashboard">
                                            Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/vendor/logout">
                                            Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                </>
                                )}

                            {!checkVendor && (
                            <>
    
                            <li className="nav-item">
                            {userContext.login == 'true' && (
                                <>
                                    <Link className="nav-link" aria-current="page" to="/checkout">
                                        My Cart ({cartItems})
                                    </Link>
                                </>
                            )}

                            {userContext.login !== 'true' && (
                                <>
                                    <Link className="nav-link" aria-current="page" to="/customer/login">
                                        My Cart ({cartItems})
                                    </Link>
                                </>)}
                            </li>
                            </>
                            )}

                            <li className='nav-item'>
                                <div className='nav-link' >
                                    <select onChange={changeCurrency} border-radius="0.25" >
                                        {
                                            (CurrencyData!='USD' && CurrencyData!='EUR') && <>
                                                <option value='PLN' selected>PLN</option>
                                                <option value='USD' >USD</option>
                                                <option value='EUR' >EUR</option>
                                            </>
                                        }
                                        {
                                            CurrencyData=='USD' && <>
                                            <option value='PLN' >PLN</option>
                                            <option value='USD' selected>USD</option>
                                            <option value='EUR' >EUR</option>
                                        </>
                                        }
                                        {
                                            CurrencyData=='EUR' && <>
                                            <option value='PLN' >PLN</option>
                                            <option value='USD' >USD</option>
                                            <option value='EUR' selected>EUR</option>
                                        </>
                                        }
                                    </select>
                                </div>   
                            </li>
                        </ul>
                    </nav>
                </div>

                
        </div>

           
        
        
             
    );
} 
export default HomeHeader;
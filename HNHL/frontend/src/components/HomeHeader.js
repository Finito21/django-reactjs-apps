import {Link} from 'react-router-dom';
import { useState,useContext, useEffect } from 'react';
import {UserContext, CartContext, CurrencyContext} from '../Context';
import logo from '../logo.svg';
import banner from '../banner.svg';
import '../CurrencySwitcher.css';

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
    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };
    
    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
    
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
    
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    
        var that = this;
        var delta = 200 - Math.random() * 100;
    
        if (this.isDeleting) { delta /= 2; }
    
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
    
        setTimeout(function() {
            that.tick();
        }, delta);
    };
    
    
        useEffect(() => {
            // Animation initialization logic
            var elements = document.getElementsByClassName('typewrite');
            for (var i = 0; i < elements.length; i++) {
              var toRotate = elements[i].getAttribute('data-type');
              var period = elements[i].getAttribute('data-period');
              if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
              }
            }
            // INJECT CSS
            var css = document.createElement('style');
            css.type = 'text/css';
            css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid transparent}';
            document.body.appendChild(css);
          }, []);


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
                    <nav className="navbar navbar-collapse navbar-expand-lg navbar-dark bg-dark rounded">
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

                <div class="static-slider1 py-4">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-7 align-self-center">
                                <h1 class="title">Invigorate your mind with our supplements - and remember also about  <span class="text-success-gradiant typewrite" data-period="2000" data-type='[ "HEALTHY NUTRITION", "HEALTHY LIFE"]'></span></h1>
                                <a class="btn btn-success-gradiant btn-md btn-arrow mt-3 text-white border-0" href=""><span>Read More</span></a>
                            </div>
                            <div class="col-md-5 mt-4">
                                <img src={banner} alt="wrapkit" class="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
        
        
             
    );
} 
export default HomeHeader;
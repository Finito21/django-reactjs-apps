import {Link} from 'react-router-dom';
import { useState,useContext } from 'react';
import {UserContext, CartContext, CurrencyContext} from '../Context';
import logo from '../logo.svg';

function Header(props){
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
    return (
    
    <nav className="navbar navbar-expand-lg">
        <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" width="120" height="120" />
                </Link>
                <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar-dark bg-dark rounded">
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/categories" >Categories</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                My Account
                            </a>
                            <ul className="dropdown-menu">
                                {userContext.login !='true' &&
                                <>
                                <li><Link className="dropdown-item" to="/customer/register">Register</Link></li>
                                <li><Link className="dropdown-item" to="/customer/login">Login</Link></li>
                                </>
                                }
                                {userContext.login =='true' &&
                                <>
                                    <li><Link className="dropdown-item" to="/customer/dashboard">Dashboard</Link></li>
                                    <li><Link className="dropdown-item" to="/customer/logout">Logout</Link></li>
                                </>
                                }
                            </ul>
                            </li>
                            
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Vendor Panel
                            </a>
                            <ul className="dropdown-menu">
                                {
                                    !checkVendor &&
                                    <>
                                        <li><Link className="dropdown-item" to="/vendor/register">Register</Link></li>
                                        <li><Link className="dropdown-item" to="/vendor/login">Login</Link></li>
                                    </>
                                }
                                {
                                    checkVendor &&
                                    <>
                                        <li><Link className="dropdown-item" to="/vendor/dashboard">Dashboard</Link></li>
                                        <li><Link className="dropdown-item" to="/vendor/logout">Logout</Link></li>
                                    </>
                                }
                            </ul>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/checkout" >My Cart ({cartItems})</Link>
                        </li>
                        <li className='nav-item'>
                            <div className='nav-link'>
                                <select onChange={changeCurrency}>
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
                </div>
            </div>
        </div>
    </nav>
    )
} 
export default Header;
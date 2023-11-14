import {Link} from 'react-router-dom';
import { useContext } from 'react';
import {UserContext, CartContext} from '../Context';

function Header(props){
    const userContext=useContext(UserContext);
    const {cartData,setcartData}=useContext(CartContext)
    if(cartData==null){
        var cartItems=0;
    }else{
        var cartItems=cartData.length;
    }

    return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="navbar-brand" to="/">HNHL</Link>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
                            {userContext !='true' &&
                            <>
                            <li><Link className="dropdown-item" to="/customer/register">Register</Link></li>
                            <li><Link className="dropdown-item" to="/customer/login">Login</Link></li>
                            </>
                            }
                            {userContext =='true' &&
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
                            <li><Link className="dropdown-item" to="/vendor/register">Register</Link></li>
                            <li><Link className="dropdown-item" to="/vendor/login">Login</Link></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><Link className="dropdown-item" to="/vendor/dashboard">Dashboard</Link></li>
                            <li><Link className="dropdown-item" to="/vendor/logout">Logout</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/checkout" >New Orders (4)</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/checkout" >My Cart ({cartItems})</Link>
                    </li>
                
                </ul>
            </div>
        </div>
    </nav>
    )
} 
export default Header;
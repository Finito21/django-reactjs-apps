import {Routes,Route, useLocation} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Header from './components/Header';
import HomeHeader from './components/HomeHeader';
import Home from './components/Home';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Categories from './components/Categories';
import AllProducts from './components/AllProducts';
import AllSellers from './components/AllSellers';
import ProductDetail from './components/ProductDetail';
import SellerDetail from './components/SellerDetail';
import CategoryProducts from './components/CategoryProducts';
import TagProducts from './components/TagProducts';
import Checkout from './components/Checkout';

import CustomerRegister from './components/Customer/CustomerRegister';
import Login from './components/Customer/Login';
import CustomerLogout from './components/Customer/CustomerLogout';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import Orders from './components/Customer/Orders';
import Wishlist from './components/Customer/Wishlist';
import CustomerProfile from './components/Customer/CustomerProfile';
import ChangeCustomerPassword from './components/Customer/ChangeCustomerPassword';
import AddressList from './components/Customer/AddressList';
import AddAddress from './components/Customer/AddAddress';
import UpdateAddress from './components/Customer/UpdateAddress';

import ConfirmOrder from './components/ConfirmOrder';
import OrderSuccess from './components/OrderSuccess';
import OrderFailure from './components/OrderFailure';

import VendorRegister from './components/Vendor/VendorRegister';
import VendorLogin from './components/Vendor/VendorLogin';
import VendorLogout from './components/Vendor/VendorLogout';
import VendorDashbaord from './components/Vendor/VendorDashboard';
import VendorProducts from './components/Vendor/VendorProducts';
import AddProduct from './components/Vendor/AddProduct';
import UpdateProduct from './components/Vendor/UpdateProduct';
import VendorOrders from './components/Vendor/VendorOrders';
import Customers from './components/Vendor/Customers';
import CustomerOrders from './components/Vendor/CustomerOrders';
import Reports from './components/Vendor/Reports';
import VendorProfile from './components/Vendor/VendorProfile';
import ChangeVendorPassword from './components/Vendor/ChangeVendorPassword';
import DailyReport from './components/Vendor/DailyReport';
import MonthlyReport from './components/Vendor/MonthlyReport';
import YearlyReport from './components/Vendor/YearlyReport';

import { CartContext, CurrencyContext, } from './Context';
import {useState} from 'react';
const checkCart=localStorage.getItem('cartData');

const currentCurrency=localStorage.getItem('currency');

function App() {
  
  const location = useLocation();

  const isHomeRoute = location.pathname === '/';
  const isAllProductsRoute=location.pathname === '/products';
  const isAllSellersRoute=location.pathname === '/sellers';
  const isBlogRoute=location.pathname === '/blog';

  const isCategoriesRoute=location.pathname === '/categories';

  const [cartData,setCartData]=useState(JSON.parse(checkCart));
  const [CurrencyData,setCurrencyData]=useState(currentCurrency);

  return (
    <CurrencyContext.Provider value={{CurrencyData,setCurrencyData}}>
    <CartContext.Provider value={{cartData,setCartData}}>
    {(isHomeRoute||isCategoriesRoute||isAllProductsRoute||isAllSellersRoute||isBlogRoute) ? <HomeHeader /> : <Header />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<AllProducts/>}/>
        <Route path='/sellers' element={<AllSellers/>}/>
        <Route path='/blog' element={<Blog/>}/>

        <Route path='/categories' element={<Categories/>}/>
        <Route path='/category/:category_slug/:category_id' element={<CategoryProducts/>}/>
        <Route path='/products/:tag' element={<TagProducts/>}/>

        <Route path='/product/:product_slug/:product_id' element={<ProductDetail/>}/>
        <Route path='/seller/:seller_username/:seller_id' element={<SellerDetail/>}/>
        <Route path='/checkout' element={<Checkout/>}/>

        <Route path='/customer/register' element={<CustomerRegister/>}/>
        <Route path='/customer/login' element={<Login/>}/>
        <Route path='/customer/logout' element={<CustomerLogout/>}/>

        <Route path='/customer/dashboard' element={<CustomerDashboard/>}/>

        <Route path='/customer/orders' element={<Orders/>}/>
        <Route path='/customer/wishlist' element={<Wishlist/>}/>
        <Route path='/customer/customer-profile' element={<CustomerProfile/>}/>
        <Route path='/customer/change-customer-password' element={<ChangeCustomerPassword/>}/>
        <Route path='/customer/addresses' element={<AddressList/>}/>
        <Route path='/customer/add-address' element={<AddAddress/>}/>
        <Route path='/customer/update-address/:address_id' element={<UpdateAddress/>}/>


        <Route path='/confirm-order' element={<ConfirmOrder/>}/>
        <Route path='/order/success' element={<OrderSuccess/>}/>
        <Route path='/order/failure' element={<OrderFailure/>}/>

        <Route path='/vendor/register' element={<VendorRegister/>}/>
        <Route path='/vendor/login' element={<VendorLogin/>}/>
        <Route path='/vendor/logout' element={<VendorLogout/>}/>
        <Route path='/vendor/dashboard' element={<VendorDashbaord/>}/>
        <Route path='/vendor/products' element={<VendorProducts/>}/>
        <Route path='/vendor/update-product/:product_id' element={<UpdateProduct/>}/>
        <Route path='/vendor/add-product' element={<AddProduct/>}/>
        <Route path='/vendor/daily-report' element={<DailyReport/>}/>
        <Route path='/vendor/monthly-report' element={<MonthlyReport/>}/>
        <Route path='/vendor/yearly-report' element={<YearlyReport/>}/>

        <Route path='/vendor/orders' element={<VendorOrders/>}/>

        <Route path='/vendor/customers' element={<Customers/>}/>
        <Route path='/vendor/customer/:customer_id/orderitems' element={<CustomerOrders/>}/>
        <Route path='/vendor/reports' element={<Reports/>}/>
        <Route path='/vendor/vendor-profile' element={<VendorProfile/>}/>
        <Route path='/vendor/change-vendor-password' element={<ChangeVendorPassword/>}/>

      </Routes>
      <Footer/>
    </CartContext.Provider>
    </CurrencyContext.Provider>
    
  );
}

export default App;

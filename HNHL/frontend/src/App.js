import {Routes,Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Categories from './components/Categories';
import AllProducts from './components/AllProducts';
import ProductDetail from './components/ProductDetail';
import CategoryProducts from './components/CategoryProducts';
import Checkout from './components/Checkout';

import CustomerRegister from './components/Customer/CustomerRegister';
import CustomerLogin from './components/Customer/CustomerLogin';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import CustomerOrders from './components/Customer/CustomerOrders';
import Wishlist from './components/Customer/Wishlist';
import Profile from './components/Customer/Profile';
import ChangePassword from './components/Customer/ChangePassword';
import AddressesList from './components/Customer/AddressesList';
import AddAddress from './components/Customer/AddAddress';


import OrderSuccess from './components/OrderSuccess';
import OrderFailure from './components/OrderFailure';

import VendorRegister from './components/Vendor/VendorRegister';
import VendorLogin from './components/Vendor/VendorLogin';
import VendorDashbaord from './components/Vendor/VendorDashboard';
import VendorProducts from './components/Vendor/VendorProducts';
import AddProduct from './components/Vendor/AddProduct';
import VendorOrders from './components/Vendor/VendorOrders';
import Customers from './components/Vendor/Customers';



function App() {
  return (
    <>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<AllProducts/>}/>

      <Route path='/categories' element={<Categories/>}/>
      <Route path='/category/:category_slug/:category_id' element={<CategoryProducts/>}/>
      <Route path='/product/:product_slug/:product_id' element={<ProductDetail/>}/>
      <Route path='/checkout' element={<Checkout/>}/>

      <Route path='/customer/register' element={<CustomerRegister/>}/>
      <Route path='/customer/login' element={<CustomerLogin/>}/>
      <Route path='/customer/dashboard' element={<CustomerDashboard/>}/>

      <Route path='/customer/CustomerOrders' element={<CustomerOrders/>}/>
      <Route path='/customer/wishlist' element={<Wishlist/>}/>
      <Route path='/customer/profile' element={<Profile/>}/>
      <Route path='/customer/change-password' element={<ChangePassword/>}/>
      <Route path='/customer/addresses' element={<AddressesList/>}/>
      <Route path='/customer/add-address' element={<AddAddress/>}/>



      <Route path='/order/success' element={<OrderSuccess/>}/>
      <Route path='/order/failure' element={<OrderFailure/>}/>

      <Route path='/vendor/register' element={<VendorRegister/>}/>
      <Route path='/vendor/login' element={<VendorLogin/>}/>
      <Route path='/vendor/dashboard' element={<VendorDashbaord/>}/>
      <Route path='/vendor/products' element={<VendorProducts/>}/>
      <Route path='/vendor/add-product' element={<AddProduct/>}/>
      <Route path='/vendor/VendorOrders' element={<VendorOrders/>}/>
      <Route path='/vendor/customers' element={<Customers/>}/>


    </Routes>
    <Footer/>
    </>
    
  );
}

export default App;

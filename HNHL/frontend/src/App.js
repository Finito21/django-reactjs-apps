import {Routes,Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Categories from './components/Categories';
import CategoryProducts from './components/CategoryProducts';


function App() {
  return (
    <>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/category/:category_slug/:category_id' element={<CategoryProducts/>}/>

    </Routes>
    <Footer/>
    </>
    
  );
}

export default App;

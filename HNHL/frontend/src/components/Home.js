import {Link} from 'react-router-dom';
import SingleProduct from './SingleProduct';
import logo from '../logo.svg';
import { useState,useEffect } from 'react';
import SingleSeller from './SingleSeller';
import banner from '../banner.svg';
import '../CurrencySwitcher.css';
function Home(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [products,setProducts]=useState([]);
    const [categories,setCategories]=useState([]);
    const [vendors,setVendors]=useState([]);;



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

    useEffect(() => {
        fetchProducts(baseUrl+'/products/?fetch_limit=4');
        fetchCategories(baseUrl+'/categories/?fetch_limit=4');
        fetchVendors(baseUrl+'/vendors/?fetch_limit=4');
    },[]);

    function fetchProducts(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.results);
        });
    }
    function fetchCategories(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCategories(data.results);
        });
    }
    function fetchVendors(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setVendors(data.results);
        });
    }

    return (
    <main className='mt-1'>
       <div class="static-slider1 py-4">
    <div class="container">
        <div class="row">
            <div class="col-md-7 align-self-center">
                <h1 class="title">Invigorate your mind with our supplements - and remember also about  <span class="text-success-gradiant typewrite" data-period="2000" data-type='[ "HEALTHY NUTRITION", "HEALTHY LIFE"]'></span></h1>
                <Link to='/blog' className="btn btn-success-gradiant btn-md btn-arrow mt-3 text-white border-0" href=""><span>Read More</span></Link>
            </div>
            <div class="col-md-5 mt-4 d-flex justify-content-end">
                <img src={banner} alt="wrapkit" class="img-fluid"/>
            </div>
        </div>
    </div>
</div>


        <div className='container'>
        <h3 className='mb-4'>New Products<Link to='/products' className='float-end btn btn-sm btn-dark'>View All Products</Link></h3>
        <div className='row mb-4'>

        {
            products.map((product) => <SingleProduct product={product}/>)
        }
        </div>

        <h3 className='mb-4'>Categories<Link to='/categories' className='float-end btn btn-sm btn-dark'>View All Categories</Link></h3>
        <div className='row mb-4'>
            
        {
            categories.map((category) => 
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <Link to={`/category/${category.title}/${category.id}`}>
                    <img src={category.category_img} className="card-img-top" alt={category.title} style={{ height: '250px', width: '100%' }}/>
                </Link>
                <div className="card-body text-center">
                    <h4 className="card-title"><Link to={`/category/${category.title}/${category.id}`} style={{ textDecoration: 'none', color: 'black' }}>{category.title}</Link></h4>
                </div>
                
            </div>
            </div>
            )
        }
        </div>

        <h3 className='mb-4'>New Sellers<Link to='/sellers' className='float-end btn btn-sm btn-dark'>View All Seller</Link></h3>
        <div className='row mb-4'>
            
           
           
                {
                vendors.map((seller) => <SingleSeller seller={seller}/>)
                }
                        
            
            
        </div>
    </div>

    </main>
    )
} 
export default Home;
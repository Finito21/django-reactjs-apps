import {Link} from 'react-router-dom';
import SingleProduct from './SingleProduct';
import logo from '../logo.svg';
function Home(){
    const products=[

        {
            'title':'Product1',
            'price':100
        },
        {
            'title':'Product2',
            'price':103243
        },
        {
            'title':'Product3',
            'price':14545
        }
    ]
    return (
    <main className='mt-4'>
        <div className='container'>
        <h3 className='mb-4'>Latest Products<Link to='/products' className='float-end btn btn-sm btn-dark'>View All Products</Link></h3>
        <div className='row mb-4'>

        {
            products.map((product) => <SingleProduct product={product}/>)
        }
        </div>

        <h3 className='mb-4'>Popular Categories<Link to='/categories' className='float-end btn btn-sm btn-dark'>View All Categories</Link></h3>
        <div className='row mb-4'>
            
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Category title</h4>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Category title</h4>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Category title</h4>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Category title</h4>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Category title</h4>
                </div>
                
            </div>
            </div>

        </div>

        <h3 className='mb-4'>Popular Products<a href='#' className='float-end btn btn-sm btn-dark'>View All Products</a></h3>
        <div className='row mb-4'>
            
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price: 500</h5>
                </div>
                <div className='card-footer'>
                <button title="Add to card" className='btn btn-success btn-sm'>
                    <i class="fa-solid fa-cart-plus"></i></button>
                <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                    <i class="fa fa-heart"></i></button>
                </div>
            </div>
            </div>

            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price: 500</h5>
                </div>
                <div className='card-footer'>
                <button title="Add to card" className='btn btn-success btn-sm'>
                    <i class="fa-solid fa-cart-plus"></i></button>
                <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                    <i class="fa fa-heart"></i></button>
                </div>
            </div>
            </div>

            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price: 500</h5>
                </div>
                <div className='card-footer'>
                <button title="Add to card" className='btn btn-success btn-sm'>
                    <i class="fa-solid fa-cart-plus"></i></button>
                <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                    <i class="fa fa-heart"></i></button>
                </div>
            </div>
            </div>

            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price: 500</h5>
                </div>
                <div className='card-footer'>
                <button title="Add to card" className='btn btn-success btn-sm'>
                    <i class="fa-solid fa-cart-plus"></i></button>
                <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                    <i class="fa fa-heart"></i></button>
                </div>
            </div>
            </div>

            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price: 500</h5>
                </div>
                <div className='card-footer'>
                <button title="Add to card" className='btn btn-success btn-sm'>
                    <i class="fa-solid fa-cart-plus"></i></button>
                <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
                    <i class="fa fa-heart"></i></button>
                </div>
            </div>
            </div>
        </div>

        <h3 className='mb-4'>Popular Sellers<a href='#' className='float-end btn btn-sm btn-dark'>View All Categories</a></h3>
        <div className='row mb-4'>
            
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories: <a href="#">Cat1</a>, <a href="#">Cat2</a>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories: <a href="#">Cat1</a>, <a href="#">Cat2</a>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories <a href="#">Cat1</a>, <a href="#">Cat2</a>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories: <a href="#">Cat1</a>, <a href="#">Cat2</a>
                </div>
                
            </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories: <a href="#">Cat1</a>, <a href="#">Cat2</a>
                </div>
            </div>
            </div>

        </div>

        <div id="carouselExampleIndicators" className="carousel slide my-3 border bg-dark text-white p-5" data-bs-ride="true">
            <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
            <div className="carousel-item active">
                <figure className="text-center">
                <blockquote className="blockquote">
                    <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                    <i className='fa fa-star text-warning'></i> 
                    <i className='fa fa-star text-warning'></i> 
                    <i className='fa fa-star text-warning'></i>
                    <i className='fa fa-star text-warning'></i>      
                    <cite title="Source Title">Customer Name</cite>                
                </figcaption>
                </figure>
            </div>
            <div className="carousel-item">
                <figure className="text-center">
                <blockquote className="blockquote">
                    <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                    <i className='fa fa-star text-warning'></i> 
                    <i className='fa fa-star text-warning'></i>
                    <i className='fa fa-star text-warning'></i>      
                    <cite title="Source Title">Customer Name</cite>                
                </figcaption>
                </figure>
            </div>
            <div className="carousel-item">
                <figure className="text-center">
                <blockquote className="blockquote">
                    <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                    <i className='fa fa-star text-warning'></i> 
                    <i className='fa fa-star text-warning'></i>
                    <i className='fa fa-star text-warning'></i>      
                    <cite title="Source Title">Customer Name</cite>                
                </figcaption>
                </figure>
            </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
            </button>
        </div>


        


        </div>

    </main>
    )
} 
export default Home;
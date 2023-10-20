import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Header from './components/Header';
function App() {
  return (
    <>
    <Header></Header>
    <main className='mt-4'>
      <div className='container'>
        <h3 className='mb-4'>Latest Products<a href='#' className='float-end btn btn-sm btn-dark'>View All Products</a></h3>
        <div className='row mb-4'>
          
          <div className='col-12 col-md-3 mb-4'>
            <div className="card">
              <img src={logo} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Proce: 500</h5>
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
                <h5 className="card-title text-muted">Proce: 500</h5>
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
                <h5 className="card-title text-muted">Proce: 500</h5>
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
                <h5 className="card-title text-muted">Proce: 500</h5>
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
                <h5 className="card-title text-muted">Proce: 500</h5>
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

        <h3 className='mb-4'>Popular Categories<a href='#' className='float-end btn btn-sm btn-dark'>View All Categories</a></h3>
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
                <h5 className="card-title text-muted">Proce: 500</h5>
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
                <h5 className="card-title text-muted">Proce: 500</h5>
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
                <h5 className="card-title text-muted">Proce: 500</h5>
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
                <h5 className="card-title text-muted">Proce: 500</h5>
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
                <h5 className="card-title text-muted">Proce: 500</h5>
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
              
            </div>
          </div>
          <div className='col-12 col-md-3 mb-4'>
            <div className="card">
              <img src={logo} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
              </div>
              
            </div>
          </div>
          <div className='col-12 col-md-3 mb-4'>
            <div className="card">
              <img src={logo} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
              </div>
              
            </div>
          </div>
          <div className='col-12 col-md-3 mb-4'>
            <div className="card">
              <img src={logo} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
              </div>
              
            </div>
          </div>
          <div className='col-12 col-md-3 mb-4'>
            <div className="card">
              <img src={logo} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h4 className="card-title">Seller Name</h4>
              </div>
              
            </div>
          </div>

        </div>


         
      </div>

    </main>
    </>
    
  );
}

export default App;

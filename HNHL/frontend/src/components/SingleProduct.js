import logo from '../logo.svg'
function SingleProduct(){
    return(
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
)
}
export default SingleProduct;
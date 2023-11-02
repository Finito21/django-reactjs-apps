import logo from '../logo.svg'
import {Link} from 'react-router-dom';
function Categories(){
    return (
    <section className="container mt-4">
        <h3 className='mb-4'>All Categories</h3>
        <div className='row mb-4'>
            <div className='col-12 col-md-3 mb-4'>
                <div className="card">
                    <img src={logo} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h4 className="card-title"><Link to="/category/test/1">test products</Link></h4>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
                <div className="card">
                    <img src={logo} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h4 className="card-title"><Link to="/">Category title</Link></h4>
                    </div>
                
                </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
                <div className="card">
                    <img src={logo} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h4 className="card-title"><Link to="/">Category title</Link></h4>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
                <div className="card">
                    <img src={logo} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h4 className="card-title"><Link to="/">Category title</Link></h4>
                    </div>    
                </div>
            </div>
            <div className='col-12 col-md-3 mb-4'>
                <div className="card">
                    <img src={logo} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h4 className="card-title"><Link to="/">Category title</Link></h4>
                    </div>    
                </div>
            </div>
        </div>

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    </section>
    )
} 
export default Categories;
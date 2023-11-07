
import VendorSidebar from './VendorSidebar';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom';

function VendorOrders(){
    return(
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <VendorSidebar></VendorSidebar>
                    </div>
                    <div className='col-md-9 col-12 mb-2'>
                        <div className='row'>
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    

                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <Link><img src={logo} className="img-thumbnail" width='80' alt="..."/></Link>
                                        <p><Link>Test</Link></p>
                                        </td>
                                        <td> 500</td>
                                        <td><span className='text-success'><i className='fa fa-check-circle'> </i> Completed</span></td>
                                       
                                        <div className="dropdown">
                                            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                 Change Status
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Approve</a></li>
                                                <li><a className="dropdown-item" href="#">Sent</a></li>
                                                <li><a className="dropdown-item" href="#">Complete</a></li>
                                            </ul>
                                        </div>   

                                    </tr>


                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <Link><img src={logo} className="img-thumbnail" width='80' alt="..."/></Link>
                                        <p><Link>Test</Link></p>
                                        </td>
                                        <td> 500</td>
                                        <td><span className='text-success'><i className='fa fa-check-circle'> </i> Completed</span></td>
                                       
                                        <div className="dropdown">
                                            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                 Change Status
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Approve</a></li>
                                                <li><a className="dropdown-item" href="#">Sent</a></li>
                                                <li><a className="dropdown-item" href="#">Complete</a></li>
                                            </ul>
                                        </div>   

                                    </tr>
                                
                                    
                                    
                                </tbody>


                                </table>


                            </div>

                        </div>

                    </div>

                </div>
                
            </div>
    )
}
export default VendorOrders;
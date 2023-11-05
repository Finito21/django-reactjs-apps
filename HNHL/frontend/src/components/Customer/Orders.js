
import CustomerSidebar from './CustomerSidebar';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom';

function Orders(){
    return(
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <CustomerSidebar></CustomerSidebar>
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
                                        <td><button className='btn btn-primary btn-sm'>Download</button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <Link><img src={logo} className="img-thumbnail" width='80' alt="..."/></Link>
                                        <p><Link>Test2</Link></p>
                                        </td>
                                        <td> 500</td>
                                        <td><span className='text-success'><i className='fa fa-check-circle'> </i> Completed</span></td>
                                        <td><button className='btn btn-primary btn-sm'>Download</button></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <Link><img src={logo} className="img-thumbnail" width='80' alt="..."/></Link>
                                        <p><Link>Test3</Link></p>
                                        </td>
                                        <td> 500</td>
                                        <td><span className='text-secondary'><i className='fa fa-spin fa-spinner'> </i> Processing</span></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>
                                            <Link><img src={logo} className="img-thumbnail" width='80' alt="..."/></Link>
                                        <p><Link>Test4</Link></p>
                                        </td>
                                        <td> 500</td>
                                        <td><span className='text-danger'><i className='fa fa-times-circle'> </i> Cancelled</span></td>
                                        <td><button className='btn btn-primary btn-sm'>Download</button></td>
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
export default Orders;
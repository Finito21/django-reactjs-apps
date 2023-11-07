
import VendorSidebar from './VendorSidebar';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom';

function Customers(){
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
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    

                                    <tr>
                                        <td>1</td>
                                        <td>
                                            John Smith
                                        </td>
                                        <td> john@gmail.com</td>
                                        <td>1234</td>
                                        <td><span className='text-success'><i className='fa fa-check-circle'> </i> Completed</span></td>
                                       <td>

                                        <button className='btn btn-danger btn-sm'>Remove from list</button>
                                       </td>
                                          

                                    </tr>

                                    <tr>
                                        <td>2</td>
                                        <td>
                                            Tomas Smith
                                        </td>
                                        <td> tomas@gmail.com</td>
                                        <td>1234</td>
                                        <td><span className='text-success'><i className='fa fa-check-circle'> </i> Completed</span></td>
                                       <td>

                                        <button className='btn btn-danger btn-sm'>Remove from list</button>
                                       </td>
                                          

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
export default Customers;
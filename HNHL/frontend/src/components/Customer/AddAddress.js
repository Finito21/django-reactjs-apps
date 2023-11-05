import Sidebar from './CustomerSidebar';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom';

function AddAddress(){
    return(
        <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <CustomerSidebar></CustomerSidebar>
                    </div>
                    <div className='col-md-9 col-12 mb-2'>
                        <div className='card'>
                            <h4 className='card-header'>Add Address</h4>
                            <div className='card-body'>
                                <form>
                                    <div className='mb-3'>
                                        <label for="address" className='form-label'>Address</label>
                                        <textarea className='form-control' id="address"/>
                                    </div>
                                    
                                    <button type='submit' className='btn btn-primary'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
                        }
                        export default AddAddress;
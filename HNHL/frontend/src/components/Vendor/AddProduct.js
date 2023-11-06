import VendorSidebar from './VendorSidebar';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom';

function AddProduct(){
    return(
        <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <VendorSidebar></VendorSidebar>
                    </div>
                    <div className='col-md-9 col-12 mb-2'>
                        <div className='card'>
                            <h4 className='card-header'>Add Product</h4>
                            <div className='card-body'>
                                <form>
                                <div className='mb-3'>
                                        <label for="Title" className='form-label'>Category</label>
                                        <select className='form-control'>
                                            <option>białko</option>
                                            <option>witaminy</option>
                                            <option>cytrulina</option>

                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label for="Title" className='form-label'>Title</label>
                                        <input type="text" className='form-control' id="Title"/>
                                    </div>
                                    <div className='mb-3'>
                                        <label for="Price" className='form-label'>Price</label>
                                        <input type="number" className='form-control' id="Price"/>
                                    </div>
                                    
                                    <div className='mb-3'>
                                        <label for="Description" className='form-label'>Description</label>
                                        <textarea className='form-control' rows='7' id="Description"></textarea>
                                    </div>
                                
                                    <div className='mb-3'>
                                        <div className='mb-3'>
                                            <label for="productImg" className='form-label'>Product Images</label>
                                            <input type="file" className='form-control' id="productImg"/>
                                        </div>
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
                        export default AddProduct;
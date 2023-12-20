import VendorSidebar from './VendorSidebar';
import { Link } from 'react-router-dom';

function Reports(){

    return(
        <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <VendorSidebar></VendorSidebar>
                    </div>
                    <div className='col-md-9 col-12'>
                        <div className='row'>
                            <div className='col-md-4 mb-1'>
                                <div className='card text-center'>
                                    
                                        <h4>Daily</h4>
                                        <h5>Reports</h5>
                                        
                                        <h4><Link to='/vendor/daily-report' className='btn btn-info'>View</Link></h4>
                                    
                                </div>
                            </div>
                            <div className='col-md-4 mb-1'>
                                <div className='card text-center'>
                                    
                                        <h4>Monthly</h4>
                                        <h5>Reports</h5>
                                        <h4><Link to='/vendor/monthly-report' className='btn btn-info'>View</Link></h4>
                                    
                                </div>
                            </div>
                            <div className='col-md-4 mb-1'>
                                <div className='card text-center'>
                                    
                                        <h4>Yearly</h4>
                                        <h5>Reports</h5>
                                        <h4><Link to='/vendor/yearly-report' className='btn btn-info'>View</Link></h4>
                                    
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                
            </div>

    )
}
export default Reports;

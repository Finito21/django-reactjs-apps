import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import '../../Switcher.css';

function VendorLogin(props) {
    const baseUrl = 'http://127.0.0.1:8000/api/';
    const [loginFormData, setLoginFormData] = useState({
        "username": '',
        "password": ''
    });

    const [switchChecked, setSwitchChecked] = useState(localStorage.getItem('switchChecked') === 'true');


    const navigate = useNavigate();  // Use useNavigate for navigation

    const handleSwitchToggle = () => {
        const newSwitchChecked = !switchChecked;
        setSwitchChecked(newSwitchChecked);
        localStorage.setItem('switchChecked', newSwitchChecked.toString());
        navigate(newSwitchChecked ? '/vendor/login' : '/customer/login'); // Use navigate for navigation
    };
    

    const [formError, setFormError] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');

    const inputHandler = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value
        });
    }

    const submitHandler = (event) => {
        const formData=new FormData();
        formData.append('username',loginFormData.username);
        formData.append('password',loginFormData.password);

        axios.post(baseUrl + 'vendor/login/', formData)
            .then(function (response) {
                if (response.data.bool == false) {
                    setFormError(true);
                    seterrorMsg(response.data.msg);
                } else {
                    localStorage.setItem('vendor_id', response.data.id);
                    localStorage.setItem('vendor_login', true);
                    localStorage.setItem('vendor_username', response.data.user);
                    setFormError(false);
                    seterrorMsg('');
                    window.location.href='/vendor/dashboard';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    
    const checkVendor=localStorage.getItem('vendor_login');
    if(checkVendor){
        window.location.href='/vendor/dashboard';
    };
    

    const buttonEnable=(loginFormData.username!='')&&(loginFormData.password!='')

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-8 col-12 offset-2'>
                    <div className='card'>
                        <h4 className='card-header'>Login as a Seller</h4>
                        <div className='card-body'>
                            {formError &&
                                <p className="text-danger">{errorMsg}</p>
                            }
                            <form>
                                <div className='mb-3'>
                                    <label htmlFor="username" className='form-label'>Username</label>
                                    <input type="text" name="username" value={loginFormData.username} onChange={inputHandler} className='form-control' id="username" />
                                </div>

                                <div className='mb-3'>
                                    <div className='mb-3'>
                                        <label htmlFor="pwd" className='form-label'>Password</label>
                                        <input type="password" name="password" value={loginFormData.password} onChange={inputHandler} className='form-control' id="pwd" />
                                    </div>
                                </div>
                                <button type="button" disabled={!buttonEnable} onClick={submitHandler} className='btn btn-primary'>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="switch-container row align-items-center">
                        <div className="col-lg-1 text-center">Client</div>
                        <input type="checkbox" id="switch" onClick={handleSwitchToggle} checked={switchChecked} />
                        <label className="switch-label col-lg-1" htmlFor="switch">Toggle</label>
                        <div className="col-lg-1 text-center">Seller</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorLogin;

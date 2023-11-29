import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function VendorLogin(props) {
    const baseUrl = 'http://127.0.0.1:8000/api/';
    const [loginFormData, setLoginFormData] = useState({
        "username": '',
        "password": ''
    });
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
    }
    console.log(checkVendor);

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
                    <div className="mt-3 d-flex justify-content-center">
                        <ul className="list-unstyled">
                            <li>Don't have an Seller account? <Link to="/vendor/register">Seller Register</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorLogin;

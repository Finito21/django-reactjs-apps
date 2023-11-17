import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../Context';
import { CartContext } from '../Context';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 
import axios from "axios";

const baseUrl='http://127.0.0.1:8000/api';

function ConfirmOrder(){
    const [ConfirmOrder,SetConfirmOrder]=useState(false);
    const [orderId,SetorderId]=useState('');
    const userContext=useContext(UserContext);
    const {cartData,setCartData}=useContext(CartContext);
    if(userContext.login==null){
        window.location.href="/customer/login"
    }else{
        if(ConfirmOrder==false){
            addOrderInTable();
        }
    }

    function addOrderInTable(){
        const customerId=localStorage.getItem('customer_id');
        const formData=new FormData();
        formData.append('customer',customerId);


        axios.post(baseUrl + '/orders/', formData)
        .then(function(response){
            var orderId=response.data.id;
            console.log(orderId)
            SetorderId(orderId);
            orderItems(orderId);
            SetConfirmOrder(true);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    function updateOrderStatus(order_status){
        console.log("wypisz cos")
        axios.post(baseUrl + '/update-order-status/'+orderId)
        .then(function(response){
            window.location.href='/customer/CustomerOrders';
        })
        .catch(function(error){
            console.log(error);
        })
    }

    function orderItems(orderId){
        var previousCart=localStorage.getItem('cartData');
        console.log(previousCart);
        var cartJson=JSON.parse(previousCart);

        if(cartJson!=null){
            cartJson.map((cart,index)=>{
                const formData=new FormData();
                formData.append('order',orderId);
                formData.append('product',cart.product.id);
                formData.append('qty',1);
                formData.append('price',cart.product.price);

                axios.post(baseUrl+'/orderitems/',formData)
                .then(function(response){
                    cartJson.splice(index,1);
                    localStorage.setItem('cartData',JSON.stringify(cartJson));
                    setCartData(cartJson);
                })
                .catch(function(error){
                    console.log(error);
                });
            });
        }
    }

    return(
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-6 offset-3'>
                    <div className='card py-3 text-center'>
                        <h3><i className="fa fa-check-circle text-success"></i>Your Order has been confirmed</h3>
                        <h5>ORDER ID: {orderId}</h5>
                    </div>
                    <div className='card p-3 mt-4'>      
                        <PayPalScriptProvider options={{ "client-id": "AbaaQ1EeoO_JeUq_Yu5ZaVTbfVvaYceYVpPndM6PXmaxVrY4c0r9U6KdQrLvvDO7GbQmKPzIFHLwDqja" }}> 
                        <PayPalButtons className='mt-3'  
                            createOrder={(data,actions)=>{
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code:'USD',
                                                value:"3",
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data,actions)=>{
                                return actions.order.capture().then((details)=>{
                                    const name=details.payer.name.given_name;
                                    alert(`Transaction completed by ${name}`);
                                    //SetOrderStatus(true);
                                    updateOrderStatus(true);
                                });
                            }}
                        /> 
                        </PayPalScriptProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ConfirmOrder;
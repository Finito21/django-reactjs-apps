import { useState } from 'react';
import { useContext } from 'react';
import { UserContext, CartContext, CurrencyContext } from '../Context';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 
import axios from "axios";

const baseUrl='http://127.0.0.1:8000/api';

function ConfirmOrder(){
    const [ConfirmOrder,SetConfirmOrder]=useState(false);
    const [orderId,setorderId]=useState('');
    const [orderAmount,setorderAmount]=useState(0);
    const userContext=useContext(UserContext);
    const {cartData,setCartData}=useContext(CartContext);
    const {CurrencyData}=useContext(CurrencyContext);

    if(userContext.login==null){
        window.location.href="/customer/login"
    }else{
        if(ConfirmOrder==false){
            addOrderInTable();
        }
    }

    function addOrderInTable(){
     
        const customerId=localStorage.getItem('customer_id');

        var total_amount=0;
        var total_usd_amount=0;
        var total_eur_amount=0;

        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);

        cartJson.map((cart,index)=>{
            total_amount+=parseFloat(cart.product.price)
            total_usd_amount+=parseFloat(cart.product.usd_price)
            total_eur_amount+=parseFloat(cart.product.eur_price)
        });

        const formData=new FormData();
        formData.append('customer',customerId);
        formData.append('total_amount',total_amount)
        formData.append('total_usd_amount',total_usd_amount)
        formData.append('total_eur_amount',total_eur_amount)

        axios.post(baseUrl + '/orders/', formData)
        .then(function(response){
            var orderId=response.data.id;
            setorderId(orderId);

            if(CurrencyData=='USD'){
                setorderAmount(response.data.total_usd_amount);
            }else if(CurrencyData=='EUR'){
                setorderAmount(response.data.total_eur_amount);
            }else{
                setorderAmount(response.data.total_amount);
            }
            orderItems(orderId);
            SetConfirmOrder(true);
            console.log(CurrencyData)
        })
        .catch(function(error){
            console.log(error);
        });
    }

    function updateOrderStatus(order_status){
        axios.post(baseUrl + '/update-order-status/'+orderId)
        .then(function(response){
            window.location.href='/order/success';
        })
        .catch(function(error){
            window.location.href='/order/failure';
        })
    }

    function orderItems(orderId){
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);

        if(cartJson!=null){
            var sum=0;
            cartJson.map((cart,index)=>{
                const formData=new FormData();
                formData.append('order',orderId);
                formData.append('product',cart.product.id);
                formData.append('qty',1);
                formData.append('price',cart.product.price);
                formData.append('usd_price',cart.product.usd_price);
                formData.append('eur_price',cart.product.eur_price);


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
                                console.log(orderAmount)
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code:'USD',
                                                value: orderAmount,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data,actions)=>{
                                return actions.order.capture().then((details)=>{
                                    const name=details.payer.name.given_name;
                                    //alert(`Transaction completed by ${name}`);
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
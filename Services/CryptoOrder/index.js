import CryptoOrderService from "./CryptoOrderService";
import {
    addCryptoOrder,
    addCryptoOrderError,
    getCryptoOrderError,
    loadingCryptoOrders,
    processCrypto,
    setCryptoOrders
} from "Redux/CryptoOrder";

import {loadStripe} from "@stripe/stripe-js"

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51IwQaNKmrrRYg5QDOjaj7VJ5E3xv4UzehHHTBluqHsXbp079Aj4AexYPlWOBIrTBI92UZgG1cwFvHEHN5PoucBYl00b9c76Gvf");

const cryptoOrderService = new CryptoOrderService()

// Register UserService - return ok response on success
export const getCryptoOrders = () => dispatch => {
    dispatch(loadingCryptoOrders())
    cryptoOrderService.getCryptoOrder().then(res => {
        if(res.status === 200){
            dispatch(setCryptoOrders(res.data.data))
        }else{
            dispatch(getCryptoOrderError("There are no crypto orders"))
        }
    }).catch(err =>
        dispatch(getCryptoOrderError(err))
    );
};

// Register UserService - return ok response on success
export const buyCryptoOrder = (order) => dispatch => {
    dispatch(processCrypto())
    cryptoOrderService.placeCryptoOrder(order).then(res => {
        if(res.status === 200){
            dispatch(addCryptoOrder(order))
            startStripePayment(order.amount)
        }else{
            dispatch(addCryptoOrderError("There is no crypto orders"))
        }
    }).catch(err =>
        dispatch(addCryptoOrderError(err))
    );
};

// Register UserService - return ok response on success
export const updateCryptoOrderStatus = (txHash, orderId, callBack) => {
    let data = {
        orderId: orderId,
        transactionId: txHash
    }
    cryptoOrderService.processCryptoOrder(data).then((res)=>{
        if(res.status === 200){
            callBack("PROCESSING_SUCCEED", txHash)
        }else{
            callBack("PROCESSING_FAILED", txHash)
        }
    })
};

const startStripePayment = async (amount)=>{
        // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    cryptoOrderService.getStripeToken(amount).then(async (res)=>{
            // When the customer clicks on the button, redirect them to Checkout.
            console.log(res)
        const session = res.data  
        const result = await stripe.redirectToCheckout({
        sessionId: session.id,
        });

        console.log(result)
        if (result.error) {
            alert("Failed to redirect to stripe")
        }
    }).catch((err)=>{
        alert("Failed to redirect to stripe")
    })
}
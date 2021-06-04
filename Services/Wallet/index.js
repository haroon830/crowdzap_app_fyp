import { setAddresses, addNewAddress, loadingAddresses, errorOccur, clearError } from "Redux/Wallet";
import {WalletService} from "./WalletService"
import HDWallet from "./HDWallet";
import SerializedHDWallet from './SerializedHDWallet'

let walletService = new WalletService()
//Singleton pattern is impl, wallet must be initialized at first
export const Wallet = (function () {
    let instance;
    async function createInstance(serialized, mnemonics,password ,tag, addressIndex) {
        let object
        if(serialized){
            console.log("deserializing")
            object = await SerializedHDWallet.build(serialized, password ,tag, addressIndex);
        }else{
            object = await HDWallet.build(mnemonics, password, tag, addressIndex);
        }
        return object;
    }

    return {
        //default parameters if new wallet is to be initialized
        init: async function (serialized , mnemonics, password, tag , addressIndex ) {
            if (!instance) {
                instance = await createInstance(serialized, mnemonics ,password,tag, addressIndex);
                instance.constructor = null
                return instance
            }
            return instance;
        },
        getInstance: function () {
            return instance;
        }
    };
})();


export const getAddresses = () => dispatch => {
    dispatch(loadingAddresses())
    walletService.getAddresses().then(res => {
        console.log(res)
        if (res.status === 200) {
            dispatch(setAddresses(res.data.data))
        } else {
            dispatch(errorOccur(res.data))
            console.log("No addresses found")
        }
    })
        .catch(err =>{
            console.log(err)
            dispatch(errorOccur(err))
        });
};


export const storeNewAddress = (newAddress)=> (dispatch)=>{
    walletService.addNewAddress(newAddress).then(res => {
        console.log(res)
        if (res.status === 200) {
            let payload = {
                addresses : newAddress
            }
            dispatch(addNewAddress(payload))
        } else {
            console.log("Addresses not saved")
        }
    })
    .catch(err =>{
        console.log(err)
        console.log("Addresses not saved")
    });
}


export const placeCryptoOrder = (order) => dispatch => {
    walletService.placeCryptoOrder(order).then(res => {
        console.log(res)
        if (res.status === 200) {
            alert("Successfully placed your order")
        } else {
            alert(res.data.status)
        }
    })
    .catch(err =>{
        console.log(err)
        alert("Failed to place your order")
    });
};
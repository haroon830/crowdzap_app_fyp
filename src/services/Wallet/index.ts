import { setAddresses, fetchAddressesFailed, addNewAddress } from "../../reducers/wallet";
import {WalletService} from "./WalletService"

let walletService = new WalletService()

export const storeNewAddress = (newAddress: any)=> (dispatch:any)=>{
    let address = {
        keyTag : newAddress.keyTag,
        address : newAddress.address
    }
    walletService.addNewAddress(address).then(res => {
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

// @ts-ignore
export const getAddresses = () => dispatch => {
    walletService.getAddresses().then(res => {
        console.log(res)
        if (res.status === 200) {
            let payload = {
                addresses : res.data.data
            }
            dispatch(setAddresses(payload))
        } else {
            dispatch(fetchAddressesFailed())
            console.log("No addresses found")
        }
    })
    .catch(err =>{
        console.log(err)
        dispatch(fetchAddressesFailed())
    });
};
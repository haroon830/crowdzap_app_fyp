import {LCDClient} from "Config/LCDClient";
import {accountsDataError, loadingAccountsData, setAccountsData} from "Redux/Wallet";
import CONSTANTS from "Config/constants";

export const getAccountsData = (accounts) => (dispatch) =>{
    let accountsData = {
        balance : 0,
        data : []
    }

    // get balance & other data for all accounts (return promise)
    const getData = (account) => (
        LCDClient.get(CONSTANTS.CHAIN_API_URLS.GET_ACCOUNT_DATA+account.address).then((accountData) => {
            if (accountData.result.value.coins.length !== 0) {
                accountsData.balance = accountsData.balance + Number(accountData.result.value.coins[0].amount)
            }
            console.log(accountData)
            accountsData.data.push(accountData)
        })
    )

    dispatch(loadingAccountsData())
    //wait for all accounts data to be fetched
    Promise.all(accounts.map(getData)).then((res)=>{
        if(accountsData.data.length > 0){
            dispatch(setAccountsData(accountsData))
        }
    }).catch((err)=>{
        dispatch(accountsDataError(err))
        console.log(err)
    })
}
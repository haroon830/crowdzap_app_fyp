import {makeCosmoshubPath, Secp256k1HdWallet, SigningCosmosClient} from "@cosmjs/launchpad";
import {envConfig} from "Config/envConfig";

let account ={
    tag : "",
    walletObj : Object,
    signerCosmosClient : Object,
    address : ""
}

class Wallet{
    account
    mnemonic
    index

    constructor(mnemonic, account, index) {
        this.account = account
        this.mnemonic = mnemonic
        this.index = index
    }

    getSelectedAccount(){
        return this.account
    }

    //add new key to store by using index as value for makeCosmosHubPath
    //return new address and publicKey
    //Create new wallet object and lcdClient for singing and broadcasting of transaction
    async selectAddAccount(tag, index){
        console.log(index)
        console.log(typeof index)
        let hdPath  = makeCosmoshubPath(index)
        let walletObj = await Secp256k1HdWallet.fromMnemonic(this.mnemonic, hdPath)
        let address = ( await walletObj.getAccounts())[0].address
        //setting value in object
        account.tag = tag
        account.address = address
        account.walletObj = walletObj
        account.signerCosmosClient = new SigningCosmosClient(envConfig.CHAIN_REST_API_URL, address, walletObj)
        this.account = account
        this.index= index
        return account
    }



    //////////////
    //build object
    //////////////

    //Create wallet object and lcdClient for singing and broadcasting of transaction
    static async  init(mnemonic, tag, index) {
        let walletObj = await Wallet.createWalletObj(mnemonic, index)
        account.tag = tag || ("Account "+index)
        account.walletObj = walletObj
        let address = ( await walletObj.getAccounts())[0].address
        account.address = address
        account.signerCosmosClient = new SigningCosmosClient(envConfig.CHAIN_REST_API_URL, address, walletObj)
        return account
    }

    //create hd_wallet obj by taking index of key
    static async createWalletObj(mnemonic, index){
        let hdPath  = makeCosmoshubPath(index)
        return  await Secp256k1HdWallet.fromMnemonic(mnemonic,hdPath);
    }
}

export default Wallet
import {makeCosmoshubPath, Secp256k1HdWallet} from "@cosmjs/launchpad";
import Wallet from "./Wallet";
import LocalStore from "../../Config/localStore";

class HDWallet extends Wallet{
    constructor(mnemonic, accounts, index) {
        super(mnemonic, accounts, index);
    }

    static async  build(mnemonic, password, tag, index) {
        let newWallet;
        if(mnemonic){
            newWallet = await Secp256k1HdWallet.fromMnemonic(mnemonic)
        }else{
            newWallet = await  Secp256k1HdWallet.generate()
        }
        let account = await Wallet.init(newWallet.mnemonic ,tag, index)
        //serialize and store wallet in localStore
        HDWallet.setToStore(await HDWallet.serializeWallet(newWallet, password))
        //create instance of class
        return new HDWallet(newWallet.mnemonic, account, index)
    }

    static async  serializeWallet(wallet, password){
        return await wallet.serialize(password)
    }

    static setToStore(serialized){
        let localStore = new LocalStore()
        localStore.setSerializedWallet(serialized)
    }
}

export default HDWallet
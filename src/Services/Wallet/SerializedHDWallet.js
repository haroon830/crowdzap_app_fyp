import {makeCosmoshubPath, Secp256k1HdWallet} from "@cosmjs/launchpad";
import Wallet from "./Wallet";

class SerializedHDWallet extends Wallet{
    constructor(mnemonic, accounts, index) {
        super(mnemonic, accounts, index);
    }

    static async build(serialized ,password, tag, addressIndex) {
        let mnemonic = (await Secp256k1HdWallet.deserialize(serialized, password)).mnemonic
        let account = await Wallet.init(mnemonic, tag, addressIndex )
        return new SerializedHDWallet(mnemonic, account, addressIndex)
    }

}

export default SerializedHDWallet
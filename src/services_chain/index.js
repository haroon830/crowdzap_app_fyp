import CONSTANTS from '../config/constants'
import { ec } from 'elliptic'
import bech32 from 'bech32'
import {HTTP_CHAIN} from '../config/HTTPService'
import { hash, convertSignature, sortJson } from './util'


const secp256k1 = new ec('secp256k1')

const prefix = CONSTANTS.CHAIN_CONFIG.PREFIX
const chainId = CONSTANTS.CHAIN_CONFIG.CHAINID

/////////Interfaces

/////////
/////////
/////////

export const getAddressByPrivateKey =  (privateKey) => {
    if (!privateKey || typeof privateKey !== 'string') {
        throw Error('Invalid private key.')
    }

    if (privateKey.startsWith(prefix)) {
        return privateKey
    }

    return getAddress(
        secp256k1.keyFromPrivate(privateKey, 'hex').getPublic(true, 'hex')
    )
}

export const getAddressByPublicKey= (publicKey) => {
    if (!publicKey || typeof publicKey !== 'string') {
        throw Error('Invalid public key.')
    }

    return getAddress(publicKey)
}

export const generateKeyPair= () => (dispatch) =>{
    const key = secp256k1.genKeyPair()

    let keypair= {
        privateKey: key.getPrivate('hex'),
        publicKey: key.getPublic(true, 'hex'),
        address: getAddress(key.getPublic(true, 'hex')),
    }
    console.log(keypair)
}

export const signTransaction= async (privateKey, tx) => {
    if (!privateKey || typeof privateKey !== 'string') {
        throw Error('Invalid private key.')
    }

    if (!tx) {
        throw Error('Invalid transaction.')
    }

    tx.value.signatures = tx.value.signatures || []

    tx.value.signatures.push(await signTx(privateKey, tx))
    return JSON.stringify(tx, null, 4)
}

export const broadcastTransaction = (tx)=>{
        broadcast(tx).then((res)=>{

        }).catch((err)=>{

        })
}
///////////
//////////
//////////

const getAddress = (pubkey) => {
    let bytes = hash('ripemd160', hash('sha256', Buffer.from(pubkey, 'hex')))
    return bech32.encode(prefix, bech32.toWords(bytes))
}

const signTx = async (privateKey, tx) => {
    let accountAddress = `${getAddress(secp256k1.keyFromPrivate(privateKey, 'hex').getPublic(true, 'hex'))}`
    getAccountData(accountAddress).then((res)=>{
        //TODO Handle response more effeciently

        let state = res.data
        if (state) {
            state = JSON.parse(state)
        } else {
            state = {
                value: {},
            }
        }
    
        let jsonHash = hash(
            'sha256',
            Buffer.from(
                JSON.stringify({
                    account_number: state.value.account_number || '0',
                    chain_id: chainId,
                    fee: sortJson(tx.value.fee),
                    memo: tx.value.memo,
                    msgs: sortJson(tx.value.msg[0].value),
                    sequence: state.value.sequence || '0',
                }),
                'utf8'
            )
        )
    
        return {
            pub_key: {
                type: 'tendermint/PubKeySecp256k1',
                value: Buffer.from(
                    secp256k1
                        .keyFromPrivate(privateKey, 'hex')
                        .getPublic(true, 'hex'),
                    'hex'
                ).toString('base64'),
            },
            signature: convertSignature(
                secp256k1.sign(jsonHash, privateKey, 'hex', {
                    canonical: true,
                })
            ).toString('base64'),
        }
    }).catch((err)=>{
        console.log(err)
    })      
}
const getAccountData =  (accountAddress) =>{
    return HTTP_CHAIN.get(CONSTANTS.CHAIN_API.AUTH.ACCOUNT+accountAddress, {
        headers: {
            'Content-Type': "application/json"
        }
    })
}

const broadcast =  (tx) =>{
    return HTTP_CHAIN.post(CONSTANTS.CHAIN_API.BROADCAST_TRANSACTION, tx, {
        headers: {
            'Content-Type': "application/json"
        }
    })
}
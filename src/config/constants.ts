const CONSTANTS = {
    ENV_VARIABLES: {
        DEV: "DEV",
        STAGE: "STAGE",
        PROD: "PROD"
    },
    CHAIN_CONFIG: {
        PREFIX : 'cosmos',
        CHAINID : 'relchain'
    },
    API_URL:{
        REGISTER_USER: "/api/user/register",
        LOGIN : "/api/user/login",
        POST_KYC: '/api/user/kyc',
        GET_LISTED_PROPS: 'api/property/get_listed_props',
        GET_ADDRESSES : 'api/user/get_keys',
        ADD_NEW_ADDRESSES : 'api/user/add_key',
        PLACE_CRYPTO_ORDER :'api/crypto/order_crypto',
        ADMIN:{
            GET_CRYPTO_ORDERS : "./api/crypto/get_crypto_orders",
            PROCESS_CRYPTO_ORDERS : "./api/crypto/process_crypto_orders"
        }
    },
    CHAIN_API:{
        AUTH:{
            ACCOUNT: "auth/accounts/"
        },
        REL_CONTRACTORS : "relcontractors/contractors/",
        BROADCAST_TRANSACTION : "relcontracts/broadcast",        
    },
    AUTH :{
        USER_LOADING : "USER_LOADING",
        SET_CURRENT_USER : "SET_CURRENT_USER",
        ATTACHED_ACCOUNTS: "ATTACHED_ACCOUNTS"
    },
    LISTED_PROPS:{
        SET_LISTED_PROPS : "SET_LISTED_PROPS",
        FAILED_TO_GET : "FAILED_TO_GET"
    },
    SETTING :{
        KYC_STATUS : "CHANGE_KYC_STATUS",
    },
    WALLET :{
        SET_KEYS : 'SET_CRYPTO_ADDRESSES',
        FAILED_TO_GET : "FAILED_TO_GET",
        ADD_NEW_KEY : 'ADD_NEW_KEY'
    },
    ADMIN : {
        CRYPTO_ORDERS:{
            FETCH : "CHANGE_FETCH_STATUS",
            SET_CRYPTO_ORDERS: "SET_CRYPTO_ORDERS"
        },
        ADMIN_CONFIG:{
            SET_CONFIG: "SET_NODE_CONFIG"
        }
    },
    ERROR:{
        GET_ERRORS : "GET_ERRORS"
    },
    CLOUD :{
        CLOUD_URL: 'https://api.Cloudinary.com/v1_1/droekhidb/image/upload/'
    }
}

export default CONSTANTS;
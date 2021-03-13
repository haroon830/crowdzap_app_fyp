const CONSTANTS = {
    ENV_VARIABLES: {
        DEV: "DEV",
        STAGE: "STAGE",
        PROD: "PROD"
    },
    CHAIN_CONFIG: {
        PREFIX : 'cosmos',
        CHAINID : 'crowdzap'
    },
    API_URL:{
        REGISTER_USER: "/api/user/register",
        LOGIN : "/api/user/login",
        POST_KYC: '/api/user/kyc',
        GET_LISTED_PROPS: 'api/property/get_listed_props',
        GET_ADDRESSES : 'api/user/get_keys',
        ADD_NEW_ADDRESSES : 'api/user/add_key',
        PLACE_CRYPTO_ORDER :'api/crypto/order_crypto',
        PROCESS_CRYPTO_ORDER :'api/crypto/order_processed',
        GET_CRYPTO_ORDERS : "/api/crypto/get_crypto_orders",
        ADD_NEW_INVESTMENT :"/api/investment/add_new_investment",
        ADMIN:{
            PROCESS_CRYPTO_ORDERS : "./api/crypto/process_crypto_orders"
        }
    },
    CHAIN_API_URLS:{
        GET_ACCOUNT_DATA: 'auth/accounts/',
        GET_POLLS : 'relcontractors/polls/',
        GET_POLL_BY_ID : 'relcontractors/poll_by_id/'
    },
    AUTH :{
        SET_CURRENT_USER : "SET_CURRENT_USER",
        USER_REGISTERED : "USER_REGISTERED",
        REG_ERROR : "REG_ERROR",
        REG_PROCESSING : "REG_PROCESSING"
    },
    LISTED_PROPS:{
        SET_LISTED_PROPS : "SET_LISTED_PROPS",
        FAILED_TO_GET : "FAILED_TO_GET",
        LOADING_PROPS: "LOADING_PROPS"
    },
    SETTING :{
        KYC_STATUS : "CHANGE_KYC_STATUS",
        CHANGE_LANGUAGE : "CHANGE_LANGUAGE"
    },
    WALLET :{
        LOADING_ADDRESSES : 'LOADING_ADDRESSES',
        WALLET_LOCKED : 'WALLET_LOCKED_STATUS',
        SET_KEYS : 'SET_ADDRESSES',
        ADD_NEW_KEY : 'ADD_NEW_KEY',
        PROCESS_ADD_NEW_KEY : 'PROCESS_ADD_NEW_KEY',
        SET_WALLET : 'SET_WALLET_OBJECT',
        WALLET_ERROR: 'WALLET_ERROR',
        //Chain Operation
        LOADING_ACCOUNTS_DATA: 'LOADING_ACCOUNTS_DATA',
        SET_ACCOUNTS_DATA : 'SET_ACCOUNTS_DATA',
        ACCOUNTS_DATA_ERROR: 'ACCOUNTS_DATA_ERROR'
    },
    CRYPTO_ORDERS :{
        LOADING_ORDERS : 'LOADING_ORDERS',
        SET_ORDER : 'SET_ORDER',
        ADD_CRYPTO_ORDER : 'ADD_CRYPTO_ORDER',
        PROCESS_ORDER_CRYPTO : 'PROCESS_ORDER_CRYPTO',
        SET_WALLET : 'SET_WALLET_OBJECT',
        ORDER_ERROR: 'ORDER_ERROR'
    },
    CRYPTO_TRANSFER:{
        PROCESSING_ORDER:'PROCESSING_ORDER',
        PROCESSING_ORDER_SUCCEED : 'PROCESSING_ORDER_SUCCEED',
        PROCESSING_ORDER_ERROR : 'PROCESSING_ORDER_ERROR'
    },
    COMMON:{
        PROCESSING: "PROCESSING_REQUEST",
        ERROR_OCCURS : "ERROR_OCCURS",
        GET_ERRORS : "GET_ERRORS",
        CLEAR_ERROR : "CLEAR_ERROR"
    },
    ERROR:{

        GET_ERRORS : "GET_ERRORS"
    },
    CLOUD :{
        CLOUD_URL: 'https://api.Cloudinary.com/v1_1/droekhidb/image/upload/'
    }
}

export default CONSTANTS;
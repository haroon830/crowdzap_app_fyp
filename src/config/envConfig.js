import constants from "./constants";

const DEV = {
    ENV_NAME: constants.ENV_VARIABLES.DEV,
    API_URL: 'http://localhost:5000',
    CHAIN_REST_API_URL : 'http://127.0.0.1:1318/',
    CHAIN_SOCKET_URL: 'ws://localhost:26657'
};

const STAGE = {
    ENV_NAME: constants.ENV_VARIABLES.STAGE,
    API_URL: '',
    POST_API_URL: '',
    CHAIN_REST_API_URL : 'http://127.0.0.1:1317/',
    CHAIN_SOCKET_URL: 'ws://localhost:26657'
};

const PROD = {
    ENV_NAME: constants.ENV_VARIABLES.PROD,
    API_URL: '',
    POST_API_URL: '',
    CHAIN_REST_API_URL : 'http://127.0.0.1:1317/',
    CHAIN_SOCKET_URL: 'ws://localhost:26657'
};

function getEnvConfig() {
    let envConfig = DEV;
    let currentEnv = constants.ENV_VARIABLES.DEV;

    if (constants.ENV_VARIABLES.hasOwnProperty(`${process.env.REACT_APP_ENV}`)) {
        currentEnv = `${process.env.REACT_APP_ENV}`;
    }

    if (currentEnv === constants.ENV_VARIABLES.DEV) {
        envConfig = DEV;
    } else if (currentEnv === constants.ENV_VARIABLES.STAGE) {
        envConfig = STAGE;
    } else if (currentEnv === constants.ENV_VARIABLES.PROD) {
        envConfig = PROD;
    }

    return envConfig;
}

export const envConfig = getEnvConfig();

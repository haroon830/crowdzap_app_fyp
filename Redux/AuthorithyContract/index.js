const initialState = {
    polls :[],
    loadingPolls: false,
    tried: false,
    loadingPollsError: null,
    //////////////////////////
    processingCreatePoll: false,
    msg:"",
    createPollError : null,
    /////////////////////////
    processingVotePoll: false,
    votingPollError : null,
    /////////////////////////
    processingPollingProcess: false,
    pollingProcessError : null,
};

const ACTION_TYPE  = {
    LOADING_POLLS : 'LOADING_POLLS',
    SET_POLLS : 'SET_POLLS',
    POLL_ERROR : 'POLL_ERROR',
    /////////////////////////////////////////////
    PROCESSING_CREATE_POLL:'PROCESSING_CREATE_POLL',
    CRETE_POLL_SUCCEED : 'CRETE_POLL_SUCCEED',
    CREATE_POLL_ERROR : 'CREATE_POLL_ERROR',
    ////////////////////////////////////////////
    PROCESSING_VOTE_POLL:'PROCESSING_CREATE_POLL',
    VOTE_POLL_SUCCEED : 'VOTE_POLL_SUCCEED',
    VOTE_POLL_ERROR : 'VOTE_POLL_ERROR',
    ////////////////////////////////////////////
    PROCESSING_POLL_PROCESS:'PROCESSING_POLL_PROCESS',
    POLL_PROCESS_SUCCEED : 'POLL_PROCESS_SUCCEED',
    POLL_PROCESS_ERROR : 'POLL_PROCESS_ERROR',
    ////////////////////////////////////////////
    CLEAR_ERROR :'CLEAR_ERROR'
}

/***********************************/
/************* Actions *************/
/***********************************/
export const loadingPolls = () => {
    return {
        type: ACTION_TYPE.LOADING_POLLS,
        payload: null
    };
};

export const setPolls = (polls) => {
    return {
        type: ACTION_TYPE.SET_POLLS,
        payload: polls
    };
};

export const pollsError = (error) => {
    return {
        type: ACTION_TYPE.POLL_ERROR,
        payload: error
    };
};

////////////////////////////////////////
export const processingCreatePoll = () => {
    return {
        type: ACTION_TYPE.PROCESSING_CREATE_POLL,
        payload: null
    };
};

export const createPollSucceed = (msg) => {
    return {
        type: ACTION_TYPE.CRETE_POLL_SUCCEED,
        payload: msg
    };
};

export const createPollError = (error) => {
    return {
        type: ACTION_TYPE.CREATE_POLL_ERROR,
        payload: error
    };
};

////////////////////////////////////////
export const processingVotePoll = () => {
    return {
        type: ACTION_TYPE.PROCESSING_VOTE_POLL,
        payload: null
    };
};

export const votePollSucceed = () => {
    return {
        type: ACTION_TYPE.VOTE_POLL_SUCCEED,
        payload: null
    };
};

export const votePollError = (error) => {
    return {
        type: ACTION_TYPE.VOTE_POLL_ERROR,
        payload: error
    };
}

////////////////////////////////////////
export const processingPollProcess = () => {
    return {
        type: ACTION_TYPE.PROCESSING_POLL_PROCESS,
        payload: null
    };
};

export const pollProcessSucceed = () => {
    return {
        type: ACTION_TYPE.POLL_PROCESS_SUCCEED,
        payload: null
    };
};

export const pollProcessError = (error) => {
    return {
        type: ACTION_TYPE.POLL_PROCESS_ERROR,
        payload: error
    };
}

////////////////////////////////////////
export const clearError = () => {
    return {
        type: ACTION_TYPE.CLEAR_ERROR,
        payload: null
    };
}

/***********************************/
/************* Reducers *************/
/***********************************/
export default function(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.LOADING_POLLS:
            return {
                ...state,
                loadingPolls: true,
                tried: false,
            };
        case ACTION_TYPE.SET_POLLS:
            return {
                polls :action.payload,
                loadingPolls: false,
                loadingPollsError: null,
                tried: true,
                //////////////////////////
                processingCreatePoll: false,
                createPollError : null,
                /////////////////////////
                processingVotePoll: false,
                votingPollError : null,
            };
        case ACTION_TYPE.POLL_ERROR:
            return {
                ...state,
                tried: true,
                loadingPolls: false,
                votingPollError: action.payload
            };
        /////////////////////////////
        case ACTION_TYPE.PROCESSING_CREATE_POLL:
            return {
                ...state,
                //////////////////////////
                msg:"",
                processingCreatePoll: true,
                createPollError : null,
            };
        case ACTION_TYPE.CRETE_POLL_SUCCEED:
            return {
                ...state,
                msg:action.payload,
                processingCreatePoll: false,
                createPollError : null,
            };
        case ACTION_TYPE.CREATE_POLL_ERROR:
            return {
                ...state,
                msg:"",
                processingCreatePoll: false,
                createPollError : action.payload,
            };
        /////////////////////////////
        case ACTION_TYPE.PROCESSING_VOTE_POLL:
            return {
                ...state,
                processingVotePoll: true,
                votingPollError : null,
            };
        case ACTION_TYPE.VOTE_POLL_SUCCEED:
            return {
                ...state,
                processingVotePoll: false,
                votingPollError : null,
            };
        case ACTION_TYPE.VOTE_POLL_ERROR:
            return {
                ...state,
                processingVotePoll: false,
                votingPollError : action.payload,
            };
        /////////////////////////////
        case ACTION_TYPE.PROCESSING_POLL_PROCESS:
            return {
                ...state,
                processingPollingProcess: true,
                votingPollError : null,
            };
        case ACTION_TYPE.POLL_PROCESS_SUCCEED:
            return {
                ...state,
                processingPollingProcess: false,
                votingPollError : null,
            };
        case ACTION_TYPE.POLL_PROCESS_ERROR:
            return {
                ...state,
                msg:action.payload,
                processingVotePoll: false,
                votingPollError : action.payload,
            };
        /////////////////////////////
        case ACTION_TYPE.CLEAR_ERROR:
            return {
                ...state,
                createPollError: null,
                loadingPollsError: null,
                votingPollError :null,
                pollingProcessError: null
            };
        default:
            return state;
    }
}
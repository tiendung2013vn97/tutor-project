import * as types from '../Constants/actionType'

const init = {
    users: [],
    contracts: [],
};

const accountReducer = (state = init, action) => {
    switch (action.type) {
        case types.GET_USER_LIST: {
            return {
                ...state,
                users: [...action.payload]
            };
        }
        case 'LOG_OUT': {
            localStorage.clear();
            return init
        }
        default: {
            return state;
        }
    }
};

export default accountReducer;

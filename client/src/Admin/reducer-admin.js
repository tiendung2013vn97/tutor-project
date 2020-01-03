import * as types from '../Constants/actionType'

const init = {
    users: null,
    skills: null,
    contracts: null,
    studentReports: null
};

const accountReducer = (state = init, action) => {
    switch (action.type) {
        case types.GET_USER_LIST: {
            return {
                ...state,
                users: action.payload
            };
        }
        case types.GET_SKILLTAG: {
            return {
                ...state,
                skills: action.payload
            };
        }
        case types.GET_CONTRACT: {
            return {
                ...state,
                contracts: action.payload
            };
        }
        case types.GET_STUDENT_REPORT: {
            return {
                ...state,
                studentReports: action.payload
            };
        }
        default: {
            return state;
        }
    }
};

export default accountReducer;

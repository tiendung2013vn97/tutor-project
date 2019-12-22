const init = {
  fullname: null,
  email: null,
  username: null,
  gender: null,
  age: null,
  type: null,
  intro: "",
  rate: 0,
  locationId: -1,
  flagChange: false
};

const accountReducer = (state = init, action) => {
  switch (action.type) {
    case "UPDATE_ACCOUNT_INFO": {
      return {
        ...state,
        ...action.accountInfo
      };
    }
    case "LOG_OUT": {
      localStorage.clear();
      return init;
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;

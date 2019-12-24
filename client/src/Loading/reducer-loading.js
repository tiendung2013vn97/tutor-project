const init = {
  status: false
};

const loadingReducer = (state = init, action) => {
  switch (action.type) {
    case "CHANGE_STATUS": {
      console.log("a",action.status);
      return {
        ...state,
        status: action.status
      };
    }

    default: {
      return state;
      break;
    }
  }
};

export default loadingReducer;

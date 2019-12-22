const init = {
  location: []
};

const locationReducer = (state = init, action) => {
  switch (action.type) {
    case "UPDATE_LOCATION": {
      return {
        ...state,
        ...action.location
      };
    }
    default: {
      return state;
    }
  }
};

export default locationReducer;

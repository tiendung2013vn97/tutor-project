const init = {
  location: []
};

const locationReducer = (state = init, action) => {
  switch (action.type) {
    case "UPDATE_LOCATION": {
      console.log("aa", action.location);
      return {
        ...state,
        location: action.location
      };
    }
    default: {
      return state;
    }
  }
};

export default locationReducer;

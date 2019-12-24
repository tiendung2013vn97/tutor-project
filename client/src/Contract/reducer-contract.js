const init = {
  contracts: []
};

const contractReducer = (state = init, action) => {
  switch (action.type) {
    case "UPDATE_CONTRACT": {
      return {
        ...state,
        contracts: action.contracts
      };
    }
    default: {
      return state;
    }
  }
};

export default contractReducer;

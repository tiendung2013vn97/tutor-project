const init = {
  skills: []
};

const skillReducer = (state = init, action) => {
  switch (action.type) {
    case "UPDATE_SKILL": {
      return {
        ...state,
        skills: action.skills
      };
    }
    default: {
      return state;
    }
  }
};

export default skillReducer;

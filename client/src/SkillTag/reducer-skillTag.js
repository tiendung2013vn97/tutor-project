const init = {
  skillTags: []
};

const skillTagReducer = (state = init, action) => {
  switch (action.type) {
    case "UPDATE_SKILL_TAG": {
      return {
        ...state,
        skillTags: action.skillTags
      };
    }
    default: {
      return state;
    }
  }
};

export default skillTagReducer;

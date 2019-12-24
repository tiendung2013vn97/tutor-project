const init = {
  comments: []
};

const commentReducer = (state = init, action) => {
  switch (action.type) {
    case "UPDATE_COMMENT": {
      return {
        ...state,
        comments: action.comments
      };
    }
    default: {
      return state;
    }
  }
};

export default commentReducer;

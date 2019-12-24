const init = {
  studyRequests: []
};

const studyRequestReducer = (state = init, action) => {
  switch (action.type) {
    case "UPDATE_STUDY_REQUEST": {
      return {
        ...state,
        studyRequests: action.studyRequests
      };
    }
    default: {
      return state;
    }
  }
};

export default studyRequestReducer;

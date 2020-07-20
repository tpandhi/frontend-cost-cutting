import * as ActionTypes from "./ActionTypes";

export const Feedback = (state = { errMess: null, feeback: [] }, action) => {
  switch (action.type) {
    case ActionTypes.POST_FEEDBACK:
      var feeback = action.payload;
      return { ...state, feeback: state.feeback.concat(feeback) };
    default:
      return state;
  }
};

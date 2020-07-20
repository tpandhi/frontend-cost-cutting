import * as ActionTypes from "./ActionTypes";

export const Dishes = (
  state = { isLoading: true, errMess: null, dishes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };
      case ActionTypes.ADD_DISH:
        var dishes = action.payload;
        return { ...state, dishes: state.dishes.concat(dishes) };
    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };

    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};

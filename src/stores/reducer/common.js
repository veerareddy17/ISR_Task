import * as ActionTypes from '../../action/types';

const initialState = {
  isLoading: true,
};

export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOADING_STOP:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

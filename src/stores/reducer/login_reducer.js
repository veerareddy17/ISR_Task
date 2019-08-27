import * as ActionTypes from '../../action/types';

const initialState = {
  user: {},
  error: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.LOGIN_FAILURE:
      return action.payload;
    default:
      return state;
  }
}

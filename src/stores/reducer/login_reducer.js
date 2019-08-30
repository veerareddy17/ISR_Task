import * as ActionTypes from '../../action/types';

const initialState = {
  user: {},
  error: {},
  emailError: '',
  passwordError: '',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.LOGIN_FAILURE:
      return action.payload;
    case ActionTypes.LOGIN_VALIDATION:
      return action.payload;
    default:
      return state;
  }
}

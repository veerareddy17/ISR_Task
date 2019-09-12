import ApiService from '../services/api_service';
import * as ActionTypes from '../action/types';
import {startLoading, stopLoading} from './common';

export const authenticate = (username, password) => (dispatch, getState) => {
  var authState = getState().auth;
  const response = ApiService.authenticate(username, password);
  if (response.success) {
    authState.user = {
      username,
      token: true,
    };

    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: authState,
    });
    return;
  }
  authState.error = error;
  dispatch({
    type: ActionTypes.LOGIN_FAILURE,
    payload: authState,
  });
};
export const loginValidation = (emailError, passwordError) => (
  dispatch,
  getState,
) => {
  var authState = getState().auth;
  authState.emailError = emailError ? emailError : '';
  authState.passwordError = passwordError ? passwordError : '';
  dispatch({
    type: ActionTypes.LOGIN_VALIDATION,
    payload: authState,
  });
};

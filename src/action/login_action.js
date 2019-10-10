import AuthService from '../services/auth_services';
import * as ActionTypes from '../action/types';
import {startLoading, stopLoading} from './common';

export const authenticate = data => async (dispatch, getState) => {
  var authState = getState().auth;
  authState.editableInput = !authState.editableInput;
  dispatch({
    type: ActionTypes.LOGIN_EDITABLE,
    payload: authState,
  });
  dispatch(startLoading);
  data.grant_type = 'password';
  let request = data;
  // let request = {
  //   username: 'AuctionWebsiteUtility',
  //   password: ' KXpaEJDebLU9SvlJswg6',
  //   grant_type: 'password',
  // };

  // const response = await ApiService.authenticate(username, password);

  const response = await AuthService.login(request);
  console.log('what is responce i a getting here...=>', response);
  console.log('error information is,.....=>', response.error_description);

  if (response && response.access_token) {
    let user = {
      userName: response.userName,
    };
    authState.user = user;

    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: authState,
    });
    dispatch(stopLoading);
  } else {
    authState.editableInput = !authState.editableInput;
    authState.error = response.error_description;
    dispatch({
      type: ActionTypes.LOGIN_FAILURE,
      payload: authState,
    });
    dispatch(stopLoading);
  }
};

export const togglePasswordVisibility = () => (dispatch, getState) => {
  var authState = {...getState().auth};
  authState.togglePassword = !authState.togglePassword;
  dispatch({
    type: ActionTypes.TOGGLE_PASSWORD,
    payload: authState,
  });
};

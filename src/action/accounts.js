import ApiService from '../services/api_service';
import * as ActionTypes from '../action/types';
import {startLoading, stopLoading} from './common';

export const createAccounts = data => (dispatch, getState) => {
  var accountState = {...getState().accountReducer};
  accountState.accountList = accountState.accountList.concat(data);
  console.log('data in my account..=>', accountState);
  dispatch({
    type: ActionTypes.CREATE_ACCOUNTS,
    payload: accountState,
  });
};

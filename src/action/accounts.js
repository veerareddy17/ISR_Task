import ApiService from '../services/api_service';
import * as ActionTypes from '../action/types';
import {startLoading, stopLoading} from './common';

export const createAccounts = data => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};

  console.log('data in my account..=>', accountState);
  const response = await ApiService.createAccount(data);
  if (response && response.data) {
    accountState.accountList = accountState.accountList.concat(response.data);
    dispatch({
      type: ActionTypes.CREATE_ACCOUNTS,
      payload: accountState,
    });
  }
};
export const fetchAccounts = () => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};
  const response = await ApiService.fetchAccounts();
  if (response) {
    console.log('contorl is comming or not ltes check in account fetch');
    accountState.accountList = accountState.accountList;
    dispatch({type: ActionTypes.FETCH_ACCOUNTS, payload: accountState});
  }
};

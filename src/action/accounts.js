import ApiService from '../services/api_service';
import * as ActionTypes from '../action/types';
import {startLoading, stopLoading} from './common';
import uuid from 'react-native-uuid';
import {Buffer} from 'buffer';
global.Buffer = Buffer;

//create Accounts
export const createAccounts = data => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};

  var Id = uuid.v1({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 5678,
  });
  data.Id = Id;
  var accountData = data;
  const response = await ApiService.createAccount(accountData);
  if (response && response.status == 201) {
    // const response = await ApiService.fetchAccounts();
    // accountState.accountList = response;
    // dispatch({type: ActionTypes.FETCH_ACCOUNTS, payload: accountState});
    // dispatch(stopLoading);
  }
  dispatch(stopLoading);
};

//fetch Accounts
export const fetchAccounts = () => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};
  dispatch(startLoading);

  const response = await ApiService.fetchAccounts();
  if (response) {
    accountState.accountList = response;

    dispatch({type: ActionTypes.FETCH_ACCOUNTS, payload: accountState});
    dispatch(stopLoading);
    return;
  }
  dispatch(stopLoading);
};

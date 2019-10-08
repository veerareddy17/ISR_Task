import ApiService from '../services/api_service';
import * as ActionTypes from '../action/types';
import {startLoading, stopLoading} from './common';
import uuid from 'react-native-uuid';
import ApiRequest from '../models/api_request';
import {APIConstants} from '../services/api_constant';
import {Buffer} from 'buffer';
global.Buffer = Buffer;

//fetch Accounts
export const fetchAccounts = () => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};

  dispatch(startLoading);
  var data = {
    url: APIConstants.ACCOUNT_URL,
    method: 'get',
  };
  const response = await ApiService.get(data);
  if (response && response.data) {
    accountState.accountList = response.data;
    dispatch({type: ActionTypes.FETCH_ACCOUNTS, payload: accountState});
    dispatch(stopLoading);
    return;
  }
  dispatch(stopLoading);
};

export const selectedAccount = Id => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};
  accountState.selectedAccount = '';
  dispatch({
    type: ActionTypes.ACCOUNT_SELECTED,
    payload: accountState,
  });
  var data = {
    url: APIConstants.ACCOUNT_URL + '/' + Id,
    method: 'get',
  };
  const response = await ApiService.get(data);
  console.log('what selected opportunity i ma getting...', response.data);
  if (response && response.data) {
    accountState.selectedAccount = response.data;
    accountState.accountId = accountState.selectedAccount.Id;
    dispatch({
      type: ActionTypes.ACCOUNT_SELECTED,
      payload: accountState,
    });
  }
};

///
export const deleteAccountNotes = id => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};
  var data = {
    url: APIConstants.NOTES_URL + '/' + id,
    method: 'delete',
  };
  const response = await ApiService.delete(data);
  var Id = accountState.selectedAccount.Id;
  var data = {
    url: APIConstants.ACCOUNT_URL + '/' + Id,
    method: 'get',
  };
  const responseData = await ApiService.get(data);
  // const responseData = await ApiService.fetchAccountDetails(Id);
  if (responseData) {
    accountState.selectedAccount = responseData.data;
    dispatch({type: ActionTypes.ACCOUNT_SELECTED, payload: accountState});
    dispatch(stopLoading);
  }
};
//

///
export const deleteAccountAddresses = id => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};
  var data = {
    url: APIConstants.ADDRESS_URL + '/' + id,
    method: 'delete',
  };
  const response = await ApiService.delete(data);
  var Id = accountState.selectedAccount.Id;
  var data = {
    url: APIConstants.ACCOUNT_URL + '/' + Id,
    method: 'get',
  };
  const responseData = await ApiService.get(data);
  // const responseData = await ApiService.fetchAccountDetails(Id);
  if (responseData) {
    accountState.selectedAccount = responseData.data;
    dispatch({type: ActionTypes.ACCOUNT_SELECTED, payload: accountState});
    dispatch(stopLoading);
  }
};

export const createAccountNotes = notesData => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};
  var url =
    APIConstants.ACCOUNT_URL + '/' + accountState.selectedAccount.Id + '/Notes';
  var reqObject = {
    url: url,
    params: notesData,
    method: 'post',
  };
  const response = await ApiService.create(reqObject);
  if (response && response.status == 201) {
    var Id = accountState.selectedAccount.Id;
    var data = {
      url: APIConstants.ACCOUNT_URL + '/' + Id,
      method: 'get',
    };
    const responseData = await ApiService.get(data);
    if (responseData) {
      accountState.selectedAccount = responseData.data;

      dispatch({type: ActionTypes.ACCOUNT_SELECTED, payload: accountState});
      dispatch(stopLoading);
    }
  }
  dispatch(stopLoading);
};

export const createAccountAddresses = addressData => async (
  dispatch,
  getState,
) => {
  var accountState = {...getState().accountReducer};
  var url =
    APIConstants.ACCOUNT_URL +
    '/' +
    accountState.selectedAccount.Id +
    '/Addresses';
  var reqObject = {
    url: url,
    params: addressData,
    method: 'post',
  };
  const response = await ApiService.create(reqObject);
  if (response && response.status == 201) {
    var Id = accountState.selectedAccount.Id;
    var data = {
      url: APIConstants.ACCOUNT_URL + '/' + Id,
      method: 'get',
    };
    const responseData = await ApiService.get(data);

    if (responseData) {
      accountState.selectedAccount = responseData.data;

      dispatch({type: ActionTypes.ACCOUNT_SELECTED, payload: accountState});
      dispatch(stopLoading);
    }
  }
  dispatch(stopLoading);
};

export const createAccounts = object => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};

  var reqObject = {
    url: APIConstants.ACCOUNT_URL,
    params: object,
    method: 'post',
  };
  const response = await ApiService.create(reqObject);

  if (response && response.status == 201) {
    var data = {
      url: APIConstants.ACCOUNT_URL,
      method: 'get',
    };
    dispatch(startLoading);
    const response = await ApiService.get(data);
    if (response && response.data) {
      accountState.accountList = response.data;

      dispatch({type: ActionTypes.FETCH_ACCOUNTS, payload: accountState});
      dispatch(stopLoading);
      return;
    }
    dispatch(stopLoading);
  }

  dispatch(stopLoading);
};

export const deleteAccount = id => async (dispatch, getState) => {
  var accountState = {...getState().accountReducer};

  var url = APIConstants.ACCOUNT_URL + '/' + id;
  var reqObject = {
    url: url,
    method: 'delete',
  };
  console.log('data..is..=>', reqObject);
  const response = await ApiService.delete(reqObject);
  console.log('resp.=>', response);
  if (response) {
    var data = {
      url: APIConstants.ACCOUNT_URL,
      method: 'get',
    };
    dispatch(startLoading);
    const responseData = await ApiService.get(data);
    console.log('data resp.=>', responseData);
    if (responseData) {
      accountState.accountList = responseData;

      dispatch({type: ActionTypes.FETCH_ACCOUNTS, payload: accountState});
      dispatch(stopLoading);
      return;
    }
    dispatch(stopLoading);
  }

  dispatch(stopLoading);
};

export const createAccountActivity = activityData => async (
  dispatch,
  getState,
) => {
  var accountState = {...getState().accountReducer};
  var Type = parseInt(activityData.Type, 10);
  var Status = parseInt(activityData.Status, 10);
  var data = {
    AccountId: accountState.selectedAccount.Id,
    // OpportunityId: opportunitState.selectedOpportunity.Id,
    Title: activityData.Title,
    Type: Type,
    Status: Status,
    Date: activityData.Date,
    DueDate: activityData.DueDate,
    DateCompleted: '2019-09-23T11:13:50.3683788+00:00',
  };
  var Id = uuid.v1({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 5678,
  });
  data.Id = Id;

  var url = APIConstants.SALESACTIVITY_URL;
  var reqObject = {
    url: url,
    params: data,
    method: 'post',
  };
  const response = await ApiService.create(reqObject);
  if (response && response.status == 201) {
    var Id = accountState.selectedAccount.Id;
    var data = {
      url: APIConstants.ACCOUNT_URL + '/' + Id,
      method: 'get',
    };
    const responseData = await ApiService.get(data);
    // const responseData = await ApiService.fetchAccountDetails(Id);
    if (responseData) {
      accountState.selectedAccount = responseData.data;

      dispatch({type: ActionTypes.ACCOUNT_SELECTED, payload: accountState});
      dispatch(stopLoading);
    }
  }
};

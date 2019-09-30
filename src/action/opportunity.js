import {Dispatch} from 'redux';

import ApiService from '../services/api_service';
import {startLoading, stopLoading} from './common';

import * as ActionTypes from '../action/types';
import uuid from 'react-native-uuid';
import {Buffer} from 'buffer';
import ApiRequest from '../models/api_request';
global.Buffer = Buffer;

export const fetchOpportunities = () => async (dispatch, getState) => {
  var opportunitState = {...getState().opportunityReducer};
  // stopLoading;
  // startLoading;
  dispatch(startLoading);
  // var request = new ApiRequest({type: 'get', urlType: 'opportunity'});
  const response = await ApiService.fetchOpportunities();

  console.log('opportunity collecting from server...is=>', response.data);
  if (response && response.data) {
    opportunitState.opportunityList = response.data;
    // opportunitState.error = response.error;

    dispatch({
      type: ActionTypes.FETCH_OPPORTUNITIES,
      payload: opportunitState,
    });
    dispatch(stopLoading);
    return;
  }
  dispatch(stopLoading);
};

export const selectedOpportunity = Id => async (dispatch, getState) => {
  var opportunitState = {...getState().opportunityReducer};
  opportunitState.opportunityId = Id;
  const response = await ApiService.fetchOpportunityDetails(Id);
  console.log('what selected opportunity i ma getting...', response.data);
  if (response && response.data) {
    opportunitState.selectedOpportunity = response.data;

    dispatch({
      type: ActionTypes.OPPORTUNITIES_SELECTED,
      payload: opportunitState,
    });
  }
};

export const createNewOpportunity = id => async (dispatch, getState) => {
  var opportunitState = {...getState().opportunityReducer};

  var newOpportunity = {
    id: opportunitState.opportunityList.length,
    general: {
      id: `g${opportunitState.opportunityList.length}`,
      title: '',
      details: '',
      opportunitiesType: '',
      closeDate: '',
      chooseDate: '',
      stage: '',
      estimated: '',
    },
    contact: {
      id: `c${opportunitState.opportunityList.length}`,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
    notes: [],

    activity: {
      id: `a${opportunitState.opportunityList.length}`,
      parentAccount: '',
      parentOpportunity: '',
      activityType: '',
      desciption: '',
      currentStatus: '',
      created: '',
      due: '',
    },
  };
  opportunitState.opportunityId = opportunitState.opportunityList.length;
  // opportunitState.opportunityList=opportunitState.opportunityList

  opportunitState.selectedOpportunity = newOpportunity;
  dispatch({
    type: ActionTypes.CREAT_OPPORTTIES,
    payload: opportunitState,
  });
};

export const createOpportunityActvityAction = activitData => async (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};
  // var Type = parseInt(activitData.Type, 10);
  // var Status = parseInt(activitData.Status, 10);
  var data = {
    // AccountId: opportunitState.selectedOpportunity.Account.Id,
    OpportunityId: opportunitState.selectedOpportunity.Id,
    Title: activitData.Title,
    Type: 2,
    Status: 2,
    Date: '2019-09-23T11:13:50.3683788+00:00',
    DueDate: '2019-09-23T11:13:50.3683788+00:00',
    DateCompleted: '2019-09-23T11:13:50.3683788+00:00',
  };
  var Id = uuid.v1({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 5678,
  });
  data.Id = Id;

  const response = await ApiService.createOpportunityActvity(data);

  if (response && response.status == 201) {
    const response = await ApiService.fetchOpportunities();
    if (response && response.data) {
      opportunitState.opportunityList = response.data;

      dispatch({
        type: ActionTypes.FETCH_OPPORTUNITIES,
        payload: opportunitState,
      });
      dispatch(stopLoading);
      return;
    }
  }
};

export const createOpportunityGeneralAction = general => async (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};
  var generalData = general.data;
  var generalId = general.Id;
  var data = {
    AccountId: generalId,
    Details: generalData.Details,
    ExpectedCloseDate: generalData.ExpectedCloseDate,

    ItemCategory: 3,
    Probability: 6.1,
    ProjectedTotal: 20,
    Title: generalData.Title,
  };
  var Id = uuid.v1({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 5678,
  });
  data.Id = Id;

  const response = await ApiService.createOpportunityGeneral(data);

  console.log(
    'what is getting when i submit..+>',
    opportunitState.selectedOpportunity,
  );
  if (response && response.status == 201) {
    const response = await ApiService.fetchOpportunities();
    if (response && response.data) {
      opportunitState.opportunityList = response.data;
      dispatch({
        type: ActionTypes.FETCH_OPPORTUNITIES,
        payload: opportunitState,
      });
      dispatch(stopLoading);
      return;
    }
  }
};

export const createOpportunityNoteAction = notesData => async (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};
  // dispatch(startLoading);
  var Id = uuid.v1({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 5678,
  });
  var data = {
    ParentId: opportunitState.selectedOpportunity.Id,

    Title: notesData.Title,
    Comments: notesData.Comments,
    Date: '2019-09-26T06:45:14.7098282+00:00',
  };

  data.Id = Id;
  console.log('is it id is same.......', data);

  const response = await ApiService.createOpportunityNotes(data);
  if (response && response.status == 201) {
    const response = await ApiService.fetchOpportunities();

    console.log('opportunity collecting from server...is=>', response.data);
    if (response && response.data) {
      opportunitState.opportunityList = response.data;
      dispatch({
        type: ActionTypes.FETCH_OPPORTUNITIES,
        payload: opportunitState,
      });
      dispatch(stopLoading);
      return;
    }
  }
  dispatch(stopLoading);
};

export const createOpportunityContactAction = contactData => async (
  dispatch,
  getState,
) => {
  dispatch(startLoading);
  var opportunitState = {...getState().opportunityReducer};
  const response = await ApiService.createOpportunityContact(contactData);
  opportunitState.selectedOpportunity.contact = contactData;
  if (response && response.data) {
    opportunitState.opportunityList[opportunitState.opportunityId] =
      opportunitState.selectedOpportunity;
    opportunitState.opportunityList[opportunitState.opportunityId] = {
      ...opportunitState.opportunityList[opportunitState.opportunityId],
      opportunity: opportunitState.opportunityId,
      // contact: response.data,
      id: opportunitState.opportunityId,
    };
    dispatch({
      type: ActionTypes.CREAT_OPPORTTIES,
      payload: opportunitState,
    });
  }
  dispatch(stopLoading);
};

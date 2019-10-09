import ApiService from '../services/api_service';
import {startLoading, stopLoading} from './common';
import * as ActionTypes from '../action/types';
import uuid from 'react-native-uuid';
import {Buffer} from 'buffer';
import {APIConstants} from '../services/api_constant';
global.Buffer = Buffer;

export const fetchOpportunities = () => async (dispatch, getState) => {
  var opportunitState = {...getState().opportunityReducer};

  dispatch(startLoading);

  var getRequest = {
    url: APIConstants.OPPORTUNITY_URL,
    method: 'get',
  };
  const response = await ApiService.get(getRequest);

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
  // const response = await ApiService.fetchOpportunityDetails(Id);
  var getRequest = {
    url: APIConstants.OPPORTUNITY_URL + '/' + Id,
    method: 'get',
  };
  const response = await ApiService.get(getRequest);
  console.log('what selected opportunity i ma getting...', response.data);
  if (response && response.data) {
    opportunitState.selectedOpportunity = response.data;

    dispatch({
      type: ActionTypes.OPPORTUNITIES_SELECTED,
      payload: opportunitState,
    });
  }
};

export const createOpportunityGeneralAction = general => async (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};
  var generalData = general.data;
  var generalId = general.Id;

  var ItemCategory = parseInt(generalData.ItemCategory, 10);
  var Probability = parseInt(generalData.Probability, 10);
  var ProjectedTotal = parseInt(generalData.ProjectedTotal, 10);
  var data = {
    AccountId: generalId,
    Details: generalData.Details,
    ExpectedCloseDate: generalData.ExpectedCloseDate,
    ItemCategory: ItemCategory,
    Probability: Probability,
    ProjectedTotal: ProjectedTotal,
    Title: generalData.Title,
  };
  var Id = uuid.v1({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 5678,
  });
  data.Id = Id;
  var postRequest = {
    url: APIConstants.OPPORTUNITY_URL,
    method: 'post',
    params: data,
  };

  const response = await ApiService.create(postRequest);

  console.log(
    'what is getting when i submit..+>',
    opportunitState.selectedOpportunity,
  );
  if (response && response.status == 201) {
    // const response = await ApiService.fetchOpportunities();
    var getRequest = {
      url: APIConstants.OPPORTUNITY_URL,
      method: 'get',
    };
    const responseData = await ApiService.get(getRequest);
    if (responseData && responseData.data) {
      opportunitState.opportunityList = responseData.data;
      dispatch({
        type: ActionTypes.FETCH_OPPORTUNITIES,
        payload: opportunitState,
      });
      dispatch(stopLoading);
      return;
    }
  }
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
///

export const createOpportunityNotes = notesData => async (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};
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
    Date: notesData.Date,
  };

  data.Id = Id;
  var url =
    APIConstants.OPPORTUNITY_URL +
    '/' +
    opportunitState.selectedOpportunity.Id +
    '/Notes';
  var postRequest = {
    url: url,
    params: data,
    method: 'post',
  };

  console.log('is it id is same.......', data);

  const res = await ApiService.create(postRequest);
  if (res && res.status == 201) {
    var Id = opportunitState.selectedOpportunity.Id;

    var getRequest = {
      url: APIConstants.OPPORTUNITY_URL + '/' + Id,
      method: 'get',
    };
    const response = await ApiService.get(getRequest);
    if (response && response.data) {
      opportunitState.selectedOpportunity = response.data;
      dispatch({
        type: ActionTypes.OPPORTUNITIES_SELECTED,
        payload: opportunitState,
      });
      dispatch(stopLoading);
      return;
    }
  }
  dispatch(stopLoading);
};

export const createOpportunityActvity = activitData => async (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};
  var Type = parseInt(activitData.Type, 10);
  var Status = parseInt(activitData.Status, 10);
  var data = {
    OpportunityId: opportunitState.selectedOpportunity.Id,
    Title: activitData.Title,
    Type: Type,
    Status: Status,
    Date: activitData.Date,
    DueDate: activitData.DueDate,
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

  const res = await ApiService.create(reqObject);

  if (res && res.status == 201) {
    var Id = opportunitState.selectedOpportunity.Id;
    var getRequest = {
      url: APIConstants.OPPORTUNITY_URL + '/' + Id,
      method: 'get',
    };
    const response = await ApiService.get(getRequest);
    if (response && response.data) {
      opportunitState.selectedOpportunity = response.data;

      dispatch({
        type: ActionTypes.OPPORTUNITIES_SELECTED,
        payload: opportunitState,
      });
      dispatch(stopLoading);
      return;
    }
  }
};

export const deleteOpportunityNotes = id => async (dispatch, getState) => {
  var opportunitState = {...getState().opportunityReducer};
  var data = {
    url: APIConstants.NOTES_URL + '/' + id,
    method: 'delete',
  };
  const response = await ApiService.delete(data);
  var Id = opportunitState.selectedOpportunity.Id;
  var getRequest = {
    url: APIConstants.OPPORTUNITY_URL + '/' + Id,
    method: 'get',
  };
  const responseData = await ApiService.get(getRequest);
  if (responseData) {
    opportunitState.selectedOpportunity = responseData.data;
    dispatch({
      type: ActionTypes.OPPORTUNITIES_SELECTED,
      payload: opportunitState,
    });
    dispatch(stopLoading);
  }
};

export const createNewOpportunity = Id => (dispatch, getState) => {
  var opportunitState = {...getState().opportunityReducer};
  opportunitState.selectedOpportunity = '';
  dispatch({
    type: ActionTypes.OPPORTUNITIES_SELECTED,
    payload: opportunitState,
  });
};

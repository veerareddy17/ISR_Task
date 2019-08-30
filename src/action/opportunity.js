import {Dispatch} from 'redux';

import ApiService from '../services/api_service';
import {startLoading, stopLoading} from './common';

import * as ActionTypes from '../action/types';

export const fetchOpportunities = () => async (dispatch, getState) => {
  var opportunitState = {...getState().opportunityReducer};
  // stopLoading;
  // startLoading;
  // dispatch(startLoading);
  const response = await ApiService.fetchOpportunities();
  console.log('data in fetch opportunity,,..=>', response);
  if (response && response.data) {
    opportunitState.opportunityList = opportunitState.opportunityList;
    opportunitState.error = response.error;

    dispatch({
      type: ActionTypes.FETCH_OPPORTUNITIES,
      payload: opportunitState,
    });
    dispatch(stopLoading);
    return;
  }
  // dispatch(stopLoading);
};

export const selectedOpportunity = selectedOpportunityId => async (
  dispatch,
  getState,
) => {
  console.log('what is ,,, here.....=>', selectedOpportunityId);
  var opportunitState = {...getState().opportunityReducer};
  opportunitState.opportunityId = selectedOpportunityId;
  const response = await ApiService.fetchOpportunityDetails(
    selectedOpportunityId,
  );
  opportunitState.selectedOpportunity =
    opportunitState.opportunityList[selectedOpportunityId];
  console.log(
    'what is selecting here.......=>',
    opportunitState.selectedOpportunity,
  );

  dispatch({
    type: ActionTypes.OPPORTUNITIES_SELECTED,
    payload: opportunitState,
  });
};

export const createNewOpportunity = id => async (dispatch, getState) => {
  var opportunitState = {...getState().opportunityReducer};

  opportunitState.opportunityId = opportunitState.opportunityList.length;
  // opportunitState.opportunityList=opportunitState.opportunityList
  console.log(
    'leght of the list is.......=>',
    opportunitState.opportunityList.length,
  );

  opportunitState.selectedOpportunity = '';
  dispatch({
    type: ActionTypes.CREAT_OPPORTTIES,
    payload: opportunitState,
  });
};

// export const OpportunityContactEditAction = contactData => (
//   dispatch,
//   getState,
// ) => {
//   console.log('edited contact data is....=>', contactData);
//   var opportunitState = {...getState().opportunityReducer};
//   // const response = ApiService.fetchOpportunityContactChange(contactData);
// };

export const createOpportunityActvityAction = activitData => async (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};

  const response = await ApiService.createOpportunityActvity(activitData);
  if (response && response.data) {
    opportunitState.opportunityList[opportunitState.opportunityId] = {
      ...opportunitState.opportunityList[opportunitState.opportunityId],
      opportunity: opportunitState.opportunityId,
      activity: response.data,
      id: opportunitState.opportunityId,
    };
    opportunitState.selectedOpportunity = '';
    dispatch({
      type: ActionTypes.CREAT_OPPORTTIES,
      payload: opportunitState,
    });
  }
  // const response = ApiService.fetchOpportunityContactChange(contactData);
};

export const createOpportunityGeneralAction = generalData => async (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};
  console.log('edited contact data is....=>', generalData);
  const response = await ApiService.createOpportunityGeneral(generalData);
  if (response && response.data) {
    opportunitState.opportunityList[opportunitState.opportunityId] = {
      ...opportunitState.opportunityList[opportunitState.opportunityId],
      opportunity: opportunitState.opportunityId,
      Opportunities: opportunitState.opportunityId,
      estmatedToatl: generalData.estimated,
      general: response.data,
      user: generalData.opportunitiesType,
      id: opportunitState.opportunityId,
    };
    opportunitState.selectedOpportunity = '';
    dispatch({
      type: ActionTypes.CREAT_OPPORTTIES,
      payload: opportunitState,
    });
  }
  // const response = ApiService.fetchOpportunityContactChange(contactData);
};

export const createOpportunityNoteAction = notesData => async (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};

  const response = await ApiService.createOpportunityNotes(notesData);

  if (response && response.data) {
    opportunitState.opportunityList[opportunitState.opportunityId] = {
      ...opportunitState.opportunityList[opportunitState.opportunityId],
      opportunity: opportunitState.opportunityId,
      notes: response.data,
      id: opportunitState.opportunityId,
    };
    opportunitState.selectedOpportunity = '';
    dispatch({
      type: ActionTypes.CREAT_OPPORTTIES,
      payload: opportunitState,
    });
  }
  // const response = ApiService.fetchOpportunityContactChange(contactData);
};

export const createOpportunityContactAction = contactData => async (
  dispatch,
  getState,
) => {
  dispatch(startLoading);
  var opportunitState = {...getState().opportunityReducer};
  const response = await ApiService.createOpportunityContact(contactData);

  if (response && response.data) {
    opportunitState.opportunityList[opportunitState.opportunityId] = {
      ...opportunitState.opportunityList[opportunitState.opportunityId],
      opportunity: opportunitState.opportunityId,
      contact: response.data,
      id: opportunitState.opportunityId,
    };
    dispatch({
      type: ActionTypes.CREAT_OPPORTTIES,
      payload: opportunitState,
    });
  }
  setTimeout(function() {
    //do what you need here
    return dispatch(stopLoading);
  }, 500);
  opportunitState.selectedOpportunity = '';

  // const response = ApiService.fetchOpportunityContactChange(contactData);
};

export const OpportunityActvityEditAction = activitData => (
  dispatch,
  getState,
) => {
  console.log('edited contact data is....=>', activitData);
  var opportunitState = {...getState().opportunityReducer};
  // const response = ApiService.fetchOpportunityContactChange(contactData);
};

export const OpportunityGeneralEditAction = generalData => (
  dispatch,
  getState,
) => {
  console.log('edited contact data is....=>', generalData);
  var opportunitState = {...getState().opportunityReducer};
  // const response = ApiService.fetchOpportunityContactChange(contactData);
};

export const OpportunityNoteEditAction = notesData => (dispatch, getState) => {
  console.log('edited contact data is....=>', notesData);
  var opportunitState = {...getState().opportunityReducer};
  // const response = ApiService.fetchOpportunityContactChange(contactData);
};

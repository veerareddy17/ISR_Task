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

export const createOpportunityActvityAction = activitData => (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};
  opportunitState.opportunityList[opportunitState.opportunityId] = {
    ...opportunitState.opportunityList[opportunitState.opportunityId],
    opportunity: opportunitState.opportunityId,
    activity: activitData,
    id: opportunitState.opportunityId,
  };

  console.log(
    'general data is create......=>',
    opportunitState.opportunityList,
  );
  opportunitState.selectedOpportunity = '';
  dispatch({
    type: ActionTypes.CREAT_OPPORTTIES,
    payload: opportunitState,
  });
  // const response = ApiService.fetchOpportunityContactChange(contactData);
};

export const createOpportunityGeneralAction = generalData => (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};
  console.log('edited contact data is....=>', generalData);

  //  { Opportunities: 1,
  //         estmatedToatl: 500,
  //         user: 'customer'}
  opportunitState.opportunityList[opportunitState.opportunityId] = {
    ...opportunitState.opportunityList[opportunitState.opportunityId],
    opportunity: opportunitState.opportunityId,
    Opportunities: opportunitState.opportunityId,
    estmatedToatl: generalData.estimated,
    general: generalData,
    user: generalData.opportunitiesType,
    id: opportunitState.opportunityId,
  };

  console.log(
    'general data is create......=>',
    opportunitState.opportunityList,
  );
  opportunitState.selectedOpportunity = '';
  dispatch({
    type: ActionTypes.CREAT_OPPORTTIES,
    payload: opportunitState,
  });
  // const response = ApiService.fetchOpportunityContactChange(contactData);
};

export const createOpportunityNoteAction = notesData => (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};

  opportunitState.opportunityList[opportunitState.opportunityId] = {
    ...opportunitState.opportunityList[opportunitState.opportunityId],
    opportunity: opportunitState.opportunityId,
    notes: notesData,
    id: opportunitState.opportunityId,
  };

  console.log(
    'general data is create......=>',
    opportunitState.opportunityList,
  );
  opportunitState.selectedOpportunity = '';
  dispatch({
    type: ActionTypes.CREAT_OPPORTTIES,
    payload: opportunitState,
  });
  // const response = ApiService.fetchOpportunityContactChange(contactData);
};

export const createOpportunityContactAction = contactData => async (
  dispatch,
  getState,
) => {
  dispatch(startLoading);
  console.log('edited contact data is....=>', contactData);
  var opportunitState = {...getState().opportunityReducer};
  console.log('edited contact data is....=>', contactData);

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

  console.log(
    'general data is create......=>',
    opportunitState.opportunityList,
  );
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

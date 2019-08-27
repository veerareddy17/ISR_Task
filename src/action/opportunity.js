import {Dispatch} from 'redux';

import ApiService from '../services/api_service';
import {startLoading, stopLoading} from './common';

import * as ActionTypes from '../action/types';

export const selectedOpportunityActions = opportunitySelectedId => {
  return {
    type: ActionTypes.OPPORTUNITIES_SELECTED,
  };
};

export const fetchOpportunities = () => (dispatch, getState) => {
  var opportunitState = {...getState().opportunityReducer};
  // stopLoading;
  // startLoading;
  const response = ApiService.fetchOpportunities();
  opportunitState.opportunityList = response.data;
  opportunitState.error = response.error;

  dispatch({
    type: ActionTypes.FETCH_OPPORTUNITIES,
    payload: opportunitState,
  });
  dispatch(stopLoading);
};

export const selectedOpportunity = selectedOpportunityId => (
  dispatch,
  getState,
) => {
  var opportunitState = {...getState().opportunityReducer};
  const response = ApiService.fetchOpportunityDetails(selectedOpportunityId);
  opportunitState.selectedOpportunity = response.data;
  dispatch({
    type: ActionTypes.OPPORTUNITIES_SELECTED,
    payload: opportunitState,
  });
};

export const OpportunityContactEditAction = contactData => (
  dispatch,
  getState,
) => {
  console.log('edited contact data is....=>', contactData);
  var opportunitState = {...getState().opportunityReducer};
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

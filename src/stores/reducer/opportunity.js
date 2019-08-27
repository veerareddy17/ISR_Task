import * as ActionTypes from '../../action/types';

const initialState = {
  opportunityList: [],
  selectedOpportunity: '',
};

export default function opportunityReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_OPPORTUNITIES:
      return action.payload;
    case ActionTypes.OPPORTUNITIES_SELECTED:
      return action.payload;
    // case ActionTypes.OPPORTUNITIES_SELECTED:
    //   return action.payload;

    default:
      return state;
  }
}

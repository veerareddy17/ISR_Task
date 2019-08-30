import * as ActionTypes from '../../action/types';

const initialState = {
  opportunityList: [],
  selectedOpportunity: '',
  opportunityId: 0,
};

export default function opportunityReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_OPPORTUNITIES:
      return action.payload;
    case ActionTypes.OPPORTUNITIES_SELECTED:
      return action.payload;
    case ActionTypes.CREAT_OPPORTTIES:
      return action.payload;
    // case ActionTypes.OPPORTUNITIES_SELECTED:
    //   return action.payload;

    default:
      return state;
  }
}

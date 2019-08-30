import * as ActionTypes from '../../action/types';

const initialState = {
  accountList: [],
  accountId: '',
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_ACCOUNTS:
      return action.payload;
    case ActionTypes.DELET_ACCOUNTS:
      return action.payload;
    default:
      return state;
  }
}

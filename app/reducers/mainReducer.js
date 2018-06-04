import actionTypes from 'ACTION_TYPES'
import {cloneDeep} from 'lodash'


let _designDefault = {
    filter: {
      year: 2017,//(new Date()).getFullYear(),
      product: 'all',
      area: 'all',
      quarter: 1,
      month: 1,
      week: 1,
      province: '1',//Hanoi = 1
    },
    products: [],
    provinces: [],
    reportBy: window.ISD_CURRENT_PAGE ? window.ISD_CURRENT_PAGE : 'doanh_thu_tong',
  },
  cloneState;

export default (state = _designDefault, action) => {
  switch (action.type) {
    case actionTypes.START_APP:
      cloneState = cloneDeep(state);
      cloneState = {
        ...cloneState,
        ...action.defaultProps
      }
      return cloneState;
      break;
    case actionTypes.UPDATE_STATE_DATA:
      cloneState = cloneDeep(state);
      cloneState = {
        ...cloneState,
        ...action.updateData
      }
      return cloneState;
      break;
  }
  return state;
}

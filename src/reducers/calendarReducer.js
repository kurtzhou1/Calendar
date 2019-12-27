import {PREV_YEARMONTH,NEXT_YEARMONTH,GOTO_YEARMONTH} from '../constants/action-types';
  
  const defaultState = {
    thisYearMonth:  '198701',
  }

  export default function selectedYearMonth(state = defaultState, action) {
    console.log('state1:::',state)
    switch (action.type) {
        case PREV_YEARMONTH:
            return state.clone().subtract(1, "month");
        case NEXT_YEARMONTH:
            return state.clone().add(1, "month");
        case GOTO_YEARMONTH:
            return action.yearMonth.clone();
        default:
            return state;
    }
}
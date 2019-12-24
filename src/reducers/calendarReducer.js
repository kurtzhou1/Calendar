import {HANDLE_PREV_MONTH,HANDLE_NEXT_MONTH} from '../constants/action-types';
import moment from "moment";

const defaultState = {
    thisYearMonth:  moment(202001, 'YYYYMM'),
  }

export default function selectedYearMonth(state = defaultState, action)  {
   
    switch(action.type) {
      case HANDLE_PREV_MONTH: 
        return state.clone().subtract(1, "month");
          //    if (selectedYearMonth > 1) 
  //    return {
  //      ...state,
  //      selectedYearMonth: selectedYearMonth - 1,
  //    };
  //  else if (selectedYearMonth === 1) 
  //    return { 
  //      ...state,
  //      selectedYearMonth: 12,
  //    };
      case HANDLE_NEXT_MONTH:
        return state.clone().add(1, "month");
      default:
        return state;
      // case HANDLE_NEXT_MONTH:
      //   if (mMonth < months.length - 2) 
      //     return ({
      //       ...state,
      //       mMonth: mMonth + 1,
      //       targetMonth: mMonth + 1
      //     })
      //   else if (targetMonth === months.length - 2) 
      //     return ({
      //       ...state,
      //       targetMonth : targetMonth + 1
      //     })
      // case HANDLE_TARGET_MONTH:
      //   const { index } = action;
      //   if (index >= 1 && index <= months.length - 2) 
      //     return ({ 
      //       ...state,
      //       mMonth: index, 
      //       targetMonth: index 
      //     });
      //   else 
      //     return ({ 
      //       ...state,
      //       targetMonth: index 
      //     });
      // case "GET_SCHEDULES":
      //   return { ...state, ...action.data };
    }
  }


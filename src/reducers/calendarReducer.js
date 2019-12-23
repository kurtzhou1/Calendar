import {HANDLE_PREV_MONTH,HANDLE_NEXT_MONTH,HANDLE_TARGET_MONTH} from '../constants/action-types'

const defaultState = {
    months: [],
    // Middle Show Month Index
    mMonth: 1,
    targetMonth: 1,
    schedules: [],
    isList: false,
    curPage: 1,
    targetItem: undefined,
    thisYear: 2020,
    thisMonth: 1
  }

export default (state = defaultState, action) => {
    switch(action.type) {
      case HANDLE_PREV_MONTH:
        // if (thisMonth > 1) 
        //   return {
        //     ...state,
        //     thisMonth: thisMonth - 1,
        //   };
        // else if (thisMonth === 1) 
        //   return { 
        //     ...state,
        //     thisMonth: 12,
        //   };
          return state.clone().subtract(1, "month");
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
      // default: 
      //   return state;
    }
  }
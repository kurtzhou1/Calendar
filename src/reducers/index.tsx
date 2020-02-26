import {PREV_YEARMONTH,NEXT_YEARMONTH,GOTO_YEARMONTH} from '../constants/action-types';
import moment from "moment";
  
  export interface IProps{
    state: 'string'
  }

  const initDate = '201801'
  const defaultState = {
    thisYearMonth:  moment(initDate,'YYYYMM'),
  }
  
const selectedYearMonth = (state:any = defaultState, action:any)=>{
    switch (action.type) {
        case PREV_YEARMONTH:
          {const tempTodo = state.thisYearMonth.clone().subtract(1, "month")
            return {thisYearMonth:tempTodo}}
        case NEXT_YEARMONTH:
          {const tempTodo = state.thisYearMonth.clone().add(1, "month")
            return {thisYearMonth:tempTodo}}
            case GOTO_YEARMONTH:
          {return {thisYearMonth:state.thisYearMonth}}
        default:
            return state;
    }
}

export default selectedYearMonth
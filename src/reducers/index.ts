import {PREV_YEARMONTH,NEXT_YEARMONTH,GOTO_YEARMONTH} from '../constants/action-types';
import moment from "moment";
  
  export interface IStats{
    thisYearMonth: moment.Moment
  }

  const initDate = '201801'
  const defaultState:IStats = {
    thisYearMonth:  moment(initDate,'YYYYMM'),
  }
  
const selectedYearMonth = (state = defaultState, action:any):IStats=>{
  //如果函式裡面有return值，需要於( )之中帶上:IStats
    switch (action.type) {
        case PREV_YEARMONTH:
          {const tempTodo = state.thisYearMonth.clone().subtract(1, "month")
          const newTemp = action.tempTodo +　1
            return {...state,thisYearMonth:newTemp}}
        case NEXT_YEARMONTH:
          {const tempTodo = state.thisYearMonth.clone().add(1, "month")
            return {...state,thisYearMonth:tempTodo}}
            case GOTO_YEARMONTH:
          {return {...state,thisYearMonth:state.thisYearMonth}}
        default:
            return state;
    }
}

export default selectedYearMonth
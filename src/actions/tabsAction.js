// import {HANDLE_PREV_MONTH,HANDLE_NEXT_MONTH,HANDLE_TARGET_MONTH} from '../constants/action-types'
import * as types from '../constants/action-types'

export const handlePrevMonth = () => ({ type: types.HANDLE_PREV_MONTH});
export const handleNextMonth = () => ({ type: types.HANDLE_NEXT_MONTH});
  
  export const handleTargetMonth = index => {
    return {
      type: types.HANDLE_TARGET_MONTH,
      index
    }
  }
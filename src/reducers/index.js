import { combineReducers } from 'redux'
import selectedYearMonth from './calendarReducer'

const rootReducer = combineReducers({
    selectedYearMonth
});

export default rootReducer
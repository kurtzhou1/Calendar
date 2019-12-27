import { combineReducers } from 'redux'
import selectedYearMonth from './calendarReducer'
// import selectedPlans from './Plans'

const rootReducer = combineReducers({
    selectedYearMonth,
    // selectedPlans
});

export default rootReducer

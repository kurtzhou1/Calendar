import * as types from "../constants/action-types"

export const prevYearMonth = () => ({ type: types.PREV_YEARMONTH });
export const nextYearMonth = () => ({ type: types.NEXT_YEARMONTH });
export const gotoYearMonth = (yearMonth) => {
  return{ type: types.GOTO_YEARMONTH, yearMonth }};
export const updatePlans = (plans) => ({ type: types.UPDATE_PLANS, plans });

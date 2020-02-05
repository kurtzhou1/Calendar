import React from "react";
import CalendarBody from "./calendarBody";

interface Modle{
  isCalendar:boolean;
  changeModle:() => void;
}

const Modle:React.FC<Modle>= props => {
  const {isCalendar} = props
  return (
    <div className="colume">
      <h2
        className={`title ${isCalendar ? "calendar" : "strip"}`}
        onClick={() => {
          props.changeModle();
        }}>
          {isCalendar ? "切換列表檢視" : "切換月曆檢視"}
        </h2>
      </div>
  );
}
export default Modle
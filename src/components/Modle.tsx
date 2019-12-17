import React from "react";
import CalendarBody from "./calendarBody";

interface Modle{
  isCalendar:boolean;
  changeModle:() => void;
}

class Modle extends React.Component<Modle> {
  
  render() {
    return (
        <div className="colume">
          <h2
            className={`title ${this.props.isCalendar ? "calendar" : "strip"}`}
            onClick={() => {
              this.props.changeModle();
            }}>
            {this.props.isCalendar ? "切換列表檢視" : "切換月曆檢視"}
          </h2>
        </div>
    );
  }
}
export default Modle
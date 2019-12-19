import React, { Component } from "react";
import * as moment from "moment";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      thisYear: 2020,
      thisMonth: 1,
      hasData: "",
      className: 'Calendar'
    };
  }

  getMonthDays = () => {
    //根據年月取得當月的天數
    let year = this.state.thisYear;
    let month = this.state.thisMonth;
    let getDays = new Date(year, month, 0);
    return getDays.getDate();
  };

  getFirstDayWeek = () => {
    //找到第一天為星期幾
    let year = this.state.thisYear;
    let month = this.state.thisMonth;
    let date = new Date(year + "/" + month + "/1");
    let weekday = date.getDay();
    return weekday;
  };

  handLeft = () => {
    let prevMonth = parseInt(this.state.thisMonth) - 1;
    let thisYear = parseInt(this.state.thisYear);
    if (prevMonth < 1) {
      thisYear--;
      prevMonth = 12;
    }
  
    this.setState({
      thisYear: thisYear,
      thisMonth: prevMonth,
      });
  
  };
  handRight = () => {
    let nextMonth = parseInt(this.state.thisMonth) + 1;
    let thisYear = parseInt(this.state.thisYear);
    if (nextMonth > 12) {
      thisYear++;
      nextMonth = 1;
    }
    this.setState({
      thisYear: thisYear,
      thisMonth: nextMonth,
    });
  }
  
  render(){
    console.log('here:::',this.getMonthDays(),this.getFirstDayWeek())
    const {className, week} = this.state; 
    let firstDayWeek = this.getFirstDayWeek();
    let getDays = this.getMonthDays();
    let lackDays = 42 - getDays - firstDayWeek;
    let prevLackDays = [];
    let restLackDays = [];
    let date = [];
    for (let i = 0; i < firstDayWeek; i++) {
      prevLackDays[i] = i;
    }
    for (let i = 0; i < lackDays; i++) {
      restLackDays[i] = i;
    }
    for (let i = 0; i < getDays; i++){
      date[i] = i+1;
    }
    let prevLackBlock = prevLackDays.map(() => {
      return (
        <div
          className={`block ${this.props.calendar ? "calendarMoudle" : "stripMoudle"}`}
        ></div>
      );
    });
    let restLackBlock = restLackDays.map(() => {
      return (
        <div
          className={`block ${this.props.calendar ? "calendarMoudle" : "stripMoudle"}`}
        ></div>
      );
    });
    let dateBlock = date.map(i=>{
      return (
        <div
          className={`date ${this.props.calendar ? "calendarMoudle" : "stripMoudle"}`}
      >{i}</div>
      );
    })
    let weekday = week.map(i=>{
    return <div className={`week ${this.props.calendar ? "calendarMoudle" : "stripMoudle"}`}>{i}</div>
    })
    return(
        <div className={`${className} wrapper`}>
          {weekday}
          {prevLackBlock}
          {dateBlock}
          {restLackBlock}
        </div>
    )
  }

  
}


export default Calendar;

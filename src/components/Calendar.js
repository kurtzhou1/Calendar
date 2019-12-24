import React, { Component } from "react";


import * as actions from "../actions/tabsAction";
import { connect } from "react-redux";
import Tabs from "./Tabs";

class Calendar extends Component {
  constructor(props) {
    super(props);
    const selectedYearMonth = this.props.thisYearMonth;
    const prevMonth = selectedYearMonth.clone().subtract(1, "month");
    const nextMonth = selectedYearMonth.clone().add(1, "month");
    this.state = {
      months: [prevMonth,selectedYearMonth,nextMonth],
      week: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      // thisYear: 2020,
      // thisMonth: 1,
      hasData: "",
      className: 'Calendar',
      thisYear: selectedYearMonth.format('YYYY'),
      thisMonth: selectedYearMonth.format('MM')
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

  prevMonth = () => {
    this.props.prevYearMonth();
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
    // <Tabs
    //   months={months}
    //   mMonth={mMonth}
    //   targetMonth={targetMonth}
    //   handlePrevMonth={handlePrevMonth}
    //   handleNextMonth={handleNextMonth}
    //   handleTargetMonth={handleTargetMonth}
    // />
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
             <div className="headerborder">
                <div className="arrow left">
                  <span
                    className="triangle-left"
                    onClick={() => 
                      this.prevMonth()}
                  ></span>
                </div>
                <ul className="ntb">
                  {
                    this.state.months.map(month => {
                      return <li
                            className={"tab title" + (month.isSame(this.props.selectedYearMonth) ? " now" : " now")}
                            key={month.format('YYYY MM')}>
                            <a href="#" onClick={() => this.updateYearMonth(month)}><span>{month.format('YYYY MMM')}</span></a>
                      </li>
                    })
                  }
                </ul>
                {/* <div className="arrow right">
                  <span
                    className="triangle-right"
                    onClick={() => 
                      this.handRight()}
                  ></span>
                </div> */}
            </div>
          {weekday}
          {prevLackBlock}
          {dateBlock}
          {restLackBlock}
        </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    // selectedYearMonth: state.selectedYearMonth,
    thisYearMonth: state.thisYearMonth
  };
};

const mapDispatchToProps = {
  nextYearMonth: actions.handleNextMonth,
  prevYearMonth: actions.handlePrevMonth
};

export default connect(mapStateToProps,mapDispatchToProps)(Calendar);

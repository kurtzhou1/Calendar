import React, { Component } from "react";

import * as actions from "../actions/tabsAction";
import { connect } from "react-redux";
import moment from "moment";

class Calendar2 extends Component {
  constructor(props) {
    super(props);
    const selectedYearMonth = moment(props.initYearMonth,'YYYYMM');
    const prevMonth = selectedYearMonth.clone().subtract(1, "month");
    const nextMonth = selectedYearMonth.clone().add(1, "month");
    console.log('selectedYearMonth:::',props.initYearMonth,prevMonth,nextMonth)
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
      months: [prevMonth,selectedYearMonth,nextMonth],
      className: 'Calendar',
      thisYear: selectedYearMonth.format('YYYY'),
      thisMonth: selectedYearMonth.format('MM')
    };
    props.gotoYearMonth(selectedYearMonth);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.selectedYearMonth === this.props.selectedYearMonth) {
        return;
    }

    // const { selectedYearMonth } = this.props;

    // if (selectedYearMonth.format("YYYYMM") !== this.state.yearMonthList[0] &&
    //     selectedYearMonth.format("YYYYMM") !== this.state.yearMonthList[this.state.yearMonthList.length - 1]
    // ) {
    //     let prevMonth = selectedYearMonth.clone().subtract(1, "month");
    //     let nextMonth = selectedYearMonth.clone().add(1, "month");
    //     this.setState({months: [prevMonth, selectedYearMonth, nextMonth]});
    // }

    // this.props.updatePlans(this.state.plans.get(selectedYearMonth.format("YYYYMM")));
}

  updateYearMonth(currentYearMonth) {
    console.log('momo::',currentYearMonth)
    this.props.gotoYearMonth(currentYearMonth);
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

  prevYearMonth = () => {
    let { selectedYearMonth } = this.props 
    let prevMonth = selectedYearMonth.clone().subtract(1, "month");
    let nextMonth = selectedYearMonth.clone().add(1, "month");
    this.props.prevYearMonth();
    this.setState({
      thisYear:selectedYearMonth.format('YYYY'),
      thisMonth:selectedYearMonth.format('MM'),
      months: [prevMonth, selectedYearMonth, nextMonth]
    })
  };

  nextYearMonth = () => {
    let { selectedYearMonth } = this.props 
    let prevMonth = selectedYearMonth.clone().subtract(1, "month");
    let nextMonth = selectedYearMonth.clone().add(1, "month");
    this.props.nextYearMonth();
    this.setState({
      thisYear:this.props.selectedYearMonth.format('YYYY'),
      thisMonth:this.props.selectedYearMonth.format('MM'),
      months: [prevMonth, selectedYearMonth, nextMonth]
    })
}
  
  render(){
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
                      this.prevYearMonth()}
                  ></span>
                </div>
                <ul className="ntb">
                  {
                    this.state.months.map(month => {
                      return <li
                            className={"tab title" + (month.isSame(this.props.selectedYearMonth) ? " now" : " null")}
                            key={month.format('YYYY MM')}>
                            <a href="#" onClick={() => this.updateYearMonth(month)}><span>{month.format('YYYY MM')}</span></a>
                      </li>
                    })
                  }
                </ul>
                <div className="arrow right">
                  <span
                    className="triangle-right"
                    onClick={() => 
                      this.nextYearMonth()}
                  ></span>
                </div>
            </div>
          <div className='CalendarGrid'>
          {weekday}
          {prevLackBlock}
          {dateBlock}
          {restLackBlock}
          </div>
        </div>

    )
  }
}

const mapStateToProps = state => {
  return {
      // selectedPlans: state.selectedPlans,
      selectedYearMonth: state.selectedYearMonth
  };
};

const mapDispatchToProps = {
  nextYearMonth: actions.nextYearMonth,
  prevYearMonth: actions.prevYearMonth,
  gotoYearMonth: actions.gotoYearMonth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar2);


import React, { Component } from "react";
import "./index.scss";

class CalendarBody extends Component {
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
      year: 2017,
      month: 1,
      Fyear: 2016,
      Fmonth: 12,
      Byear: 2017,
      Bmonth: 2,
      JsonData1: ""
    };
    this.calendarData = null;
  }
  // state = {
  //   week: [
  //     "星期日",
  //     "星期一",
  //     "星期二",
  //     "星期三",
  //     "星期四",
  //     "星期五",
  //     "星期六"
  //   ],
  //   year: 2017,
  //   month: 1,
  //   Fyear: 2016,
  //   Fmonth: 12,
  //   Byear: 2017,
  //   Bmonth: 2,
  //   JsonData1: ""
  // };

  componentDidMount() {
    const { JsonData1 } = this.state;
    // fetch("../data1.json")
    fetch("./data1.json", { method: "GET" })
      .then(response => {
        console.log("123", response);
        // 可以透過 blob(), json(), text() 轉成可用的資訊
        return response.json();
      })
      .then(JsonData1 => {
        // console.log("456", JsonData1);
        this.calendarData = JsonData1;
        this.setState({
          init: true
        });
      });
  }

  getMonthDays = () => {
    //根據年月取得當月的天數

    let year = this.state.year;
    let month = this.state.month;
    let temp = new Date(year, month, 0);
    return temp.getDate();
  };

  getFirstDayWeek = () => {
    //第一天為year,month,1
    let year = this.state.year;
    let month = this.state.month;
    let dt = new Date(year + "/" + month + "/1");
    let weekday = dt.getDay();
    console.log("CCCC", dt.getDate());
    console.log("DDDD", dt.getMonth() + 1);
    return weekday;
  };
  handLeft = () => {
    let newMonth = parseInt(this.state.Fmonth) - 1;
    let year = this.state.Fyear;
    if (newMonth < 1) {
      year--;
      newMonth = 12;
    }
    this.setState({
      Bmonth: this.state.month,
      Byear: this.state.year,
      month: this.state.Fmonth,
      year: this.state.Fyear,
      Fmonth: newMonth,
      Fyear: year
    });
  };
  handRight = () => {
    let newMonth = parseInt(this.state.Bmonth) + 1;
    let year = this.state.Byear;
    if (newMonth > 12) {
      year++;
      newMonth = 1;
    }
    this.setState({
      Fmonth: this.state.month,
      Fyear: this.state.year,
      year: this.state.Byear,
      month: this.state.Bmonth,
      Bmonth: newMonth,
      Byear: year
    });
  };

  render() {
    const { week, year, month, Fyear, Fmonth, Byear, Bmonth, dt } = this.state;
    console.log("ddtt");
    this.calendarData && console.log("dt", this.calendarData);
    let array1 = [];
    let array2 = [];
    let array3 = [];
    let getDays = this.getMonthDays(),
      FirstDayWeek = this.getFirstDayWeek();
    let lack = 42 - getDays - FirstDayWeek;
    console.log("BBBB", getDays, FirstDayWeek, dt);
    for (let i = 0; i < FirstDayWeek; i++) {
      console.log(i);
      array1[i] = i;
    }
    for (let i = 0; i < getDays; i++) {
      array2[i] = i + 1;
    }
    for (let i = 0; i < lack; i++) {
      array3[i] = i;
    }

    console.log(array1, array2);
    let node1 = array1.map(() => {
      return <div className="currentday block"></div>;
    });
    let node2 = array2.map(item => {
      return (
        <div className="currentday">
          <span className="date">{item}</span>
        </div>
      );
    });
    let node3 = array3.map(() => {
      return <div className="currentday block"></div>;
    });

    return (
      <React.Fragment>
        <div className="wrap">
          <div className="headerborder">
            <div className="arrow left">
              <span
                className="triangle-left"
                onClick={() => {
                  this.handLeft();
                }}
              ></span>
            </div>
            <div className="ntb">
              <div
                className="title"
                onClick={() => {
                  this.handLeft();
                }}
              >{`${Fyear} ${Fmonth}月`}</div>
              <div className="title now">{`${year} ${month}月`}</div>
              <div
                className="title"
                onClick={() => {
                  this.handRight();
                }}
              >{`${Byear} ${Bmonth}月`}</div>
            </div>
            <div className="arrow right">
              <span
                className="triangle-right"
                onClick={() => {
                  this.handRight();
                }}
              ></span>
            </div>
          </div>
          <div className="main table">
            {week.map(ele => {
              return <div className="week">{ele}</div>;
            })}
            {node1}
            {node2}
            {node3}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarBody;

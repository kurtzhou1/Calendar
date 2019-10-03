import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

class CalendarBody extends Component {
  state = {
    week: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ],
    year: 2019,
    month: 1
  };

  componentDidMount() {}

  getMonthDays = () => {
    const { year, month } = this.state;
    let temp = new Date(year, month, 0);
    return temp.getDate();
  };

  render() {
    const { week, year, month } = this.state;

    console.log();
    //根據年月取得當月的天數
    let dt = new Date(year + "/" + month + "/1");
    //第一天為year,month,1
    let weekday = dt.getDay();
    console.log(weekday);

    return (
      <React.Fragment>
        <table>
          <tr>
            {week.map(ele => {
              return <td>{ele}</td>;
            })}
          </tr>
        </table>
      </React.Fragment>
    );
  }
}

export default CalendarBody;

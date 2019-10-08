import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import CalendarBody from "./components/calendarBody";
import * as moment from "moment";

class Calendar extends React.Component {
  state = {
    ary1: "",
    ary2: "",
    ary3: "",
    ary4: "",
    calendar: false
  };
  componentDidMount = async () => {
    const data1 = await fetch("./data1.json").then(response => response.json());
    const data2 = await fetch("./data2.json").then(response => response.json());
    const data3 = await fetch("./data3.json").then(response => response.json());
    const data4 = await fetch("./data4.json").then(response => response.json());
    const set1 = new Set();
    const set2 = new Set();
    const set3 = new Set();
    const set4 = new Set();
    const array1 = data1.filter(item =>
      !set1.has(item.date) ? set1.add(item.date) : false
    );
    const array2 = data2.filter(item =>
      !set2.has(item.date) ? set2.add(item.date) : false
    );
    const array3 = data3.filter(item =>
      !set3.has(item.date) ? set3.add(item.date) : false
    );
    const array4 = data4.filter(item =>
      !set4.has(item.date) ? set4.add(item.date) : false
    );
    this.setState({ ary1: array1, ary2: array2, ary3: array3, ary4: array4 });
  };

  // handleFilterUpdate = (filterYear, filterMonth) => {
  //   this.setState({
  //     year: 2019,
  //     month: 1
  //   });
  // };
  calendar = () => {
    this.setState({
      calendar: !this.state.calendar
    });
  };

  render() {
    const props = {
      // 資料來源的輸入接口 [ array | string ] 如果是 string的話，請輸入網址
      dataSource: {
        guaranteed: true, // {boolean}
        date: "2016/12/15", // {string} YYYY/MM/DD
        price: "234567", // {string|number} XXXXXX | 近期上架
        availableVancancy: 0, // {number}
        totalVacnacy: 20, // {number}
        status: "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
      },
      // 輸入一開始要在哪一個月份 [string] YYYYMM，若輸入的年月沒有資料，
      // 就要找相近的年月，若前一個月後一個月都有資料，就顯示資料比數比較多的那一個月
      initYearMonth: "201709",
      // 設定各資料的key
      calendarData1: this.state.ary1,
      calendarData2: this.state.ary2,
      calendarData3: this.state.ary3,
      calendarData4: this.state.ary4,
      calendar: this.state.calendar
    };
    console.log(this.props.initYear);
    // console.log("CData2", this.state.ary);

    return (
      <React.Fragment>
        <div className="colume">
          <h2
            className={`title ${this.state.calendar ? "calendar" : "strip"}`}
            onClick={() => {
              this.calendar();
            }}
          >
            切換列表顯示
          </h2>
        </div>
        <CalendarBody {...props} />
      </React.Fragment>
    );
  }
}
ReactDOM.render(<Calendar />, document.getElementById("root"));

serviceWorker.unregister();

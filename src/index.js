import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import CalendarBody from "./components/calendarBody";

class Calendar extends React.Component {
  componentDidMount() {}
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
      }
    };
    let array1 = [];
    let array2 = [];
    console.log(CalendarBody.temp.getDate());
    return (
      <React.Fragment>
        <div className="colume">
          <h2 className="title">低價月曆</h2>
        </div>
        <CalendarBody {...props} />
      </React.Fragment>
    );
  }
}
ReactDOM.render(<Calendar />, document.getElementById("root"));

serviceWorker.unregister();

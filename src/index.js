import React from "react";
import ReactDOM from "react-dom";

//第一次撰寫
import CalendarBody from "./components/calendarBody";
import "./styles/style.scss";
import * as moment from "moment";

//第二次撰寫(redux)
import Modle from "./components/Modle";
import Calendar2 from "./components/Calendar2";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index.tsx';
// import store from './store/configureStore';

//第三次撰寫(Hook)
import Calendar3 from "./components/Calendar";
import data from "./data/data2.json"

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  class App extends React.Component {
  state = {
    ary1: "",
    ary2: "",
    ary3: "",
    ary4: "",
    isCalendar: false
  };
  componentDidMount = async () => {
    const data1 = await fetch("./data/data1.json").then(response => response.json());
    const data2 = await fetch("./data/data2.json").then(response => response.json());
    const data3 = await fetch("./data/data3.json").then(response => response.json());
    const data4 = await fetch("./data/data4.json").then(response => response.json());
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

  changeModle = () => {
    this.setState({
      isCalendar: !this.state.isCalendar
    });
  };

  render() {
    const { ary1, ary2, ary3, ary4 } = this.state;
    //calendar3資料處理
    const set = new Set();
    const calendar3Data = data.filter(item => !set.has(item.date) ? set.add(item.date):false)

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
      initYearMonth: "201711",
      // 設定各資料的key
      dataKeySetting: {
        // 保證出團
        guaranteed: "certain",
        // 狀態
        status: "state",
        // 可賣團位
        available: "onsell",
        // 團位
        total: "total",
        // 價格
        price: "price"
      },
      calendarData: calendar3Data,
      calendar: this.state.isCalendar
    };
 
    return (
        <Provider store={store}>
      <div>
        <Modle isCalendar={this.state.isCalendar} changeModle={this.changeModle}/>
        <Calendar3 {...props}/>
      </div>
        </Provider>
        // <Provider store={store}>
        //   <Modle isCalendar={this.state.isCalendar} changeModle={this.changeModle}/>
        //   <CalendarBody {...props}/>
        //   <div className='currentday'>我是分隔線</div>
        //   <Calendar2 {...props}/>
        // </Provider>
    )
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

import React, { Component } from "react";
import "./index.scss";
import * as moment from "moment";

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
      end: false,
      endL: false,
      endR: false,
      hasData: "",
      click: false
    };
  }

  componentDidMount() {
    const Y = parseInt(
      moment(this.props.initYearMonth, "YYYYMM").format("YYYY")
    );
    const M = parseInt(moment(this.props.initYearMonth, "YYYYMM").format("MM"));
    let FM = M - 1;
    let FY = Y;
    let BM = M + 1;
    let BY = Y;
    if (BM > 12) {
      BY++;
      BM = 1;
    }
    if (FM < 1) {
      FY--;
      FM = 12;
    }
    this.setState({
      year: Y,
      month: M,
      Fyear: FY,
      Fmonth: FM,
      Byear: BY,
      Bmonth: BM
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
    // console.log("CCCC", dt.getDate());
    // console.log("DDDD", dt.getMonth() + 1);
    return weekday;
  };

  handLeft = () => {
    const { Fmonth } = this.state;
    let newMonth = parseInt(Fmonth) - 1;
    let year = this.state.Fyear;
    if (newMonth < 1) {
      year--;
      newMonth = 12;
    }

    let tmpAry =
      this.props.calendarData &&
      this.props.calendarData.map(ele => {
        let dtyear = parseInt(moment(ele.date).format("YYYY"));
        let dtmonth = parseInt(moment(ele.date).format("MM"));
        return {
          ddtyear: dtyear,
          ddtmonth: dtmonth
        };
      });

    let minYear = Math.min(...tmpAry.map(p => p.ddtyear));
    let tmpAry2 = tmpAry.filter(p => p.ddtyear === minYear);
    let minMonth = Math.min(...tmpAry2.map(p => p.ddtmonth)) - 1;
    console.log(year, minYear, newMonth, minMonth, Fmonth);
    if (year <= minYear && newMonth <= minMonth) {
      this.setState({
        endL: true,
        end: true
      });
    } else if (year >= minYear && newMonth >= 1) {
      this.setState({
        Bmonth: this.state.month,
        Byear: this.state.year,
        month: this.state.Fmonth,
        year: this.state.Fyear,
        Fmonth: newMonth,
        Fyear: year,
        end: false,
        endR: false,
        endL: false
      });
    }
  };
  handRight = () => {
    const { Bmonth } = this.state;
    let newMonth = parseInt(this.state.Bmonth) + 1;
    let year = this.state.Byear;
    if (newMonth > 12) {
      year++;
      newMonth = 1;
    }

    let tmpAry =
      this.props.calendarData &&
      this.props.calendarData.map(ele => {
        let dtyear = parseInt(moment(ele.date).format("YYYY"));
        let dtmonth = parseInt(moment(ele.date).format("MM"));
        let dtday = parseInt(moment(ele.date).format("DD"));
        return {
          ddtyear: dtyear,
          ddtmonth: dtmonth,
          ddtday: dtday
        };
      });
    let maxYear = Math.max(...tmpAry.map(p => p.ddtyear));
    let tmpAry2 = tmpAry.filter(p => p.ddtyear === maxYear);
    let maxMonth = Math.max(...tmpAry2.map(p => p.ddtmonth));
    console.log(year, maxYear, newMonth, maxMonth, Bmonth);
    if (year > maxYear || Bmonth > maxMonth) {
      this.setState({
        endR: true,
        end: true
      });
    } else if (year <= maxYear && newMonth <= maxMonth) {
      this.setState({
        Fmonth: this.state.month,
        Fyear: this.state.year,
        year: this.state.Byear,
        month: this.state.Bmonth,
        Bmonth: newMonth,
        Byear: year,
        end: false,
        endL: false,
        endR: false
      });
    }
  };

  click = date => {
    this.setState({
      clickDate: date
    });
  };

  render() {
    const {
      week,
      year,
      month,
      Fyear,
      Fmonth,
      Byear,
      Bmonth,
      endR,
      endL,
      end
    } = this.state;

    const { calendar } = this.props;
    // console.log(
    //   "GG",
    //   parseInt(moment(this.props.initYearMonth, "YYYYMM").format("MM")),
    //   this.state.year
    // );

    // let dtdt = moment("2019/10/5").format("YYYY");
    // this.props.calendarData &&
    //   this.props.calendarData.map(ele => {
    //     let dtyear = moment(ele.date).format("YYYY");
    //     let dtmonth = moment(ele.date).format("MM");
    //     let dtday = moment(ele.date).format("DD");
    //   });

    // console.log("IIII", this.props.calendarData);
    let array1 = [];
    let array2 = [];
    let array3 = [];
    let getDays = this.getMonthDays(),
      FirstDayWeek = this.getFirstDayWeek();
    let lack = 42 - getDays - FirstDayWeek;
    // console.log("BBBB", getDays, FirstDayWeek, dt);
    for (let i = 0; i < FirstDayWeek; i++) {
      // console.log(i);
      array1[i] = i;
    }

    for (let i = 0; i < lack; i++) {
      array3[i] = i;
    }

    for (let i = 0; i < getDays; i++) {
      array2[i] = i + 1;
    }

    // console.log(array1, array2);
    let node1 = array1.map(() => {
      return (
        <div
          className={`currentday block ${calendar ? "calendar" : "strip"}`}
        ></div>
      );
    });

    // this.props.calendarData &&
    // this.props.calendarData.map(ele => {
    //   let dtyear = moment(ele.date).format("YYYY");
    //   let dtmonth = moment(ele.date).format("MM");
    //   let dtday = moment(ele.date).format("DD");
    //   return (
    //     <React.Fragment>
    //       <div className={`${ele.guaranteed ? "guaranteed" : ""}`}>{`${
    //         ele.guaranteed ? "成團" : ""
    //       }`}</div>
    //       <div className="status">{ele.status}</div>
    //       <div className="availableVancancy">
    //         可賣：{ele.availableVancancy}
    //       </div>
    //       <div className="totalVacnacy">團位：{ele.totalVacnacy}</div>
    //       <div className="price">{ele.price}</div>
    //     </React.Fragment>
    //   );
    // });

    // let node2 = array2.map(item => {
    //   return (
    //     <div
    //       className={`currentday ${
    //         dtyear === year && dtmonth === month && dtday === item ? "GG" : "HH"
    //       }`}
    //     >
    //       <span className="date">{item}</span>
    //     </div>
    //   );
    // });

    // let node2 = array2.map(item => {
    //   this.props.calendarData &&
    //     this.props.calendarData.map(ele => {
    //       let dtyear = moment(ele.date).format("YYYY");
    //       let dtmonth = moment(ele.date).format("MM");
    //       let dtday = moment(ele.date).format("DD");
    //       // console.log("test1", dtyear, dtmonth, dtday);
    //       // console.log("test2", year, month, item);
    //       if (true) {
    //         return (
    //           <React.Fragment>
    //             {/* <div
    //             className={`currentday ${
    //               dtyear === year && dtmonth === month && dtday === item
    //                 ? "GG"
    //                 : "HH"
    //             }`}
    //           >
    //             <span className="date">{item}</span>
    //           </div> */}
    //             <div>{item}</div>
    //           </React.Fragment>
    //         );
    //       }
    //     });
    // });

    let node3 = array3.map(() => {
      return (
        <div
          className={`currentday block ${calendar ? "calendar" : "strip"}`}
        ></div>
      );
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
                className={`title ${endL ? "end" : ""}`}
                onClick={() => {
                  this.handLeft();
                }}
              >{`${Fyear} ${Fmonth}月`}</div>
              <div
                className={`title now ${end ? "end" : ""}`}
              >{`${year} ${month}月`}</div>
              <div
                className={`title ${endR ? "end" : ""}`}
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
          <div className={`main table ${calendar ? "calendar" : "strip"}`}>
            {week.map(ele => {
              return <div className="week">{ele}</div>;
            })}
          </div>
          <div className="second table">
            {node1}
            {array2.map(item => {
              if (calendar) {
                return (
                  <div
                    className={`currentday ${calendar ? "calendar" : "strip"} ${
                      this.state.clickDate === `${year}/${month}/${item}`
                        ? "click"
                        : ""
                    }`}
                  >
                    <span className="date">{item}</span>
                    {this.props.calendarData &&
                      this.props.calendarData.map(ele => {
                        let dtyear = parseInt(moment(ele.date).format("YYYY"));
                        let dtmonth = parseInt(moment(ele.date).format("MM"));
                        let dtday = parseInt(moment(ele.date).format("DD"));
                        const aryPrice = parseFloat(ele.price).toLocaleString();
                        if (
                          dtyear === year &&
                          dtmonth === month &&
                          dtday === item
                        ) {
                          return (
                            <React.Fragment>
                              {/* classnmae={`${calendar ? "calendar" : "strip"}`} */}

                              <div
                                id={`${year}/${month}/${item}`}
                                onClick={e => {
                                  this.click(e.currentTarget.id);
                                  console.log(e.currentTarget.id);
                                }}
                                key={`${year}/${month}/${item}`}
                              >
                                <div
                                  className={`${
                                    ele.guaranteed ? "guaranteed" : ""
                                  } ${ele.certain ? "guaranteed" : ""}`}
                                >{`${ele.guaranteed ? "成團" : ""} ${
                                  ele.certain ? "成團" : ""
                                }`}</div>
                                <div
                                  className={`${
                                    ele.status === "報名"
                                      ? "OGstatus"
                                      : "status"
                                  } ${
                                    ele.state === "報名" ? "OGstatus" : "status"
                                  }`}
                                >
                                  {ele.status}
                                  {ele.state}
                                </div>
                                <div className="availableVancancy">
                                  可賣：{ele.availableVancancy}
                                  {ele.onsell}
                                </div>
                                <div className="totalVacnacy">
                                  團位：{ele.totalVacnacy}
                                  {ele.total}
                                </div>
                                <div className="price">${aryPrice}</div>
                              </div>
                            </React.Fragment>
                          );
                        }
                      })}
                  </div>
                );
              } else {
                return (
                  this.props.calendarData &&
                  this.props.calendarData.map(ele => {
                    let dtyear = parseInt(moment(ele.date).format("YYYY"));
                    let dtmonth = parseInt(moment(ele.date).format("MM"));
                    let dtday = parseInt(moment(ele.date).format("DD"));
                    const aryPrice = parseFloat(ele.price).toLocaleString();
                    if (
                      dtyear === year &&
                      dtmonth === month &&
                      dtday === item
                    ) {
                      return (
                        <React.Fragment>
                          <div
                            className={`currentday2 ${
                              this.state.clickDate ===
                              `${year}/${month}/${item}`
                                ? "click"
                                : ""
                            }`}
                            id={`${year}/${month}/${item}`}
                            onClick={e => {
                              this.click(e.currentTarget.id);
                              console.log(e.currentTarget.id);
                              console.log(
                                "TEST2",
                                week[new Date(Fyear, Fmonth, item).getDay()]
                              );
                            }}
                            key={`${year}/${month}/${item}`}
                          >
                            <span className="date">{item}</span>
                            <div className="week2">
                              {week[new Date(Fyear, Fmonth, item).getDay()]}
                            </div>
                            <div
                              className={`${
                                ele.guaranteed ? "guaranteed" : ""
                              } ${ele.certain ? "guaranteed" : ""}`}
                            >{`${ele.guaranteed ? "成團" : ""} ${
                              ele.certain ? "成團" : ""
                            }`}</div>
                            <div
                              className={`${
                                ele.status === "報名" ? "OGstatus" : "status"
                              } ${
                                ele.state === "報名" ? "OGstatus" : "status"
                              }`}
                            >
                              {ele.status}
                              {ele.state}
                            </div>
                            <div className="availableVancancy">
                              可賣：{ele.availableVancancy}
                              {ele.onsell}
                            </div>
                            <div className="totalVacnacy">
                              團位：{ele.totalVacnacy}
                              {ele.total}
                            </div>
                            <div className="price">${aryPrice}</div>
                          </div>
                        </React.Fragment>
                      );
                    }
                  })
                );
              }
            })}

            {node3}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarBody;

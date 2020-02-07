import * as React from 'react';
import * as moment from "moment";

export interface plan {
    date:moment.Moment;
    guaranteed: boolean;
    status: string;
    available: number;
    total: number;
    price: number;
}

export interface IProps{
    initYearMonth?: string;
    selectedYearMonth:moment.Moment;
    getDays: number;
    lackDays: number;
    firstDayWeek: number;
    selectedPlans: plan | any ;
}

const CalendarGrid:React.FC<IProps> = props => {
    const {getDays,lackDays,firstDayWeek,selectedPlans } = props

    let week= ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
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

    let prevLackBlock = prevLackDays.map(() =><div className="block calendarMoudle"></div>)
    let restLackBlock = restLackDays.map(() =><div className="block calendarMoudle"></div>);
    let dateBlock = date.map(date1=>{
        return(
        <div className="date calendarMoudle" key={date1}>{date1}{selectedPlans.map((date2:any)=>{
            if(date1 === parseInt(date2.date.format('DD'))){                
                return(
                <div className="day">
                    <div className={date2.guaranteed ? "guaranteed" : ""}>{date2.guaranteed ? "成團" : "閉團"}</div>
                    <div className={date2.status === "報名" ? "OGstatus" : "status"}>{date2.status}</div>
                    <div className="availableVancancy">可賣:{date2.available}</div>
                    <div className="totalVacnacy">團位:{date2.total}</div>
                    <div className="price">${date2.price}</div>
                </div>
                )
        }})}</div>
            )})
    let weekBlock = week.map(i=><div className="week calendarMoudle">{i}</div>) 
    return (
        <div className='CalendarGrid'>
            {weekBlock}{prevLackBlock}{dateBlock}{restLackBlock}
        </div>
    );
    
}

export default CalendarGrid;
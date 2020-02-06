import React from 'react';
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
    selectedPlans: plan | any;
}

const  CalendarList:React.FC<IProps> = props =>{
    const { selectedPlans }=props
    const week= ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
    let dataBlock = selectedPlans.map((item:any) =>{
        return(
        <div className='currentday2'>
            <span className="date">{new Date(item.date.format('YYYY/MM/DD')).getDate()}</span>
            <div className="week2"> {week[new Date(item.date.format('YYYY/MM/DD')).getDay()]}</div>
            <div className={item.guaranteed ? "guaranteed" : "closed"}>{item.guaranteed ? "成團" : "閉團"}</div>
            <div className={item.status === "報名" ? "OGstatus" : "status"}>{item.status}</div>
            <div className='availableVancancy'>可賣：{item.available}</div>
            <div className='totalVacnacy'>團位：{item.total}</div>
            <div className='price'>${item.price}</div>
        </div>
        )})

    return (<div className='currentday2'>{dataBlock}</div>)
}

export default CalendarList;
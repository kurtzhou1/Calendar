import React, { useState } from 'react';
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
    const { selectedPlans } = props
    const week= ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
    const PLANS_PER_PAGE = 7;
    const totalPages = Math.ceil(selectedPlans.length/PLANS_PER_PAGE)
    const [currentPage , changePage] = useState(1)
    const begin = (currentPage-1) * PLANS_PER_PAGE
    const [showPlans , changePlans] = useState(props.selectedPlans.slice(begin, PLANS_PER_PAGE * currentPage))
    console.log('hello',totalPages,currentPage)
    // if(Array.isArray(selectedPlans)){
    //     const totalPages = Math.ceil(selectedPlans.length/PLANS_PER_PAGE)
    //     const showPlans = [...selectedPlans.slice(0, PLANS_PER_PAGE)]
    //     return{totalPages:totalPages,showPlans:showPlans}
    // }
    // 防呆：檢查近來資料是否為Array
    React.useEffect(()=>{
        changePlans(props.selectedPlans.slice(begin, PLANS_PER_PAGE * currentPage))
    },[currentPage])

    const changePrevPage = () => changePage(currentPage-1)
    const changeNextPage = () => changePage(currentPage+1)
    
    //數字index


    let dataBlock = showPlans.map((item:any) =>{
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

    return (
    <div className='currentday2'>
        {dataBlock}
        {(currentPage - 1) !== 0 ? <div className='prevPage' onClick={changePrevPage}>上一頁</div>
        : false}
        {currentPage !== totalPages ? <div className='nextPage' onClick={changeNextPage}>下一頁</div>
        : false}
    </div>)
}

export default CalendarList;
import * as React from 'react';
import moment from "moment";
import CalendarGrid from './CalendarGrid';

export interface dataSource{
    guaranteed: boolean
    date: string
    price: string | number
    availableVancancy: number
    totalVacnacy: number
    status: string
}

export interface dataKeySetting{
    guaranteed: string
    status: string
    available: string
    total:string
    price: string
}

export interface IProps{
    dataSource:dataSource
    initYearMonth: string
    dataKeySetting:dataKeySetting
    calendar: boolean
    calendarData: object
}


const Calendar3:React.FC<IProps> = props => {
    const [selectedYearMonth,changeMonth] = React.useState(moment(props.initYearMonth,'YYYYMM'))
    const prevMonth = selectedYearMonth.clone().subtract(1,'month');
    const nextMonth = selectedYearMonth.clone().add(1,'month');
    const months = [prevMonth,selectedYearMonth,nextMonth]
    const dataKey = props.dataKeySetting
    
    //資料處理
    const processDataSource = (data:any) => {
        let plans = new Map()
        data.forEach((item:any) => {
            const yearMonth = moment(item.date,'YYYY/MM/DD').format('YYYYMM')
            const plan = {
                date: moment(item.date, 'YYYY/MM/DD'),  //時間
                guaranteed: item[dataKey.guaranteed],  //保證出團
                status: item[dataKey.status],          //狀態
                available: item[dataKey.available],    //可賣團位
                total: item[dataKey.total],            //團位
                price: item[dataKey.price]             //價格
            }
            if(plans.get(yearMonth) === undefined){
                plans.set(yearMonth,[plan])
            }else{
                plans.set(yearMonth,[...plans.get(yearMonth), plan])
            }
        //將相同年月的出團資料彙整在一起
        })
        plans.forEach((values, _) => values.sort((plan1:any, plan2:any) => {
            if (plan1.date.isSame(plan2.date)) {
                return 0;
            } else if (plan1.date.isAfter(plan2.date)) {
                return 1;
            } else {
                return -1;
            }
        }));
        //排列當月的日的順序，小的在前面
        return plans;
    }

    let plans =  processDataSource(props.calendarData)
    const [selectedPlans,changePlan] = React.useState(plans.get(props.initYearMonth))
    console.log('1',moment(props.initYearMonth,'YYYYMM'),'2',selectedYearMonth)

    React.useEffect(()=>{
        if(moment(props.initYearMonth,'YYYYMM') !== selectedYearMonth){
       console.log('hello')
        }
    },[])

    const arrowLeft =  (
    <div className="arrow left">
        <span className="triangle-left"
            onClick={()=>changeMonth(selectedYearMonth.clone().subtract(1,'month'))}
        ></span>
    </div>)

    const arrowRight = (
        <div className="arrow right">
            <span className="triangle-right"
            onClick={()=>changeMonth(selectedYearMonth.clone().add(1,'month'))}
            ></span>
        </div>
    )

    const ntb = (
        <div><ul className="ntb">{months.map(month=>{
            return (<li className={"tab title"+(month === selectedYearMonth ? " now" : " null")} key={month.format('YYYY MM')}>
            <span>{month.format('YYYY MM')}</span></li>)
        })}</ul></div>
    )

    return (
    <div className='Calendar wrapper'>
        <div className='headerborder'>
            {arrowLeft}
            {ntb}
            {arrowRight}
        </div>
        {props.calendar ? <CalendarGrid
        selectedYearMonth={selectedYearMonth}
        getDays={selectedYearMonth.daysInMonth()}
        firstDayWeek={selectedYearMonth.day()}
        lackDays={42 - selectedYearMonth.day() - selectedYearMonth.daysInMonth()}
        selectedPlans={selectedPlans}/> :
        '456'}
    </div>
    )
}

export default Calendar3;
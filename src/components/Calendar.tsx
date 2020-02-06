import * as React from 'react';
import moment from "moment";
import CalendarGrid from './CalendarGrid';
import CalendarList from './CalendarList';

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
        console.log([plans])
        return plans;
    }
    let plans:any =  processDataSource(props.calendarData)
    const [selectedPlans,changePlan] = React.useState(plans.get(props.initYearMonth)) //出團資料
    let maxDate = Math.max(...plans.keys())
    let minDate = Math.min(...plans.keys())
    const prevMonth = selectedYearMonth.clone().subtract(1,'month'); //前一個月
    const nextMonth = selectedYearMonth.clone().add(1,'month');      //後一個月
    const months = [prevMonth,selectedYearMonth,nextMonth]
    React.useEffect(()=>{
        changePlan(plans.get(selectedYearMonth.format('YYYYMM')))
        console.log('selectedYearMonth',selectedPlans)
    },[selectedYearMonth])

    const changePrevMonth = () =>(
        parseInt(prevMonth.format('YYYYMM')) < minDate ? changeMonth(selectedYearMonth): changeMonth(selectedYearMonth.clone().subtract(1,'month'))
    ) 
    const arrowLeft = (
        <div className="arrow left">
            <span className="triangle-left"
            onClick={changePrevMonth}></span>
        </div>)
    
    const changeNextMonth = () =>(
        parseInt(nextMonth.format('YYYYMM')) > maxDate ? changeMonth(selectedYearMonth): changeMonth(selectedYearMonth.clone().add(1,'month'))
    )

    const arrowRight = (
        <div className="arrow right">
            <span className="triangle-right"
            onClick={changeNextMonth}></span>
        </div>)
    

    const ntb = (
        <div><ul className="ntb">{months.map(month=>{
            return(
            parseInt(prevMonth.format('YYYYMM')) < minDate || parseInt(nextMonth.format('YYYYMM')) > maxDate ? 
            parseInt(prevMonth.format('YYYYMM')) < minDate ? 
            <li className={"tab title"+(parseInt(month.format('YYYYMM')) < minDate  ? ' now' : ' null')} key={month.format('YYYY MM')}>
                {month === selectedYearMonth ? 
                <span>{month.clone().add(1,'month').format('YYYY MM')}</span> : month === prevMonth ?
                <span onClick={changePrevMonth}>{month.clone().add(1,'month').format('YYYY MM')}</span> :
                <span onClick={changeNextMonth}>{month.clone().add(1,'month').format('YYYY MM')}</span> }
            </li>
            //游標點到擁有資料的最小年月時候
            : 
            <li className={"tab title"+(parseInt(month.format('YYYYMM')) > maxDate  ? ' now' : ' null')} key={month.format('YYYY MM')}>
               {month === selectedYearMonth ? 
               <span>{month.clone().subtract(1,'month').format('YYYY MM')}</span> : month === prevMonth ?
               <span onClick={changePrevMonth}>{month.clone().subtract(1,'month').format('YYYY MM')}</span> :
               <span onClick={changeNextMonth}>{month.clone().subtract(1,'month').format('YYYY MM')}</span> }
            </li>
             //游標點到擁有資料的最大年月時候
                :
            <li className={"tab title"+(month === selectedYearMonth ? ' now' : ' null')} key={month.format('YYYY MM')}>
                {month === selectedYearMonth ? 
                <span>{month.format('YYYY MM')}</span> : month === prevMonth ?
                <span onClick={changePrevMonth}>{month.format('YYYY MM')}</span> :
                <span onClick={changeNextMonth}>{month.format('YYYY MM')}</span> }
            </li>
            )
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
        <CalendarList selectedPlans={selectedPlans}/>}
    </div>
    )
}

export default Calendar3;
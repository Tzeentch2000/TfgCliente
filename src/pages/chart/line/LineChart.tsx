import React, { useEffect, useState } from 'react'
import style from './LineChart.module.scss'
import { LineChartComponent } from '../../../components/UI/chart/line/LineChartComponent'
import { getOrders } from '../../../assets/functions/api';
import { IDataSets, IOrders } from '../../../interfaces/Interfaces';
import { useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { getCookie } from '../../../assets/functions/cookie';
import Alert from '../../../components/UI/Alert/Alert';
import { chartDefaultOptions, colors, filterByYears, months } from '../../../assets/functions/data';
import Filter from '../../../components/UI/Filter/Filter';
import Spinner from '../../../components/UI/spinner/Spinner';

const LineChart = () => {
  const navigation = useNavigation()
  const orders = useLoaderData() as IOrders[]
  const error: any = useActionData()
  const [ years,setYears ] = useState<number[]>([])
  const [ yearsLength, setYearsLength ] = useState(3)
  const [ dataSets, setDataSets ] = useState<IDataSets[]>([])

  useEffect(() => {
    let _years = orders.map(o => Number(o.date.toString().substring(0, 4)))
    _years = _years.filter((year, index) => {
      return _years.indexOf(year) === index;
    });
    _years.sort((a, b) => {
      return a - b;
    });
    console.log(_years)
    const highestYears = _years.slice(-yearsLength);
    setYears(highestYears)
    const formatDataChart = () => {
      let data = []
      for (let i = 0; i < highestYears.length; i++) {
        const dataByYear = []
        const orderByYear = orders.filter(o => Number(o.date.toString().substring(0, 4)) === highestYears[i])
        for (let j = 0; j < 12; j++) {
          let month = orderByYear.reduce((a,b) => {
            let dateSplit = b.date.toString().split('-')
            if(Number(dateSplit[1]) === j+1 && Number(dateSplit[0]) === highestYears[i]){
                return a+b.amount
            }else {
                return a+0
            }
          },0)
          dataByYear.push(month)
        }
        data.push(dataByYear)
      }
      return data
    }
    const dt = formatDataChart()

    const generateDataSets = () => {
      let dts:IDataSets[] = []
      for (let i = 0; i < yearsLength; i++) {
        if(dt[i] !== undefined){
          dts.push( {
            label: `${highestYears[i]}`,
            data: dt[i],
            borderColor: yearsLength === 3 ? colors[i+colors.length-yearsLength] : colors[i],
            backgroundColor: yearsLength === 3 ? colors[i+colors.length-yearsLength] : colors[i],
          })
        }
      }
      return dts
    }
    const gdts = generateDataSets()
    setDataSets(gdts)
  },[yearsLength])

  const showError = error?.length > 0 ? <Alert type='error' message={error} /> : undefined

  let options = chartDefaultOptions

  let labels = months;
  let data = {
    labels,
    datasets: dataSets,
  };

  const onHandleChange = (e:any) => {
    setYearsLength(Number(e.target.value))
  }
  
  return ( navigation.state === 'loading' ? <Spinner /> :
    <div>
      {showError}
      <select onChange={onHandleChange} className={style.select}>
        <option value='3'>highest three years</option>
        <option value='5'>highest five years</option>
      </select>
      <LineChartComponent options={options} data={data} />
    </div>
  )
}

export default LineChart

export async function loader(){
    let error = ''
    const token = getCookie('token')
    if(token === null){
      error = 'Cant load orders'
      return error
    }
    const orders = await getOrders(token)
    if(orders === null) throw { message: 'Could not fetch events' }
    if(Object.values(orders).length === 0){
        throw new Response('',{
            status: 404,
            statusText: 'No hay resultados'
        })
    }
    return orders
}

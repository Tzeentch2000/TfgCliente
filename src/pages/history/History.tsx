import React, { ChangeEvent, useEffect, useState } from 'react'
import style from './History.module.scss'
import Table from '../../components/UI/Table/Table'
import { IFormatedOrders, IOrders } from '../../interfaces/Interfaces'
import { getCookie } from '../../assets/functions/cookie'
import { validateToken } from '../../assets/functions/validation'
import { getOrderByUserId, getOrderByUserIdOrderBy } from '../../assets/functions/api'
import { useLoaderData, useNavigation } from 'react-router-dom'
import Container from '../../components/UI/container/Container'
import PageTitle from '../../components/UI/pageTitle/PageTitle'
import NoElements from '../../components/UI/noElements/NoElements'
import Spinner from '../../components/UI/spinner/Spinner'
import Filter from '../../components/UI/Filter/Filter'
import useAuth from '../../hooks/useAuth'

const History = () => {
  const navigation = useNavigation()
  const orders = useLoaderData() as IOrders[]
  const auth = useAuth()
  const [ stateOrders,setStateOrders ] = useState<IFormatedOrders[]>([])

  const formatOrders = (orders:IOrders[]) => {
    const newOrders = orders.map(o => {
      const totalPrice = (o.book.price * o.amount).toFixed(2)
      const formatDate = new Date(o.date.toString().substring(0, 10))
      return {'id':o.id,'bookName':o.book.name,'amount':o.amount,'date':formatDate.toLocaleDateString('en-US'),'price':`${totalPrice} $`}
    })
    setStateOrders(newOrders)
  }

  useEffect(() => {
    formatOrders(orders)
  },[orders])

  const onHandleChangeOrder = async(event: ChangeEvent<HTMLSelectElement>) => {
    const _token = await getCookie('token')

    if(_token === null) {
      throw { message: 'Token error' }
    }

    const value = (event.target.value).split('-')

    if(value.length === 0){
      const ordersOrderBy = await getOrderByUserId(auth.user.id,_token)
      formatOrders(ordersOrderBy)
      return
    }
    const orderBy = value[0]
    const orderType = value[1]

    const ordersOrderBy = await getOrderByUserIdOrderBy(`?orderBy=${orderBy}&orderType=${orderType}`,auth.user.id,_token)
    formatOrders(ordersOrderBy)
  }

  const table = orders.length > 0 ? 
                <Table th={['Book','Amount','Date','Price']} td={stateOrders} properties={['bookName','amount','date','price']} /> :
                <NoElements text='You dont have any orders' />

  return ( navigation.state === 'loading' ? <Spinner /> :
    <Container>
      <PageTitle title='Orders History' />
      <div className={style.select__container}>
        <label className={style.label}>Order by</label>
        <select className={style.select} onChange={onHandleChangeOrder}>
          <option value=''>none</option>
          <option value='date-ascending'>Oldest date</option>
          <option value='date-descending'>Newest date</option>
          <option value='price-ascending'>Lowest price</option>
          <option value='price-descending'>Highest price</option>
        </select>
      </div>
      {table}
    </Container>
  )
}

export default History

export async function loader(){
  const _token = await getCookie('token')
  const _orders:IOrders[] = await getOrderByUserId(validateToken(_token).id,_token)
  if(_orders === null) throw { message: 'Could not fetch events' }
  return _orders
}

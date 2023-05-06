import React, { useEffect, useState } from 'react'
import style from './History.module.scss'
import Table from '../../components/UI/Table/Table'
import { IFormatedOrders, IOrders } from '../../interfaces/Interfaces'
import { getCookie } from '../../assets/functions/cookie'
import { validateToken } from '../../assets/functions/validation'
import { getOrderByUserId } from '../../assets/functions/api'
import { useLoaderData } from 'react-router-dom'
import Container from '../../components/UI/container/Container'
import PageTitle from '../../components/UI/pageTitle/PageTitle'
import NoElements from '../../components/UI/noElements/NoElements'

const History = () => {
  const orders = useLoaderData() as IOrders[]
  const [ stateOrders,setStateOrders ] = useState<IFormatedOrders[]>([])

  useEffect(() => {
    const formatOrders = (orders:IOrders[]) => {
      const newOrders = orders.map(o => {
        const totalPrice = o.book.price * o.amount
        const formatDate = new Date(o.date.toString().substring(0, 10))
        return {'id':o.id,'bookName':o.book.name,'amount':o.amount,'date':formatDate.toLocaleDateString('en-US'),'price':`${totalPrice} $`}
      })
      setStateOrders(newOrders)
    }
    formatOrders(orders)
  },[orders])

  const edit = (id:string) => {
    console.log(`EDIT ${id}`)
  }

  const table = orders.length > 0 ? 
                <Table th={['Book','Amount','Date','Price']} td={stateOrders} properties={['bookName','amount','date','price']} /> :
                <NoElements text='You dont have any orders' />

/*
editAction={{modalTitle:'Editar history',modalContent:(<p>Esto es el contenido del modal</p>)}} 
deleteAction={(id:string) => {
console.log(`DELETE ${id}`)
}}
*/

  return (
    <Container>
      <PageTitle title='Orders History' />
      {table}
    </Container>
  )
}

export default History

export async function loader(){
  const _token = await getCookie('token')
  const _orders:IOrders[] = await getOrderByUserId(validateToken(_token).id,_token)
  return _orders
}

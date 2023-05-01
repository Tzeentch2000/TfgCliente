import React, { useEffect, useState } from 'react'
import style from './History.module.scss'
import Table from '../../components/UI/Table/Table'
import { IFormatedOrders, IOrders } from '../../interfaces/Interfaces'
import { getCookie } from '../../assets/functions/cookie'
import { validateToken } from '../../assets/functions/validation'
import { getOrderByUserId } from '../../assets/functions/api'
import { useLoaderData } from 'react-router-dom'

const History = () => {
  const orders = useLoaderData() as IOrders[]
  const [ stateOrders,setStateOrders ] = useState<IFormatedOrders[]>([])

  useEffect(() => {
    const formatOrders = (orders:IOrders[]) => {
      const newOrders = orders.map(o => {
        const totalPrice = o.book.price * o.amount
        return {'id':o.id,'bookName':o.book.name,'amount':o.amount,'date':o.date,'price':`${totalPrice} $`}
      })
      setStateOrders(newOrders)
    }
    formatOrders(orders)
  },[orders])

  const edit = (id:string) => {
    console.log(`EDIT ${id}`)
  }

  const table = orders.length > 0 ? 
                <Table th={['Libro','Cantidad','Fecha','Precio']} td={stateOrders} properties={['bookName','amount','date','price']} /> :
                <p className={style.notFound}>You don't have any orders</p>

/*
editAction={{modalTitle:'Editar history',modalContent:(<p>Esto es el contenido del modal</p>)}} 
deleteAction={(id:string) => {
console.log(`DELETE ${id}`)
}}
*/

  return (
    <div className={style.container}>
      <h2>Orders History</h2>
      {table}
    </div>
  )
}

export default History

export async function loader(){
  const _token = await getCookie('token')
  //const _orders:IOrders[] = await getOrderByUserId(validateToken(_token).id,_token)
  const _orders:IOrders[] = await getOrderByUserId(1,_token)
  return _orders
}

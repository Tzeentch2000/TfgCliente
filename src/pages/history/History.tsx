import React from 'react'
import style from './History.module.scss'
import Table from '../../components/UI/Table/Table'

const History = () => {
  const tr = ['A','B','C']
  const data = [{'efe':'estudios','ge':'comida','ah':'juegos'},{'efe':'2311','ge':'aaaaa','ah':'fdsfds'}]
  const properties = ['efe','ge','ah']
  return (
    <div>
      <Table th={tr} td={data} properties={properties} />
    </div>
  )
}

export default History

import React from 'react'
import style from './Filter.module.scss'
import { ICategory, IState } from '../../../interfaces/Interfaces'

type Props = {
    items : (ICategory | IState)[]
}

const Filter = (props:Props) => {
    const { items } = props
  return (
    <select className={style.select}>
      <option value=''>None</option>
      {items.map(item => (
        <option className={style.option} key={item.id.toString()} value={item.id.toString()}>{item.name}</option>
      ))}
    </select>
  )
}

export default Filter

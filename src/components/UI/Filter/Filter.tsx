import React from 'react'
import style from './Filter.module.scss'
import { ICategory, IState } from '../../../interfaces/Interfaces'

type Props = {
    items : (ICategory | IState )[]
    handleChange: (value:string) => Promise<void>
}

const Filter = (props:Props) => {
    const { items,handleChange } = props
  return (
    <select className={style.select}
      onChange={e => handleChange(e.target.value)}
    >
      <option value=''>None</option>
      {items.map(item => (
        <option className={style.option} key={item.id.toString()} value={item.id.toString()}>{item.name}</option>
      ))}
    </select>
  )
}

export default Filter

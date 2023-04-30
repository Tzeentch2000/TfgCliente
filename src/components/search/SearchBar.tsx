import React from 'react'
import style from './SearchBar.module.scss'

type Props = {
  handleChange: (value:string) => void
}

const SearchBar = (props:Props) => {
  const { handleChange } = props
  return (
    <input type='text' className={style.search} placeholder='Search...' onChange={e => handleChange(e.target.value)} />
  )
}

export default SearchBar

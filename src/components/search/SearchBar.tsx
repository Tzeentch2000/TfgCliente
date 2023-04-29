import React from 'react'
import style from './SearchBar.module.scss'

const SearchBar = () => {
  return (
    <input type='text' className={style.search} placeholder='Search...' />
  )
}

export default SearchBar

import React from 'react'
import style from './Book.module.scss'
import { IBook } from '../../interfaces/Interfaces'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
    book:IBook
}

const Book = (props:Props) => {
    const navigate = useNavigate()
    const { book } = props
    const { id,name,description,author,price,image,categories,state,isActive } = book
  return (
    <div className={style.container}>
      <div className={style.image}></div>
      <div className={style.textContent}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <button onClick={() => navigate(`/book/${id}`)} 
        className={style.btn}>
                More details
      </button>
    </div>
  )
}

export default Book

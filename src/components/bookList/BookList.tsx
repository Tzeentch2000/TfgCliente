import React from 'react'
import style from './BookList.module.scss'
import Book from '../book/Book'
import { IBook } from '../../interfaces/Interfaces'

type Props = {
    books:IBook[]
}

const BookList = (props:Props) => {
  const { books } = props
  return (
    <div className={style.bookList}>
        {books.map(b => (
            <Book key={b.id.toString()} book={b}/>
        ))}
    </div>
  )
}

export default BookList

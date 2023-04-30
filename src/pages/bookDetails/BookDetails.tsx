import React from 'react'
import style from './BookDetails.module.scss'
import { getBookById } from '../../assets/functions/api'
import { useLoaderData } from 'react-router-dom'
import { IBook } from '../../interfaces/Interfaces'
import a from '../../assets/images/book.jpg'

const BookDetails = () => {
    const book = useLoaderData() as IBook
    const { id,name,description,author,price,image,categories,state,isActive } = book
  return (
    <div className={style.container}>
      <h3 className={style.title}>{name} <span className={style.author}>{author}</span></h3>
        <img src={require('../../assets/images/book.jpg')} className={style.image}></img>
        <p className={style.categories}>
          {categories.map(c => (<span key={c.id.toString()} className={style.category}>{c.name}</span>))}
          <span>{state.name}</span>
        </p>
        <p className={style.description}>{description}</p>
      <button>Add to cart - {price.toString()}$</button>
    </div>
  )
}

export default BookDetails

export async function loader({params} : any){
    const book = await getBookById(params.bookId)
    if(Object.values(book).length === 0){
        throw new Response('',{
            status: 404,
            statusText: 'No hay resultados'
        })
    }
    return book
}
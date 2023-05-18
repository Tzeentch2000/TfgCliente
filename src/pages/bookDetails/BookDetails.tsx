import React, { useState } from 'react'
import style from './BookDetails.module.scss'
import { getBookById } from '../../assets/functions/api'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { IBook } from '../../interfaces/Interfaces'
import Modal from '../../components/UI/modal/Modal'
import AmountForm from '../../components/amountForm/AmountForm'
import Alert from '../../components/UI/Alert/Alert'
import useCart from '../../hooks/useCart'
import Spinner from '../../components/UI/spinner/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

const BookDetails = () => {
    const navigation = useNavigation()
    const book = useLoaderData() as IBook
    const cart = useCart()
    const [ modal,setModal ] = useState(false)
    const { id,name,description,author,price,image,categories,state,isActive } = book

    const handleClick = () => {
      setModal(!modal)
    }

    const isInCart = () => {
      return cart.cart.find(a => a.bookId === book.id)
    }

    let showAddToCartButton = true
    if(isInCart !== undefined || cart.cart.length >= 10) showAddToCartButton = false

  return ( navigation.state === 'loading' ? <Spinner /> :
    <div className={style.container}>
      {isInCart() !== undefined && <Alert type='success' message='El producto ha sido añadido al carrito' />}
      {cart.cart.length >= 10 && <Alert type='error' message='Maximum cart capacity reached' />}
      <h3 className={style.title}>{name} <span className={style.author}>{author}</span></h3>
        <img src={`${image}`} className={style.image}></img>
        <p className={style.categories}>
          {categories.map(c => (<span key={c.id.toString()} className={style.category}>{c.name}</span>))}
          <span>{state.name}</span>
        </p>
        <p className={style.description}>{description}</p>
      {isInCart() === undefined && <button onClick={handleClick}><FontAwesomeIcon icon={faCartPlus} beat />{'  '}{price.toString()}$</button>}
      {modal && <Modal title={`Comprar "${name}"`} setModal={handleClick} editId={id.toString()}><AmountForm book={book} handleCloseModal={handleClick} /></Modal>}
    </div>
  )
}

export default BookDetails

export async function loader({params} : any){
    const book = await getBookById(params.bookId)
    if(book === null) throw { message: 'Could not fetch events' }
    if(Object.values(book).length === 0){
        throw new Response('',{
            status: 404,
            statusText: 'No hay resultados'
        })
    }
    return book
}
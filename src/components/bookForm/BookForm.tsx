import React, { useEffect, useState } from 'react'
import style from '../UI/formStyle/FormStyle.module.scss'
import { IBook, ICategory, IState } from '../../interfaces/Interfaces'
import { getActiveCategories, getActiveStates, getBookById } from '../../assets/functions/api'

type Props = {
    bookId?:number
}

const BookForm = (props:Props) => {

    const [ book,setBook ] = useState<IBook>({} as IBook)
    const [ categories,setCategories ] = useState<ICategory[]>([] as ICategory[])
    const [ states,setStates ] = useState<IState[]>([] as IState[])
    const [ checkedState, setCheckedState] = useState([] as boolean[]);

    useEffect(() => {
        const chargeData = async() => {
            const c : ICategory[] = await getActiveCategories()
            setCategories(c)
            const s : IState[] = await getActiveStates()
            setStates(s)
            if(props.bookId){
                const b : IBook = await getBookById(props.bookId)
                setBook(b)

                const checkedCategories = c.map(_c => {
                    const finded = b.categories.find(bookCategory => bookCategory.id === _c.id)
                    if(finded === undefined) return false
                    return true
                })
                setCheckedState(checkedCategories)
            }
        }
        chargeData()
    },[setBook,setCategories,setStates])

    const checkedIsActive = () => {
        if(props.bookId && book) return book.isActive
        return false
    }

  return (
    <div className={style.formulario}>
      {/*showError*/}
        <div className={style.bloque}>          
          <label htmlFor='name'>Title:</label>
          <input type="text" placeholder='Title' name='name' id='name' defaultValue={book?.name} />
        </div>
        <div className={style.bloque}>          
          <label htmlFor='author'>Author:</label>
          <input type="text" placeholder='Author' name='author' id='author' defaultValue={book?.author} />
        </div>
        <div className={style.bloque}>          
          <label htmlFor='price'>Price:</label>
          <input type="text" placeholder='Price' name='price' id='price' defaultValue={book?.price} />
        </div>
        <div className={style.bloque}>          
          <label htmlFor='image'>Image URL:</label>
          <input type="text" placeholder='Image URL' name='image' id='image' defaultValue={book?.image} />
        </div>
        <label htmlFor='Category'>Category:</label>
        <div className={`${style.bloque} ${style['checkbox-bloque']}`}>
            {categories.map((c,index) => (
                <div className={style['checkbox-container']} key={c.id}>
                    <input type="checkbox" id={`category-${c.id}`} name={c.name} value={c.id} defaultChecked={checkedState[index]} />
                    <label htmlFor={c.name}>{c.name}</label>
                </div>
            ))}
        </div>
        <div className={style.bloque}>    
        <label htmlFor='state'>State:</label>      
            <select name='state' value={book?.state?.id}>
                <option value=''>Select a state</option>
                {states.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>
        </div>
        <label htmlFor='state'>Is Active:</label>      
        <div className={`${style.bloque} ${style['checkbox-bloque']}`}>
            <div className={style['checkbox-container']}>
                <input type="checkbox" id='isActive' name='isActive' value='true' defaultChecked={checkedIsActive()} />
                <label htmlFor='isActive'>Active</label>
            </div>
        </div>
        <div className={style.bloque}>      
            <label htmlFor='textarea'>Description:</label>    
            <textarea name="textarea" defaultValue={book?.description}></textarea>
        </div>
        <input type="submit" value='Create book' />
    </div>
  )
}

export default BookForm

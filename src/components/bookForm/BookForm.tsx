import React, { Fragment, useEffect, useState } from 'react'
import style from '../UI/formStyle/FormStyle.module.scss'
import { IBook, ICategory, IState, InsertBook, bookMaintenanceCategory } from '../../interfaces/Interfaces'
import { createBook, getActiveCategories, getActiveStates, getBookById, updateBook } from '../../assets/functions/api'
import Alert from '../UI/Alert/Alert'
import { validatePrice } from '../../assets/functions/validation'
import { getCookie } from '../../assets/functions/cookie'

interface Props {
    bookId?:number,
    addBook?:(book:IBook) => void,
    updateBook?:(book:IBook) => void,
    closeModal:(modal:boolean) => void
}

const initialData:IBook = {
    id:0,
    name:'',
    description:'',
    author:'',
    price:0,
    image:'',
    categories:[] as ICategory[],
    state:{} as IState,
    isActive:false
}

const BookForm = (props:Props) => {

    const [ book,setBook ] = useState<IBook>(initialData)
    const [ categories,setCategories ] = useState<ICategory[]>([] as ICategory[])
    const [ states,setStates ] = useState<IState[]>([] as IState[])
    const [ checkedState, setCheckedState] = useState<bookMaintenanceCategory[]>([] as bookMaintenanceCategory[]);
    const [ error, setError ] = useState('')
    const [ loading,setLoading] = useState(true)

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
                    if(finded === undefined) return {isIn:false,category:_c}
                    return {isIn:true,category:_c}
                })
                setCheckedState(checkedCategories)
            } else {
                const checkedCategories = c.map(_c => {
                    return {isIn:false,category:_c}
                })
                setCheckedState(checkedCategories)
            }
        }
        chargeData()
        setLoading(false)
    },[setBook,setCategories,setStates])

    const checkedIsActive = () => {
        if(props.bookId && book) return book.isActive
        return false
    }

    const onHandleChangeCategory = (e: any) => {
        console.log('a')
        const newCheckedState:bookMaintenanceCategory[] = checkedState.map(c => {
            if(c.category.id === Number(e.target.value)) return {...c,isIn:!c.isIn}
            return c
        })
        setCheckedState(newCheckedState)
    }

    const onChangeState = (e: any) => {
        const newState = states.filter(s => s.id == e.target.value)
        setBook({...book,state:newState[0]})
    }

    const onHandleClickIsActive = () => {
        console.log('a')
        setBook({...book,isActive:!book.isActive})
    }

    const onHandleInput = (e: any) => {
        setBook({...book,[e.target.name]:e.target.value})
    }

    const onHandleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault()

        if(Object.values(book).includes('')){
            setError('All files are required')
            return 
        }

        const saveCategories:bookMaintenanceCategory[] = checkedState.filter(c => c.isIn)
        if(saveCategories.length <= 0){
            setError('Book always have at least one category')
            return 
        }

        console.log(validatePrice(book.price.toString()))
        if(!validatePrice(book.price.toString())){
            setError('Invalid price')
            return
        }

        setError('')
        const bookCategies = saveCategories.map(s => s.category)
        const token = getCookie('token')
        if(token === 'null') return 

        try{
            if(book.id === 0) { 
                // from api
                let workBook: InsertBook = {...book,categories:bookCategies}
                delete workBook?.id
                const newBook = await createBook(workBook,token)
                if(props.addBook) props.addBook(newBook)
            } else {
                // from api
                await updateBook({...book,categories:bookCategies},token)
                if(props.updateBook) props.updateBook({...book,categories:bookCategies})
            }

            props.closeModal(false)
        }catch(e){
            throw new Response(`Error: ${e}`, { status: 500 });
        }
    }

  return (
    <form className={style.formulario} onSubmit={onHandleSubmit}>
        {loading ? <p>Cargando...</p> : (<Fragment>
            <div className={style.bloque}>          
          <label htmlFor='name'>Title:</label>
          <input type="text" placeholder='Title' name='name' id='name' defaultValue={book?.name} onInput={onHandleInput} />
        </div>
        <div className={style.bloque}>          
          <label htmlFor='author'>Author:</label>
          <input type="text" placeholder='Author' name='author' id='author' defaultValue={book?.author} onInput={onHandleInput} />
        </div>
        <div className={style.bloque}>          
          <label htmlFor='price'>Price:</label>
          <input type="text" placeholder='Price' name='price' id='price' value={book?.price} onInput={onHandleInput} />
        </div>
        <div className={style.bloque}>          
          <label htmlFor='image'>Image URL:</label>
          <input type="text" placeholder='Image URL' name='image' id='image' defaultValue={book?.image} onInput={onHandleInput} />
        </div>
        <label>Category:</label>
        <div className={`${style.bloque} ${style['checkbox-bloque']}`}>
            {categories.map((c,index) => (
                <div className={style['checkbox-container']} key={c.id}>
                    <input type="checkbox" id={`category-${c.id}`} name={c.name} value={c.id} defaultChecked={checkedState[index]?.isIn} onClick={e => onHandleChangeCategory(e)} />
                    <label htmlFor={c.name}>{c.name}</label>
                </div>
            ))}
        </div>
        <div className={style.bloque}>    
        <label htmlFor='state'>State:</label>      
            <select name='state' value={book?.state?.id} onChange={onChangeState}>
                {states.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>
        </div>
        <label htmlFor='state'>Is Active:</label>      
        <div className={`${style.bloque} ${style['checkbox-bloque']}`}>
            <div className={style['checkbox-container']}>
                <input type="checkbox" id='isActive' name='isActive' defaultChecked={checkedIsActive()} onChange={() => onHandleClickIsActive} />
                <label htmlFor='isActive'>Active</label>
            </div>
        </div>
        <div className={style.bloque}>      
            <label htmlFor='description'>Description:</label>    
            <textarea name="description" defaultValue={book?.description} onInput={onHandleInput}></textarea>
        </div>
        {error.length > 0 && (<Alert type='error' message={error} />)}
        <input type="submit" value='Done' />
        </Fragment>)}
    </form>
  )
}

export default BookForm

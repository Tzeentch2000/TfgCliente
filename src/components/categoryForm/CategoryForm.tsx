import React, { Fragment, useEffect, useState } from 'react'
import style from '../UI/formStyle/FormStyle.module.scss'
import { ICategory, InsertCategory } from '../../interfaces/Interfaces'
import { createCategory, getCategoryById, updateCategory } from '../../assets/functions/api'
import Alert from '../UI/Alert/Alert'
import { getCookie } from '../../assets/functions/cookie'

interface Props {
    categoryId?:number,
    addCategory?:(category:ICategory) => void,
    updateCategory?:(category:ICategory) => void,
    closeModal:(modal:boolean) => void
}

const initialData:ICategory = {
    id:0,
    name:'',
    description:'',
    isActive:false
    //date and color
}

const CategoryForm = (props:Props) => {

    const [ category, setCategory ] = useState<ICategory>(initialData)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState('')

    useEffect(() => {
        const getCategory = async() => {
            if(props.categoryId){
                const c:ICategory = await getCategoryById(props.categoryId)
                setCategory(c)
            }
        }
        getCategory()
        setLoading(false)
    },[])

    const onInputChange = (e: any) => {
        setCategory({...category, [e.target.name]:e.target.value})
    }

    const onHandleChangeIsActive = () => {
        setCategory({...category,isActive:!category?.isActive})
    }

    const onHandleSubmit = async(e: any) => {
        e.preventDefault()

        if(Object.values(category).includes('')){
            setError('All files are required')
            return 
        }
        const token = getCookie('token')
        if(token === 'null') return 

        if(category.id === 0){
            let workCategory: InsertCategory = category
            delete workCategory?.id
            const newCategory = await createCategory(workCategory,token)
            if(props.addCategory) props.addCategory(newCategory)
        } else {
            await updateCategory(category,token)
            if(props.updateCategory) props.updateCategory(category)
        }
        props.closeModal(false)
    }

  return (
    <form className={style.formulario} onSubmit={onHandleSubmit}>
        {loading ? <p>Cargando...</p> : (<Fragment>
        <div className={style.bloque}>          
          <label htmlFor='name'>Title:</label>
          <input type="text" placeholder='Title' name='name' id='name' defaultValue={category?.name} onInput={onInputChange} />
        </div>
        <div className={style.bloque}>          
          <label htmlFor='color'>Color:</label>
          <input type="color" name='color' id='color' defaultValue={''} />
        </div>
        <div className={style.bloque}>      
            <label htmlFor='description'>Description:</label>    
            <textarea name="description" defaultValue={category?.description} onInput={onInputChange}></textarea>
        </div>

        <label htmlFor='state'>Is Active:</label>      
        <div className={`${style.bloque} ${style['checkbox-bloque']}`}>
            <div className={style['checkbox-container']}>
                <input type="checkbox" id='isActive' name='isActive' checked={category.isActive} onChange={onHandleChangeIsActive} />
                <label htmlFor='isActive'>Active</label>
            </div>
        </div>
        {error.length > 0 && (<Alert type='error' message={error} />)}
        <input type="submit" value='Done' />
        </Fragment>)}
    </form>
  )
}

export default CategoryForm

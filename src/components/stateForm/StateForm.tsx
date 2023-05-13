import React, { Fragment, useEffect, useState } from 'react'
import style from '../UI/formStyle/FormStyle.module.scss'
import { IState, IStateInitialData, InsertState } from '../../interfaces/Interfaces'
import { createState, getStateById, updateState } from '../../assets/functions/api'
import Alert from '../UI/Alert/Alert'
import { getCookie } from '../../assets/functions/cookie'

interface Props {
    stateId?:number,
    addState?:(state:IState) => void,
    updateState?:(state:IState) => void,
    closeModal:(modal:boolean) => void
}

const initialData:IStateInitialData = {
    id:0,
    name:'',
    description:'',
    isActive:false,
    colorCode:'#000000'
    //date and color
}

const StateForm = (props:Props) => {

    const [ state, setState ] = useState<IStateInitialData>(initialData)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState('')

    useEffect(() => {
        const getState = async() => {
            if(props.stateId){
                const s:IState = await getStateById(props.stateId)
                setState(s)
            }
        }
        getState()
        setLoading(false)
    },[])

    const onInputChange = (e: any) => {
        setState({...state, [e.target.name]:e.target.value})
    }

    const onHandleChangeColor = (e: any) => {
        setState({...state,colorCode:e.target.value})
    }

    const onHandleChangeIsActive = () => {
        setState({...state,isActive:!state?.isActive})
    }

    const onHandleSubmit = async(e: any) => {
        e.preventDefault()

        if(Object.values(state).includes('')){
            setError('All files are required')
            return 
        }
        const token = getCookie('token')
        if(token === 'null') return 

        if(state.id === 0){
            let workState: InsertState = state
            delete workState?.id
            const newState = await createState(workState,token)
            if(props.addState) props.addState(newState)
        } else {
            await updateState(state,token)
            if(props.updateState) props.updateState(state as IState)
        }
        props.closeModal(false)
    }

  return (
    <form className={style.formulario} onSubmit={onHandleSubmit}>
        {loading ? <p>Cargando...</p> : (<Fragment>
        <div className={style.bloque}>          
          <label htmlFor='name'>Title:</label>
          <input type="text" placeholder='Title' name='name' id='name' defaultValue={state?.name} onInput={onInputChange} />
        </div>
        <div className={style.bloque}>          
          <label htmlFor='color'>Color:</label>
          <input type="color" name='color' id='color' defaultValue={state.colorCode} onChange={onHandleChangeColor} />
        </div>
        <div className={style.bloque}>      
            <label htmlFor='description'>Description:</label>    
            <textarea name="description" defaultValue={state?.description} onInput={onInputChange}></textarea>
        </div>

        <label htmlFor='state'>Is Active:</label>      
        <div className={`${style.bloque} ${style['checkbox-bloque']}`}>
            <div className={style['checkbox-container']}>
                <input type="checkbox" id='isActive' name='isActive' checked={state.isActive} onChange={onHandleChangeIsActive} />
                <label htmlFor='isActive'>Active</label>
            </div>
        </div>
        {error.length > 0 && (<Alert type='error' message={error} />)}
        <input type="submit" value='Done' />
        </Fragment>)}
    </form>
  )
}

export default StateForm

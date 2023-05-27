import React from 'react'
import { Form, useActionData, redirect, useNavigate } from 'react-router-dom'
import style from '../../../layouts/auth/Auth.module.scss'
import Alert from '../../../components/UI/Alert/Alert'
import { login } from '../../../assets/functions/api'
import { setCookie } from '../../../assets/functions/cookie'

const Login = () => {
  const navigate = useNavigate()
  const error: any = useActionData()
  const showError = error?.length > 0 ? <Alert type='error' message={error} /> : undefined
  return (
    <div className={style.formulario}>
      <Form method='post' action='/authentication'>
      {showError}
        <div className={style.bloque}>          
          <label htmlFor='email'>Email:</label>
          <input type="email" placeholder='Email' name='email' id='email' />
        </div>
        <div className={style.bloque}>          
          <label htmlFor='password'>Password:</label>
          <input type="password" placeholder='Password' name='password' id='password' />
        </div>
        <input type="submit" value='Login' />
        <p onClick={() => navigate('/authentication/register')} className={style.back}>Click to register!</p>
      </Form>
    </div>
    )
}

export default Login

export async function action({request} : any){
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
  let error = ''

  if(Object.values(datos).includes('')){
    error = 'All fields are required'
    return error
  }

  const token: string = await login(datos)
  if(token == '-1') return error = 'Incorrect username or password'
  setCookie('token',token,1)
  return redirect('/')
}

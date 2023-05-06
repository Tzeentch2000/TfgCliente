import React from 'react'
import { Form, useActionData, redirect, useNavigate } from 'react-router-dom'
import style from '../../../layouts/auth/Auth.module.scss'
import Alert from '../../../components/UI/Alert/Alert'
import { validatePhone,validatePassword } from '../../../assets/functions/validation'
import { register } from '../../../assets/functions/api'

const Register = () => {
  const navigate = useNavigate()
  const error: any = useActionData()
  const showError = error?.length > 0 ? <Alert type='error' message={error} /> : undefined
  return (
    <div className={style.formulario}>
      <Form method='post' action='/authentication/register'>
      {showError}
        <div className={style.bloque}>
          <label htmlFor='name'>Name:</label>
          <input type="text" placeholder='Name' name='name' id='name' />
        </div>

        <div className={style.bloque}>          
          <label htmlFor='surname'>Surmane:</label>
          <input type="text" placeholder='Surname' name='surname' id='surname' />
        </div>

        <div className={style.bloque}>          
          <label htmlFor='email'>Email:</label>
          <input type="email" placeholder='Email' name='email' id='email' />
        </div>

        <div className={style.bloque}>          
          <label htmlFor='phone'>Phone:</label>
          <input type="text" placeholder='Phone' name='phone' id='phone' maxLength={9}/>
        </div>

        <div className={style.bloque}>          
          <label htmlFor='password'>Password:</label>
          <input type="password" placeholder='Password' name='password' id='password' />
        </div>

        <div className={style.bloque}>          
          <label htmlFor='password2'>Repeat Password:</label>
          <input type="password" placeholder='Password' name='password2' id='password2' />
        </div>

        <input type="submit" value='Register' />
        <p onClick={() => navigate('/authentication')} className={style.back}>Back for login</p>
      </Form>
    </div>
  )
}

export default Register

export async function action({request}: any){
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
  let error = ''
  const { name,surname,email,phone,password,password2 } = datos

  if(Object.values(datos).includes('')){
    error = 'All fields are required'
    return error
  }

  if(!validatePhone(phone)){
    error = 'Incorrect phone'
    return error
  }

  if(!validatePassword(password,password2)){
    error = 'Incorrect passwords'
    return error
  }
  //LE HE PUESTO EL AWAIT, SI FUNCIONA MAL ESTA PARTE TENGO QUE QUITAR EL AWAIT
  await register({email,password,name,surname,phone})

  return redirect('/authentication')
}

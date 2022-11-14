import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export const Registration = () => {
   const [form, setForm] = useState({
      email: '',
      password: '',
   })

   //функцияполучения данных из input
   const changeHandler = e => {
      setForm({ ...form, [e.target.name]: e.target.value })
   }
   //функция запроса на сервер передаем наши полученные из поля input данніе
   const registerHandler = async () => {
      try {
         const response = await axios.post(
            'https://todomern-react.herokuapp.com/api/auth/registration',
            { ...form },
            {
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         )
         console.log(response.data.message)
      } catch (e) {
         console.log(e)
      }
   }

   return (
      <div className='container'>
         <div className='auth-page'>
            <h3>Регистрация</h3>
            <form
               className='form form-login'
               onSubmit={e => e.preventDefault()}
            >
               <div className='row'>
                  <div className='input-field col s12'>
                     <input
                        type='email'
                        name='email'
                        className='validate'
                        onChange={changeHandler}
                     />
                     <label htmlFor='email'>email</label>
                  </div>
                  <div className='input-field col s12'>
                     <input
                        type='password'
                        name='password'
                        className='validate'
                        onChange={changeHandler}
                     />
                     <label htmlFor='password'>Пароль</label>
                  </div>
               </div>
               <div className='row'>
                  <button
                     className='wawes-effect wawes-light btn  blue'
                     onClick={registerHandler}
                  >
                     Регистрация
                  </button>
                  <NavLink to='/login' className='btn-outline btn-reg'>
                     Уже есть аккаунт?
                  </NavLink>
               </div>
            </form>
         </div>
      </div>
   )
}

import axios from 'axios'
import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const Login = () => {
   const [form, setForm] = useState({
      email: '',
      password: '',
   })
   //переменная которая вытягиваем функцию login из кастомного хука auth.hook.js
   const { login } = useContext(AuthContext)
   //функцияполучения данных из input
   const changeHandler = e => {
      setForm({ ...form, [e.target.name]: e.target.value })
   }

   //реализуем функцию отправки запроса на логирование
   const loginHandler = async () => {
      try {
         await axios
            .post(
               'https://todomern-react.herokuapp.com/api/auth/login',
               { ...form },
               {
                  headers: {
                     'Content-Type': 'application/json',
                  },
               }
            )
            //передаем принятые нами данные из ответа response в функцию login которую мы достали из контекста
            .then(response => {
               login(response.data.token, response.data.user.userId)
            })
      } catch (e) {
         console.log(e)
      }
   }

   return (
      <div className='container'>
         <div className='auth-page'>
            <h3>Авторизация</h3>
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
                     onClick={loginHandler}
                  >
                     Войти
                  </button>

                  <NavLink to='/registration' className='btn-outline btn-reg'>
                     Нет аккаунта?
                  </NavLink>
               </div>
            </form>
         </div>
      </div>
   )
}

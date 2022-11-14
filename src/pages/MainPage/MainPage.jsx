import React, { useState, useContext, useCallback } from 'react'
import axios from 'axios'
import './MainPage.scss'
import { AuthContext } from '../../context/AuthContext'
import { useEffect } from 'react'

export const MainPage = () => {
   const [text, setText] = useState('') //состояние для input
   const { userId } = useContext(AuthContext) //для передачи в запрос на сервер берем
   const [todos, setTodos] = useState([])

   //создаем функцию получаения наших todo дляч определенно го пользолвателя
   const getTodo = useCallback(async () => {
      await axios
         .get('https://todomern-react.herokuapp.com/api/todos', {
            headers: {
               'Content-Type': 'application/json',
            },
            params: { userId },
         })
         .then(response => setTodos(response.data))
         .catch(e => console.log(e))
   }, [userId])
   useEffect(() => {
      getTodo()
   }, [getTodo])

   //функция для todo элемента
   const createTodo = useCallback(async () => {
      if (!text) return null
      try {
         await axios
            .post(
               'https://todomern-react.herokuapp.com/api/todos/add',
               {
                  text,
                  userId,
               },
               {
                  headers: {
                     'Content-Type': 'application/json',
                  },
               }
            )
            //очистка ввода input и добавление в базу и отправка  на сервер
            .then(response => {
               setTodos([...todos, response.data])
               setText('')
            })
      } catch (e) {
         console.log(e)
      }
   }, [text, userId, todos])

   //функция по удалению TODO
   const removeTodos = useCallback(
      async id => {
         try {
            await axios
               .delete(
                  `https://todomern-react.herokuapp.com/api/todos/delete/${id}`,
                  { id },
                  {
                     headers: {
                        'Content-Type': 'application/json',
                     },
                  }
               )
               .then(() => getTodo())
         } catch (e) {
            console.log(e)
         }
      },
      [getTodo]
   )

   //функция по изменению статуса completed у todo
   const completedTodo = useCallback(
      async id => {
         try {
            await axios
               .put(
                  `https://todomern-react.herokuapp.com/api/todos/completed/${id}`,
                  { id },
                  {
                     headers: {
                        'Content-Type': 'application/json',
                     },
                  }
               )
               .then(response => {
                  setTodos([...todos, response.data])
                  getTodo()
               })
         } catch (e) {
            console.log(e)
         }
      },
      [todos, getTodo]
   )

   //функция по изменению статуса important у todo
   const importantTodo = useCallback(
      async id => {
         try {
            await axios
               .put(
                  `https://todomern-react.herokuapp.com/api/todos/important/${id}`,
                  { id },
                  {
                     headers: {
                        'Content-Type': 'application/json',
                     },
                  }
               )
               .then(response => {
                  setTodos([...todos, response.data])
                  getTodo()
               })
         } catch (e) {
            console.log(e)
         }
      },
      [todos, getTodo]
   )

   return (
      <div className='container'>
         <div className='main-page'>
            <h4>Добавить задачу:</h4>
            <form
               className='form form-login'
               onSubmit={e => e.preventDefault()}
            >
               <div className='row'>
                  <div className='input-field col s12'>
                     <input
                        type='text'
                        id='text'
                        name='input'
                        className='validate'
                        value={text}
                        onChange={e => setText(e.target.value)}
                     />
                     <label htmlFor='input'>Задача:</label>
                  </div>
               </div>
               <div className='row'>
                  <button
                     className='waves-effect waves-light btn blue'
                     onClick={createTodo}
                  >
                     Добавить
                  </button>
               </div>
            </form>
            <h3>Активные задачи:</h3>
            <div className='todos'>
               {todos.map((todo, index) => {
                  let cls = ['row flex todos__item']
                  if (todo.completed) {
                     cls.push('completed')
                  }

                  if (todo.important) {
                     cls.push('important')
                  }
                  return (
                     <div className={cls.join(' ')} key={index}>
                        <div className='col todos__num'>{index + 1}</div>
                        <div className='col todos__text'>{todo.text}</div>
                        <div className='col todos__buttons'>
                           <i
                              className='material-icons blue-text'
                              onClick={() => completedTodo(todo._id)}
                           >
                              check
                           </i>
                           <i
                              className='material-icons orange-text'
                              onClick={() => importantTodo(todo._id)}
                           >
                              warning
                           </i>
                           <i
                              className='material-icons red-text'
                              onClick={() => removeTodos(todo._id)}
                           >
                              delete
                           </i>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      </div>
   )
}

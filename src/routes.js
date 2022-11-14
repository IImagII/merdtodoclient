import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './components/Login/Login'
import { MainPage } from './pages/MainPage/MainPage'

export const useRoutes = isLogin => {
   //для залогированных пользователей будет такое
   if (isLogin) {
      return (
         <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='*' element={<Navigate to='/' />} />
         </Routes>
      )
   }
   // Для незалогированных пользователей обратно вернет на регисрацию
   return (
      <Routes>
         <Route path='/login' element={<Login />} />
         <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
   )
}

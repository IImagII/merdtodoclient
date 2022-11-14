import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../../components/Login/Login'
import { Registration } from '../../components/Registration/Registration'
import { MainPage } from '../MainPage/MainPage'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

import './AuthPage.scss'

export const AuthPage = () => {
   const { isLogin } = useContext(AuthContext)
   return (
      <BrowserRouter>
         {!isLogin ? (
            <Routes>
               <Route path='/login' element={<Login />} />
               <Route path='/registration' element={<Registration />} />
               <Route path='/' element={<Navigate replace to='/login' />} />
            </Routes>
         ) : (
            <Routes>
               <Route path='/' element={<MainPage />} />
               <Route path='*' element={<Navigate to='/' />} />
            </Routes>
         )}
      </BrowserRouter>
   )
}

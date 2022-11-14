import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Navbar.scss'

export const Navbar = () => {
   const { logout, isLogin } = useContext(AuthContext) // получаем то что у нас в контексте
   return (
      <nav>
         <div className='nav-wrapper blue accent-1'>
            <a href='/' className='brand-logo'>
               My TODO
            </a>
            {isLogin && (
               <ul id='nav-mobile' className='right hide-on-med-and-down'>
                  <li>
                     <a href='/' onClick={logout}>
                        Выйти
                     </a>
                  </li>
               </ul>
            )}
         </div>
      </nav>
   )
}

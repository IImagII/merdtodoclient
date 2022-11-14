import { useState, useEffect, useCallback } from 'react'

export const useAuth = () => {
   const [token, setToken] = useState(null)
   const [userId, setUserId] = useState(null)
   const [isReady, setIsReady] = useState(false) //для коректного отображения наших данных

   //юудет передавать измененное состояниекоторое мы получаем из сервера в localstorage
   //мы помещаем ее в хук useCallback так как от этой функция будет в зависимости в хуке useEffect()
   const login = useCallback((jwtToken, id) => {
      setToken(jwtToken)
      setUserId(id)
      localStorage.setItem(
         'userData',
         JSON.stringify({
            userId: id,
            token: jwtToken,
         })
      )
   }, [])

   //обнуляем при выходе состояние
   const logout = () => {
      setToken(null)
      setUserId(null)
      localStorage.removeItem('userData')
   }
   //если вдруг у насесть токен в localstorage мы можем спросить а есть ли у нас уже token
   useEffect(() => {
      const data = JSON.parse(localStorage.getItem('userData'))
      if (data && data.token) {
         login(data.token, data.userId)
      }
      setIsReady(true)
   }, [login])
   return { login, logout, token, userId, isReady }
}

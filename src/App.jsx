import { Navbar } from './components/Navbar/Navbar'
import './App.scss'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'

function App() {
   const { login, logout, token, userId, isReady } = useAuth()
   //создадим переменную чтобы определять залогинины мы или нет
   const isLogin = !!token

   return (
      //формируем провайдер и передаем все данные из контекста оно будет доступно из там где мы вызовем хук useContent()
      <AuthContext.Provider
         value={{ login, logout, token, userId, isReady, isLogin }}
      >
         <div className='app'>
            <Navbar />
            <AuthPage />
         </div>
      </AuthContext.Provider>
   )
}

export default App

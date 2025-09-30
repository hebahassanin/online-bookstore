
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AuthLayout from './Modules/Shared/components/AuthLayout/AuthLayout'
import NotFound from './Modules/Shared/components/NotFound/NotFound'
import Login from './Modules/AuthModule/components/Login/Login'
import Register from './Modules/AuthModule/components/Register/Register'
import ForgetPassword from './Modules/AuthModule/components/ForgetPassword/ForgetPassword'
import ResetPassword from './Modules/AuthModule/components/ResetPassword/ResetPassword'
import ChangePassword from './Modules/AuthModule/components/ChangePassword/ChangePassword'
import MasterLayout from './Modules/Shared/components/MasterLayout/MasterLayout'
import Home from './Modules/HomeModule/Home/Home'
import Cart from './Modules/CartModule/components/Cart/Cart'
import OrderConfirmation from './Modules/CartModule/components/OrderConfirmation/OrderConfirmation'
import { ToastContainer } from 'react-toastify'
import Categories from './Modules/HomeModule/components/Categories/Categories'
import Books from './Modules/BooksModule/components/Books/Books'
import BookDetails from './Modules/BooksModule/components/BookDetails/BookDetails'

function App() {
  const routes= createBrowserRouter([
    {
      path:'/',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true, element:<Login/>},
        {path:'login', element:<Login/>},
        {path:'register',element:<Register/>},
        {path:'forget-pass', element:<ForgetPassword/>},
        {path:'reset-pass', element:<ResetPassword/>},
        {path:'change-password', element:<ChangePassword/>}
      ]
    },
    {
      path:'dashboard',
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true, element:<Home/>},
        {path:'home', element:<Home/>},
        {path:"categories", element:<Categories/>},
        {path:'cart', element:<Cart/>},
        {path:'confirmation', element:<OrderConfirmation/>},
        {path:"books", 
        children:[
          {index:true, element:<Books/>},
          {path:":bookId",element:<BookDetails/>}
        ]
       }
      ]
    }
  ])

  return (
    <>
    <ToastContainer/>
    <RouterProvider router={routes}></RouterProvider>
      
    </>
  )
}

export default App


import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Contact from '../Contact/Contact'

export default function MasterLayout() {
  return (
    <>
      <div style={{position:'fixed',top:0, left:0, right:0, zIndex:1000}}>
        <Contact/>
        <NavBar/>
      </div>
      
      <div style={{paddingTop:"140px"}}>
      <Outlet/>
      </div>
      
        
      <Footer/>
    </>
  )
}

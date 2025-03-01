import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import ScrollToTop from './Components/ScrollTopTop/ScrollToTop'

function App () {
  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App

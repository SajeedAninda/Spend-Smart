import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Homepage from "./Components/Navbar/Pages/Homepage/Homepage"

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App

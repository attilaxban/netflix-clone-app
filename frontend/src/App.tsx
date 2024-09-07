import { Routes, Route } from "react-router-dom"
import { Home } from "./Pages/Home/Home"
import { Login } from "./Pages/Login/Login"
import { Registration } from "./Pages/Registration/Registration"

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/registration' element={<Registration/>} />
    </Routes>
  )
}

export default App

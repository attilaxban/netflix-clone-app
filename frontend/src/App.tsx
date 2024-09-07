import { Routes, Route } from "react-router-dom"
import { Home } from "./Pages/Home/Home"
import { Login } from "./Pages/Login/Login"
import { Registration } from "./Pages/Registration/Registration"
import { UpdateUserCredentials } from "./Pages/UpdateUserCredentials/UpdateUserCredentials"
import Main from "./Pages/Main/Main"

function App() {

  return (
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/registration' element={<Registration/>} />
      <Route path='/home' element={<Home />} />
      <Route path="/update" element={<UpdateUserCredentials />} />
    </Routes>
  )
}

export default App

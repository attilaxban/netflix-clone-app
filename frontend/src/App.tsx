import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import { Login } from "./Pages/Login/Login"
import { Registration } from "./Pages/Registration/Registration"
import Main from "./Pages/Main/Main"
import { Media } from "./Pages/Media/Media"
import Movies from "./Pages/Movies/Movies"
import TV from "./Pages/TV/TV"
import { MyList } from "./Pages/MyList/MyList"

function App() {

  return (
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/registration' element={<Registration/>} />
      <Route path='/home' element={<Home />} />
      <Route path='/media' element={<Media />} />
      <Route path='/movies' element={<Movies />}/>
      <Route path='/tv' element={<TV />}/>
      <Route path='/mylist' element={<MyList />}/>
    </Routes>
  )
}

export default App

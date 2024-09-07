import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import { PopularMovies } from '../../Components/MovieComponents/PopularMovies'

export const Home = () => {
  return (
    <div>
        <div>
            <NavBar/>
        </div>
        <div>
            <PopularMovies />
        </div>
    </div>

  )
}
export default Home

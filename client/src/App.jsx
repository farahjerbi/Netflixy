import React from 'react'
import './app.scss'
import Home from './pages/home/Home'
import Watch from './pages/watch/Watch'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import{Routes , Route , Link ,BrowserRouter } from 'react-router-dom'
const App = () => {
  const user=true;
  return (
    <BrowserRouter>
         <Routes>
          {user &&
          <>
          <Route exact path='/'element={<Home />} />
          <Route path='/movies' element={<Home type='movie' />}  />
          <Route path='/series' element={<Home type='series' />}  />
          <Route path='/watch' element={<Watch />}  />
          </>}
          
             {!user &&
             <>
                 <Route exact path='/'element={<Register />} />
                  <Route path='/login' element={<Login />}  />
   
             </>
             }

        </Routes>
    </BrowserRouter>
   
  )
}

export default App

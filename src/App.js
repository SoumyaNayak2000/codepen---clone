import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './components/Home'


const App = () => {
  return (
    <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
      <Routes>
        <Route path='/home/*' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
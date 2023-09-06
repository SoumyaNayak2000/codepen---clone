import React from 'react'
import { Routes , Route, Navigate } from 'react-router-dom'
import Home from './components/Home'


const App = () => {
  return (
    <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
      <Routes>
        <Route path='/home/*' element={<Home/>}/>
        {/* IF THE ROUTE NOT MATCHING */}

        <Route path='*' element={<Navigate to={"/home"}/>}/>
      </Routes>
    </div>
  )
}

export default App
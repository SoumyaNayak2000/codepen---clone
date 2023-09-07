import React, { useEffect } from 'react'
import { Routes , Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import { auth } from './config/firebase.config'


const App = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    const unSubscribe = auth.onAuthStateChanged(userCredential=>{
      if(userCredential){
        console.log(userCredential.providerData[0])
      }else{
        navigate("/home/auth",{replace : true})
      }
    })
  },[])
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
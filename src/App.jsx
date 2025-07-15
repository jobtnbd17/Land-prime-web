import React from 'react'
import AppRouter from './routes/AppRouter'
import { Slide, ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <ToastContainer autoClose={1500} position='bottom-right' transition={Slide}/>
      <AppRouter/>
    </div>
  )
}

export default App
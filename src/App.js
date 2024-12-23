import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routing from './routing'
import './assets/fonts/fontStyle.css'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
      <Routing />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App

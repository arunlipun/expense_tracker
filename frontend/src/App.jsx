import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
     <AppRoutes/> 
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </div>
  )
}

export default App

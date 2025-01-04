import React from 'react'
import { Route, Routes } from 'react-router'
import {Toaster} from 'react-hot-toast'
import routes from './routes'

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        {
          routes.map((item , index) => <Route key={index} path={item.path} element={item.element} />)
        }
      </Routes>
    </div>
  )
}

export default App

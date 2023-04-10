import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './containers/Login'
import Home from "./containers/Home"
import EditQuiz from './components/editquiz'
import TakeQuiz from "./components/TakeQuiz"
import Update from './components/update'
import './App.css'
import {Routes, Route} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path ="/editQuiz" element={<EditQuiz/>}/>
        <Route path='/takeQuiz' element={<TakeQuiz/>}/>
        <Route path ="/update" element={<Update/>}/>
      </Routes>
    </div>
  )
}

export default App

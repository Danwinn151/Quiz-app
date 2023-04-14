import Login from './containers/Login'
import Home from "./containers/Home"
import EditQuiz from './components/editquiz'
import TakeQuiz from './components/Quiz'
import Update from './components/updateQuiz'
import Questions from './components/questionsModal'
import './App.css'
import {Routes, Route} from "react-router-dom"

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path ="/editQuiz" element={<EditQuiz/>}/>
        <Route path ="/update" element={<Update/>}/>
        <Route path ="/questions" element={<Questions/>}/>
        <Route path='/takeQuiz/:id' element={<TakeQuiz/>}/>
      </Routes>
    </div>
  )
}

export default App

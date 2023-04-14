import React, {
    useEffect, 
    useState, 
    useContext,
} 
from "react"
import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
import {useNavigate} from "react-router-dom"
import {auth} from "./firebase"
import axios from "axios"

const AuthContext = React.createContext()
const API_BASE_URL = 'http://localhost:3000/api/v1/quiz';





export const AuthProvider = ({children}) => {

const [showModal, setShowModal] = useState(false)
const [showQuestionModal, setShowQuestionModal] = useState(false)

 const handleCloseModal = (e) => {
  e.preventDefault()
  setShowModal(false)
}
const handleOpenModal = (e) => {
  setShowModal(true)
} 

const handleOpenQuestionModal = (e) => {
  setShowQuestionModal(true)
} 

const handleCloseQuestionModal = (e) => {
  e.preventDefault()
  setShowQuestionModal(false)
}

  //login functionality
const signIn = () => {
  const provider = GoogleAuthProvider()
  signInWithPopup(auth, provider)
}

//posting quizdetails using axios
const postQuizDetails = async (name, description, timeLimit, points) => {
  const response = await axios.post(`${API_BASE_URL}`, {
    name,
    description,
    timeLimit,
    points,
  });
  return response.data;
};

//getting quizDetails using axios

const getQuizDetails = async () => {
const response = await axios.get(`${API_BASE_URL}`)
return response.data

}

//deleting quizDetails using axios

const  deleteQuizDetails = async (quizId) => {
try{
  const response = await axios.delete(`${API_BASE_URL}/${quizId}`)
  console.log(response)
}
catch(error) {
    console.error(error);
    // handle error response here
  }
}
const editQuizDetails = async (quizId, updatedQuizName, updatedQuizDescription, updatedQuizPoints, updatedQuizTimeLimit) => {
   try{
 const response = await axios.patch(`${API_BASE_URL}/${quizId}`, {
      // quiz data to be updated
      name: updatedQuizName,
      description: updatedQuizDescription,
      points: updatedQuizPoints,
      timeLimit: updatedQuizTimeLimit,
        
    })
    window.location.reload()
    console.log(response.data)
    } catch (error) {
       console.log(error)
   }
}

const createQuestionByQuizId = async(quizId, prompt, options, correctAnswer) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/questions/${quizId}`, {
         prompt,
         options,
         correctAnswer
      })
      return response.data
    } catch (error) {
      
    }
}

const fetchQuizData = async (quizId) => {
  const response = await axios.get(`${API_BASE_URL}/questions/${quizId}`);
  console.log(response)
 // Convert minutes to seconds
};

    return <AuthContext.Provider value={{
        signIn,
        postQuizDetails,
        getQuizDetails,
        editQuizDetails,
        deleteQuizDetails,
        createQuestionByQuizId,
        handleCloseModal,
        handleOpenModal,
        showModal,
        handleOpenQuestionModal,
        handleCloseQuestionModal,
        showQuestionModal,
        setShowQuestionModal
        }}>
      {children}
    </AuthContext.Provider>
}

export const useGlobalContext = () => {
   return useContext(AuthContext)
}
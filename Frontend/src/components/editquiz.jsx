import React, { useEffect, useState } from "react"
import {VscMenu} from "react-icons/vsc"
import {FaUserAlt} from "react-icons/fa"
import { FiEdit2 } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../AuthContext"
import { AiOutlineDelete } from 'react-icons/ai';
import UpdateModal from './updateQuiz'
import QuestionsModal from "./questionsModal";
import AddQuestion from "./addquestion"
import QuizSpinner from "./Spinner";
import QuizDetails from "./QuizDetails";


const EditQuizPage = () => {
   const [showDetails, setShowDetails] = useState(false)
    const [quizDetails, setQuizDetails] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const[isViewQuestion, setIsViewQuestion] = useState(false)
    const [quizId, setQuizId] = useState(null);
    const [quizName, setQuizName] = useState(null)
    const [quizDescription, setQuizDescription] = useState(null)
    const [quizTimeLimit, setQuizTimeLimit] = useState(null)
    const [quizPoints, setQuizPoints] = useState(null)
    const[questionId, setQuestionId] = useState(null)

    const [stateValue, setStateValue] = useState(null)
    const navigate = useNavigate()
    const handleStateChange = (event) => {
      setStateValue(event.target.value)
    }

    const {getQuizDetails, deleteQuizDetails, showModal, showQuestionModal,
      handleOpenModal, handleCloseModal, handleOpenQuestionModal, handleCloseQuestionModal} = useGlobalContext()

    const handleFetchQuizDetails = async () => {
         try{
          setShowDetails(false)
          const data = await getQuizDetails()
          
           const {allTasks} = data
           setQuizDetails(allTasks)
           setShowDetails(true)
         } catch(error){
            console.log(error)
         }
    }
    useEffect(() => {
         handleFetchQuizDetails()
    },[])

   const handleDeleteDetails = async (id) => {
        try {
         await deleteQuizDetails(id)
         window.location.reload()
           
        } catch(error){
           console.log(error)
        }

   }

   const handleIsModalOpen = (id, name, description, timeLimit, points) => {
     setIsModalOpen(true) // Set the quiz id in the state
     setQuizId(id)
     setQuizName(name)
     setQuizDescription(description)
     setQuizTimeLimit(timeLimit)
     setQuizPoints(points)
  }

  const handleIsModalClose = () => {
    setIsModalOpen(false) // Set the quiz id in the state
 }

 const handleIsQuestionModalOpen = (id) => {
  handleOpenQuestionModal()// Set the quiz id in the state
  setQuizId(id)
}

const handleIsViewQuestionModalOpen = (id) => {
    setQuestionId(id)
   setIsViewQuestion(true)
}
 
const handleIsViewQuestionModalClose = (id) => {

  setIsViewQuestion(false)
}


    return (
        <div>
          <nav className='bg-blue-400 p-5 '>
           <div className='flex flex-row justify-between'>
             <div className="flex justify-center items-center">
            {<VscMenu/>}
             </div>

              <div>
              <h1 className='font-poppins font-semibold '><Link className="limkk" to={"/"}>Quiz App </Link></h1>
             </div>

            <div className='flex justify-center items-center text-[25px]'>
            {<FaUserAlt/>}
            </div>

      </div>
         </nav>
         
 {!showDetails ? 
 <div className="flex justify-center items-center pt-2">
  <QuizSpinner statusMessage="Loading quiz details..." />
 </div>
 : 
 <div className="text-center p-3 mt-4">
    <h2 className="text-2xl font-bold mb-2">Your Created Quizzes</h2>
  {quizDetails < 1 ? "No quiz found" : 
    <>
      <div className="">
    {quizDetails.map((detail) => {
      const { name, timeLimit, description, points, _id, questions } = detail;
      console.log(questions)
      return (
        <div className="flex flex-col mt-3 p-3 bg-white rounded-md shadow-md" key={_id}>
         
          <div className="flex flex-row justify-between shadow-md mt-3 p-3 bg-black rounded-md">

            <div className="flex flex-col items-center justify-center">
              <p className="text-white font-poppins font-thin">{name}</p>
              <div className="add-question-btn">
                <button onClick={() => handleIsQuestionModalOpen(_id)} className="bg-blue-700 hover:bg-blue-500 text-white font-poppins">
                  Add Question
                </button>
              </div>
            </div>
      
      
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex flex-row gap-3">
             <FiEdit2 onClick={() => handleIsModalOpen(_id, name, description, timeLimit, points)} />
              <AiOutlineDelete onClick={() => handleDeleteDetails(_id)} />
          </div>
          {questions.length > 0 &&
          <div>
            <button onClick={() => {
             handleIsViewQuestionModalOpen(_id)
            }} className="bg-green-700 hover:bg-green-400 shadow-lg font-poppins text-white">View Questions</button>
          </div>
          }
          
      </div>
            

            {isModalOpen && (
              <div className={`${
                handleOpenModal ? 'modal-overlay show-modal' : 'modal-overlay'
              }`}>
                <div className="modal-container">
                  <UpdateModal name={quizName} id={quizId} description={quizDescription} timeLimit={quizTimeLimit} points={quizPoints} handleModalClose={handleIsModalClose} handleIsModalClose={handleIsModalClose} />
                </div>
              </div>
            )}

            {showQuestionModal && (
              <div className={`${
                handleOpenModal ? 'modal-overlay show-modal' : 'modal-overlay'
              }`}>
                <div className="modal-container">
                  <AddQuestion id={quizId}  handleCloseQuestionModal={handleCloseModal} />
                </div>
              </div>
            )} 
          </div>

          {isViewQuestion && (
            <div className={`${
               handleOpenModal ? 'modal-overlay show-modal' : 'modal-overlay'
              }`}>
                <div className="modal-container">
                  <QuestionsModal id={quizId} questions={questions}  handleCloseViewQuestionModal={handleIsViewQuestionModalClose} />
                </div>
              </div>
          )}

           <div className="mt-3 p-3 bg-white">
           <QuizDetails timeLimit={timeLimit} description={description} points={points} />
           {questions.length > 0 &&
           <div className="take-quiz-container mt-2">
           <button onClick={() => navigate(`/takeQuiz/${_id}`)} className="bg-red-500">Take quiz </button>
           </div>
           }
          </div>
           
           


        </div>
      );
    })}
  </div>
  
    </>
  }
  
</div>
 }
 

          
 
        </div>
    )
}

export default EditQuizPage 
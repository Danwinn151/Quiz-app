import React, { useState, useEffect } from 'react'
import axios from 'axios';
import QuizSpinner from './Spinner';
const questionsModal = ({handleCloseViewQuestionModal, id}) => {
 console.log(id)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchQuizData = async () => {
      if(id) {
        const response = await axios.get(`https://quiz-app-service2.onrender.com/api/v1/quiz/${id}`);
      const fetchedQuestions = response.data.singleQuizWithId.questions;
      setQuestions(fetchedQuestions);
      }
    };
    fetchQuizData();
  }, []);
  console.log(questions)
    return (
      <div>
      {questions?.length ? 
      <>
        <div className="modal-background "></div>
        <div className="bg-white rounded-lg shadow-lg p-5 w-[250px] flex flex-col">
          <header className="text-center">
            <p className="font-bold font-mono">Questions</p>
            <button className="delete" aria-label="close" ></button>
          </header>
          <section className="">
            {questions.map((question, index) => (
              <div key={question?.index}>
              <h1 className='text-sm font-bold'>{question?.prompt} ? </h1>
                <ul className='t'>
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li> 
                  ))}
                </ul>
                <p className='font-poppins font-thin '><span className='text-green-500'>Correct Answer:</span> {question.correctAnswer}</p>
              </div>
            ))}
          </section>
          <footer className="text-center mt-3">
            <button onClick={handleCloseViewQuestionModal} className="button shadow-md bg-red-200">Close</button>
          </footer>
        </div> : 
      </> : <QuizSpinner statusMessage={"loading questions"}/>
       
      }
   </div>
    );
  }

export default questionsModal
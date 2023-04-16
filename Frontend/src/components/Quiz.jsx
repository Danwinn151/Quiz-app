import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      const response = await axios.get(`https://quiz-app-service2.onrender.com/api/v1/quiz/${id}`);
      console.log(response.data)
      const fetchedQuestions = response.data.singleQuizWithId.questions;
      setQuestions(fetchedQuestions);
      setScore(fetchedQuestions.reduce((total, question) => total + question.points, 0));
      console.log(response.data.singleQuizWithId.timeLimit * 60)
      setTimeLeft(response.data.singleQuizWithId.timeLimit * 60);
      setTotalPoints(fetchedQuestions.reduce((total, question) => total + question.points, 0));
    };
    fetchQuizData();
  }, [id]);



  useEffect(() => {
    setIsQuizCompleted(false)
   
     return () => {
      clearInterval(timer)
     setIsQuizCompleted(true)
     }
     
  }, []);

  useEffect(() => {
    if(timeLeft === 0){
      setIsQuizCompleted(true)
    }
  },[timeLeft])

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    alert("testing")
    const isCorrect = selectedOption === questions[currentQuestionIndex]?.correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedOption('');
   setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
   console.log(currentQuestionIndex)
   
   const question = questions[currentQuestionIndex]

    
  };

  
if (isQuizCompleted) {
    return (
      <div>
        <h1>Quiz completed!</h1>
        <p>Your score is: {!score ? "0" : score}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Quiz: {questions.length} Questions</h1>
      <h2>Time Remaining: {timeLeft} seconds</h2>
      <div>
        <h3>{questions[currentQuestionIndex]?.prompt}</h3>
        <ul>
        {questions[currentQuestionIndex] && questions[currentQuestionIndex]?.options.map((option) => (
       <li key={option}>
        <button
      onClick={() => handleOptionSelect(option)}
      disabled={selectedOption !== ''}
       >
      {option}
    </button>
      </li> 
     ))}
        </ul>
        <div className='text-center '>
          <button className='bg-red-500'
          onClick={handleNextQuestion}
          disabled={selectedOption === ''}
        >
          Next
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default Quiz;

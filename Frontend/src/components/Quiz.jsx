import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [point, setPoint] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      const response = await axios.get(`https://quiz-app-service2.onrender.com/api/v1/quiz/${id}`);
      console.log(response)
      const fetchedQuestions = response.data.singleQuizWithId.questions;
      setQuestions(fetchedQuestions);
      console.log(questions.length)
      setPoint(response.data.singleQuizWithId.points)
      console.log(point)
      setScore(fetchedQuestions.reduce((total, question) => total + question.points, 0));
      setTimeRemaining(response.data.singleQuizWithId.timeLimit * 60);
      console.log(questions)
      console.log(questions[currentQuestionIndex].options)
    };
    fetchQuizData();
  }, [id]);

  useEffect(() => {
    if (timeRemaining === 0) {
      setIsQuizCompleted(true);
      const nextQuestion = currentQuestionIndex
      nextQuestion = nextQuestion + 1
    }
  }, [timeRemaining]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOption === questions[currentQuestionIndex].correctOption;
    if (isCorrect) {
      setScore(score + point);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    console.log(nextQuestionIndex)
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setIsQuizCompleted(true);
    }
    setSelectedOption('');
  };

  
// if (isQuizCompleted) {
//     return (
//       <div>
//         <h1>Quiz completed!</h1>
//         <p>Your score is: {score}/{questions.reduce((total, question) => total + question.points, 0)}</p>
//       </div>
//     );
//   }
  return (
    <div>
      <h1>Quiz: {questions.length} Questions</h1>
      <h2>Time Remaining: {timeRemaining} seconds</h2>
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

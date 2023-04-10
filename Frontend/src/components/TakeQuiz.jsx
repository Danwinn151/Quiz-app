import React, { useState, useEffect } from 'react';

const Quiz = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Fetch quiz data from your backend API
    // const fetchQuizData = async () => {
    //   const response = await fetch(`/api/quizzes/${quizId}`);
    //   const data = await response.json();
    //   setQuestions(data.questions);
    //   setTimeRemaining(data.timeLimit * 60); // Convert minutes to seconds
    // };
    // fetchQuizData();
  }, [quizId]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Quiz is over, show final score
      console.log(`Your score: ${score}/${questions.length}`);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Testing</h1>
      <ul>
        {/* {currentQuestion.answerOptions.map((answerOption) => (
          <li key={answerOption.id} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
            {answerOption.answerText}
          </li>
        ))} */}
      </ul>
      <p>Time remaining: {timeRemaining} seconds</p>
    </div>
  );
};

export default Quiz;
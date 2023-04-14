import React from 'react';
import { PropagateLoader } from 'react-spinners';

const QuizSpinner = ({ statusMessage }) => {
  return (
    <div className="quiz-spinner-container flex justify-center items-center pt-3 text-center">
      <PropagateLoader size={15} color={'#4CAF50'} loading={true} />
      <p className="quiz-spinner-message">{statusMessage}</p>
    </div>
  );
};

export default QuizSpinner;

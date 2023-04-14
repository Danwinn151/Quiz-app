import React from 'react'

const questionsModal = ({handleCloseViewQuestionModal, questions}) => {
  console.log(questions)
    return (
      <div className=''>
        <div className="modal-background "></div>
        <div className="bg-white rounded-lg shadow-lg p-5 w-[200px]">
          <header className="text-center">
            <p className="font-bold font-mono">Questions</p>
            <button className="delete" aria-label="close" ></button>
          </header>
          <section className="">
            {questions.map((question, index) => (
              <div key={question._id}>
              <h1 className='text-sm font-bold'>{question.prompt} ? </h1>
                <ul className='t'>
                <li className='list-disc'>
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li> 
                  ))}
                </li>
                </ul>
                <p className='font-poppins font-thin '><span className='text-green-500'>Correct Answer:</span> {question.correctAnswer}</p>
              </div>
            ))}
          </section>
          <footer className="text-center mt-3">
            <button onClick={handleCloseViewQuestionModal} className="button shadow-md bg-red-200">Close</button>
          </footer>
        </div>
      </div>
    );
  }

export default questionsModal
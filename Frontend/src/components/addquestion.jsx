import React, {useState} from 'react'
import { useGlobalContext } from '../../AuthContext'
import { useFormik } from 'formik';
import { Fragment } from 'react';

const questionPage = ({id}) => {
  console.log(id)
  const {createQuestionByQuizId, handleCloseQuestionModal, setShowQuestionModal} = useGlobalContext()
  //this will store the questions data
    const [questions, setQuestions] = useState([])
    const [options, setOptions] = useState(['', ''])
    const [correctAnswer, setCorrectAnswer] = useState([])
    //the functionality to store new questions 
    const addNewQuestion = (prompt, options, answer) => {

      const newQuestion = {
        prompt,
        options,
        answer,
      }
      setQuestions([...questions, newQuestion])
    }
    
const initialValues = {
  prompt: '',
  options: ['', '', '', ''],
  correctAnswer: '',
};

    const formik = useFormik({
      initialValues,
      onSubmit: values => {
        // handle form submission here
        console.log(values)
        const {prompt, options, correctAnswer} = values
        const newQuestionDetails = {
          prompt,
          options,
          correctAnswer,
        }
      createQuestionByQuizId(id, prompt, options, correctAnswer)
      window.location.reload()
      setQuestions([...questions, newQuestionDetails])
      setShowQuestionModal(false)
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit} className="w-full max-w-lg">
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-gray-700 font-bold mb-2">
            Question Prompt
          </label>
          <input
            id="prompt"
            name="prompt"
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.prompt}
          />
          {formik.touched.prompt && formik.errors.prompt ? (
            <p className="text-red-500 text-xs italic">{formik.errors.prompt}</p>
          ) : null}
        </div>
        <div className="mb-6">
          <label htmlFor="options" className="block text-gray-700 font-bold mb-2">
            Options
          </label>
          {formik.values.options.map((option, index) => (
            <Fragment key={index}>
              <input
                id={`options[${index}]`}
                name={`options[${index}]`}
                type="text"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={option}
              />
              {formik.touched.options && formik.errors.options?.[index] ? (
                <p className="text-red-500 text-xs italic">{formik.errors.options[index]}</p>
              ) : null}
            </Fragment>
          ))}
        </div>
        <div className="mb-6">
          <label htmlFor="correctAnswer" className="block text-gray-700 font-bold mb-2">
            Correct Answer
          </label>
          <input
            id="correctAnswer"
            name="correctAnswer"
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.correctAnswer}
          />
          {formik.touched.correctAnswer && formik.errors.correctAnswer ? (
            <p className="text-red-500 text-xs italic">{formik.errors.correctAnswer}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    );
  };
  

export default questionPage
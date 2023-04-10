import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import {Form, Formik, Field, useFormik} from "formik"
import { useGlobalContext } from '../../AuthContext';
import * as Yup from 'yup'


const Modal = ({ handleCloseModal }) => {
  const navigate = useNavigate()
  const {signIn, postQuizDetails} = useGlobalContext()
  const [status, setStatus] = useState("")
const validationSchema = Yup.object().shape({
    timeLimit: Yup.number().required('Time limit is required').min(1, 'Time limit must be at least 1 minute').max(60, 'Time limit cannot exceed 60 minutes'),
    points: Yup.number().required('Points/grading system is required').min(1, 'Points/grading system must be at least 1 point'),
    name: Yup.string().required('Quiz name is required'),
  description: Yup.string().required('Quiz description is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      timeLimit: "",
      points: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values.name); // access form data
      console.log(values.description);
      console.log(values.timeLimit);
      console.log(values.points);
      const {name, description, timeLimit, points} = values
      try {
        const post =  await postQuizDetails(name, description, timeLimit, points);  
        if(post){
          setStatus("successfully created")
          setStatus("")
          navigate("/editQuiz")
        }
         
      } catch (error) {
        console.log(error);
      }
    },
  });
  


  return (
    <>
    <Formik
        initialValues={{ name: "", description: "", points: "", timeLimit: "" }}
      >
    {({errors, touched}) => (
     <div className="modal absolute  left-0 right-0  animate-fadeIn flex justify-center debug">
      <div className="modal-content flex flex-col w-[300px]">
        <h2>Create Your Quiz</h2>
        <Form  onSubmit={formik.handleSubmit} className='flex flex-col items-center p-5 shadow-md w-full bg-green-100 rounded-md'>
          <label htmlFor="name">Name:</label>
          <input
        type="text"
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
           {formik.errors.name && formik.touched.name ? (
        <small>{formik.errors.name}</small>
      ) : null}
          <label htmlFor="description">Description:</label>
          <input
        type="text"
        id="description"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
         {formik.errors.description && formik.touched.description ? (
        <small>{formik.errors.description}</small>
      ) : null}
          <label htmlFor="points">Points/grading System:</label>
          <input
        type="number" 
        id="points" 
        name="points" 
        onChange={formik.handleChange}
        value={formik.values.points}
      />
            {formik.errors.points && formik.touched.points ? (
        <small>{formik.errors.points}</small>
      ) : null}
          <label htmlFor="timeLimit">Time Limit:</label>
          <input
       type="number" 
       id="timeLimit" 
       name="timeLimit"
        onChange={formik.handleChange}
        value={formik.values.timeLimit}
      />
          {formik.errors.timeLimit && formik.touched.timeLimit ? (
        <small>{formik.errors.timeLimit}</small>
         ) : null}

          <button type="submit" className='bg-blue-300 mt-3'>Create</button>
        </Form>
        <small className="text-green-500 font-poppins">{status}</small>
        <button type="submit" className='bg-red-500 mt-4' onClick={handleCloseModal}>Close</button>
      </div>
    </div>
    )}
    
        
      </Formik>
      
    </>
    
  );
};

export default Modal;
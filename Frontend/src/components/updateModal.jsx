import React from 'react'
import {Form, Formik, Field, useFormik} from "formik"
import { useGlobalContext } from "../../AuthContext"
import {useNavigate } from 'react-router-dom'

import * as Yup from 'yup'


const updateModal = ({id, quizName}) => {
  console.log(quizName)
    const {editQuizDetails, handleCloseModal} = useGlobalContext()
   

    const validationSchema = Yup.object().shape({
        timeLimit: Yup.number().required('Time limit is required').min(1, 'Time limit must be at least 1 minute').max(60, 'Time limit cannot exceed 60 minutes'),
        points: Yup.number().required('Points/grading system is required').min(1, 'Points/grading system must be at least 1 point'),
        name: Yup.string().required('Quiz name is required'),
      description: Yup.string().required('Quiz description is required'),
      });
    
      const formik = useFormik({
        initialValues: {
          name: '',
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
            const edited =  await editQuizDetails(id, name, description, timeLimit, points);
            window.location.reload()
            
            if(edited){
            console.log(edited)
            }
             
          } catch (error) {
            console.log(error);
          }
        },
      });
      
    
    
      return (
        <div>
        <Formik
            initialValues={{
              name: '',
              description: '',
              points: '',
              timeLimit: '',
            }}
            validationSchema={validationSchema}
            onSubmit={formik.handleSubmit}
          >
        {({errors, touched}) => (
         <div className="modal absolute top-[-50px] left-0 right-0  animate-fadeIn flex justify-center debug">
          <div className="modal-content flex flex-col w-[300px]">
            <h2>Edit Your Quiz</h2>
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
    
              <button type="submit" className='bg-blue-300 mt-3'>Edit</button>
            </Form>
            <small className="text-green-500 font-poppins">{status}</small>
            <button type="submit" className='bg-red-500 mt-4' onClick={handleCloseModal}>Close Modal</button>
          </div>
        </div>
        )}
        
            
          </Formik>
          
    </div>
  )
}

export default updateModal
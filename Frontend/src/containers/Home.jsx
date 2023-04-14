import React, { useState } from 'react'
import {VscMenu} from "react-icons/vsc"
import {FaUserAlt} from "react-icons/fa"
import {Link} from "react-router-dom"
import CreateQuizModal from '../components/CreateQuizModal'
import TakeQuiz from "../components/Quiz"
const Home = () => {
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = (e) => {
    e.preventDefault()
    setShowModal(false)
  }
  const handleOpenModal = () => {
    setShowModal(true)
  }
  return (
    <div>
    <nav className='bg-blue-400 p-5 '>
      <div className='flex flex-row justify-between'>
         <div className="flex justify-center items-center">
            {<VscMenu/>}
         </div>

         <div>
           <Link to={"/"}><h1 className='font-poppins font-semibold '>Quiz App</h1></Link>
         </div>

            <div className='flex justify-center items-center text-[25px]'>
            {<FaUserAlt/>}
            </div>

      </div>
    </nav>

    <div className='mt-[150px] text-center '>
      <p className='mb-5'>
        You are welcome to the quiz app
      </p>
      <div>
      <button onClick={handleOpenModal}>Play Now</button>
      <div className={`z-10 inset-0 overflow-y-auto ${showModal ? "animate-fadeIn": "animate-fadeOut"}`}>
        {showModal && 
          <div
      className={`${
        handleOpenModal ? 'modal-overlay show-modal' : 'modal-overlay'
      }`}
    >
        <div className="modal-container">
        <CreateQuizModal handleCloseModal={handleCloseModal}/>
        </div> 
      </div>
        }
      </div>
    
    </div>
    </div>
    </div>
  )
} 

export default Home
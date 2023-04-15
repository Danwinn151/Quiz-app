import React, { useState,useRef, useEffect } from 'react'
import {VscMenu} from "react-icons/vsc"
import {FaUserAlt} from "react-icons/fa"
import {Link} from "react-router-dom"
import CreateQuizModal from '../components/CreateQuizModal'
import TakeQuiz from "../components/Quiz"
import SideBar from "../components/Sidebar"
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from "react-icons/ai"


const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const scrollRef = useRef(null)
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)

  const handleCloseModal = (e) => {
    e.preventDefault()
    setShowModal(false)
  }
  const handleOpenModal = () => {
    setShowModal(true)
  }

  // useEffect(() => {
  //   scrollRef. current.scrollTo(0,0)
  // },[])
  return (
    <div>
    <nav className='bg-blue-400 p-5 '>
      <div className='flex flex-row justify-between'>
         <div className="flex justify-center items-center">
            {<VscMenu onClick={() => setToggleSidebar(true)} />}
         </div>

         <div>
           <Link to={"/"}><h1 className='font-poppins font-semibold '>Quiz App</h1></Link>
         </div>

            <div className='flex justify-center items-center text-[25px]'>
            {<FaUserAlt/>}
            </div>

      </div>
    </nav>
    <div className=''>
        <div className='hidden md:flex '>
          <SideBar closeSideBar={setToggleSidebar}/>
        </div>
        <div className='mt-[150px] lg:mt-0 flex flex-col justify-center items-center'>
      <p className='mb-5 text-center '>
        You are welcome to the quiz app
      </p>
      <button onClick={handleOpenModal}>Play Now</button>
      <div>
    </div>

    

      
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

      {toggleSidebar && 
       <div className='bg-white fixed h-screen overflow-y-auto md:hidden top-20 right-[100px] shadow-md animate-slide-in z-10  w-3/4'>
         <div className='flex justify-end absolute w-full items-center p-2'>
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
         </div>
         <SideBar user={user} closeToggle={setToggleSidebar}/>
       </div>
       }
    
    </div>
    </div>
    </div>
  )
} 

export default Home
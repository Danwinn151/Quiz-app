import React,{useState} from 'react'
import { AuthProvider } from '../../AuthContext'
import {FaUserFriends, FaUserCheck} from "react-icons/fa"
import {GiPadlock} from "react-icons/gi"
import {MdAlternateEmail} from "react-icons/md"

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"

import { auth } from '../../firebase'


const Login = () => {
  const [user, setUser] = useState([])

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
   signInWithPopup(auth, provider)
  //signInWithRedirect(auth, provider)
}


const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
  setUser(currentUser)
 localStorage.setItem('user', JSON.stringify(currentUser))
 })  


 useEffect(() => {
  unsubscribe()
 },[])
  return (
    <div>

      <div className='my-5'>
        <h1 className='font-poppins'>Quiz App</h1>
      </div>

   <form>
   <div className='p-3'>
    <label className="block">
    <span className="block text-sm font-medium text-slate-700">
    <div className='flex flex-row gap-20 items-center'>
      <FaUserFriends/>
      <p className='text-sm'>Username</p> 
    </div>
    </span> <br/>
    <input type="text" className='p-2 w-full outline-none bg-white shadow-sm'/>
  </label> <br/>
  <label className="block">
    <span className="block text-sm font-medium text-slate-700">
    <div className='flex flex-row gap-20 items-center'>
      <MdAlternateEmail/>
      <p className='text-sm'>Email</p> 
    </div>
    </span> <br/>
    <input type="text" className='p-2 w-full outline-none bg-white shadow-sm'/>
  </label> <br/>
  <label className="block">
    <span className="block text-sm font-medium text-slate-700">
    <div className='flex flex-row gap-20 items-center'>
      <GiPadlock/>
      Password
    </div>
    </span> 
    <input type="text" className='p-2 w-full outline-none bg-white shadow-sm'/>
    <br/>
  </label> <br/>
   </div>
      <div>
        <button onClick={googleSignIn} className='bg-blue-500 text-white'>Register</button>
      </div>
   </form>
    </div>
  )
}

export default Login
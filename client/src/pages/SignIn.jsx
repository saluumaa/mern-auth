// import { set } from 'mongoose'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/User/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector(state => state.user)
  console.log(error)
const navigate = useNavigate()
const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      dispatch(signInStart())
      dispatch(signInFailure(''))
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      
      if(data.success ===false){
        dispatch(signInFailure(data))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    }catch(err){
      dispatch(signInFailure(err))
     
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form className='flex flex-col gap-2 items-center' onSubmit={handleSubmit} >
    
        <input type='email' 
        placeholder='Email' 
        id='email'
         className='border border-gray-400 rounded-md p-1 w-80 my-2'
         onChange={handleChange}
         />
        <input type='password'
         placeholder='Password' 
        id='password'
         className='border border-gray-400 rounded-md p-1 w-80 my-2' 
         onChange={handleChange}
         />
        <button disabled={loading} className='bg-blue-500 text-white rounded-md p-1 w-80 my-2 hover:bg-opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
          </button>
      </form>
      <div className='flex gap-2 mt-5 px-20'>
        <p>Dont have an account? </p>
          <Link to='/sign-up'><span className='text-blue-500'>Register</span></Link>         
        </div>
        <p className='text-red-500 text-center mt-5'>
          {error ? error.message || 'Something went wrong': ''}
        </p>
    </div>
  )
}

export default SignIn
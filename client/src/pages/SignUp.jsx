import { set } from 'mongoose'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setLoading(true)
      setError(false)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setLoading(false)
      if(data.success ===false){
        setError(true)
        return
      }
      navigate('/signIn')
    }catch(err){
      setError(true)
      setLoading(false)
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form className='flex flex-col gap-2 items-center' onSubmit={handleSubmit} >
        <input type='text' 
        placeholder='Username'
         id='username' 
         className='border border-gray-400 rounded-md p-1 w-80 my-2'
         onChange={handleChange}
         />
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
          {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth />
      </form>
      <div className='flex gap-2 mt-5 px-20'>
        <p>Already have an account? </p>
          <Link to='/signIn'><span className='text-blue-500'>Login</span></Link>         
        </div>
        <p className='text-red-500 text-center mt-5'>
          {error && 'Something went wrong'}
        </p>
    </div>
  )
}

export default SignUp
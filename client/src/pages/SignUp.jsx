import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form className='flex flex-col gap-2 items-center'>
        <input type='text' placeholder='Username' id='username' className='border border-gray-400 rounded-md p-1 w-80 my-2' />
        <input type='email' placeholder='Email' id='email' className='border border-gray-400 rounded-md p-1 w-80 my-2' />
        <input type='password' placeholder='Password' className='border border-gray-400 rounded-md p-1 w-80 my-2' />
        <button className='bg-blue-500 text-white rounded-md p-1 w-80 my-2 hover:bg-opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5 px-20'>
        <p>Already have an account? </p>
          <Link to='/signIn'><span className='text-blue-500'>Login</span></Link>         
        </div>
    </div>
  )
}

export default SignUp
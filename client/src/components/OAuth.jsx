import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/User/userSlice'

const OAuth = () => {
    const dispatch = useDispatch()

    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data))
        }catch(err){
            console.log(err)
        }
    }

  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-md p-1 w-80 my-2 hover:bg-opacity-95'>Continue with Google</button>
  )
}

export default OAuth
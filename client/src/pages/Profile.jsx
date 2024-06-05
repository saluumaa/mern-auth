import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOut } from "../redux/User/userSlice"

const Profile = () => {
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const dispatch = useDispatch()


  useEffect(() => {
    if(image){
      handleFileUpload(image)
    }
  }, [image])

  const handleFileUpload = async(image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + '-' + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress))
      console.log('Upload is ' + progress + '% done');
      // console.log('Upload is ' + progress + '% done');
      // switch (snapshot.state) {
      //   case 'paused':
      //     console.log('Upload is paused');
      //     break;
      //   case 'running':
      //     console.log('Upload is running');
      //     break;
      // }
    },
    (error) => {
      setImageError(true)
    },
    ()=> {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
        setFormData({...formData, profilePicture: downloadURL}));
    
    }
    )
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleDeleteAccount = async() => {
    try{
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      console.log(data)
      if(data.success === false){
        dispatch(deleteUserFailure(data))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch(err){
      dispatch(deleteUserFailure(err))
    }
  }

  const handleSignout = async() => {
    try{
      await fetch('/api/auth/signout')
      dispatch(signOut())
    } catch(err){
      console.log(err)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserFailure(data))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    }
    catch(err) {
      dispatch(updateUserFailure(err))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'> Profile </h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
      <input type="file" ref={fileRef} hidden accept="image/*"  
      onChange={(e) => setImage(e.target.files[0])}
      />
     <img src={formData.profilePicture ||  currentUser.profilePicture} alt="profile" 
     className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2" 
     onClick={() => fileRef.current.click()}
     />
    <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-yellow-500-700'>{`Uploading: ${imagePercent} %`} 
            </span>
          )  : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
    <input defaultValue={currentUser.username} type="text" id='username'
    placeholder="Username" className="bg-slate-100 rounded-lg p-3" 
    onChange={handleChange}
    />
    <input defaultValue={currentUser.email} type="email" id='email'
    placeholder="Email" className="bg-slate-100 rounded-lg p-3" 
    onChange={handleChange}
    />
    <input type="password" id='password'
    placeholder="Password" className="bg-slate-100 rounded-lg p-3" 
    onChange={handleChange}
    />

  <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:placeholder-opacity-95 disabled:bg-opacity-80 ">
     {loading ? 'Loading...' : 'Update'}
    </button>
    </form>
    <div className=" flex justify-between mt-5">
      <span onClick={handleDeleteAccount} className="text-red-700 cursor-pointer">Delete Account</span>
      <span onClick={handleSignout} className="text-red-700 cursor-pointer">Sign Out</span>
     
    </div>
    <p className="text-red-700 mt-5">
        {error && 'something went wrong' }
      </p>
      <p className="text-green-700 mt-5">
        {updateSuccess && 'Profile updated successfully' }
      </p>
    </div>
  )
}

export default Profile
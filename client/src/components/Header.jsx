import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
  const {currentUser} = useSelector((state) => state.user )

  return (
    <div className='bg-slate-200'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
       <Link to='/'>
         <h1 className='font-bold'>AuthApp</h1>
        </Link>
          <ul className='flex gap-4'>
            
          <Link to='/'><li className='inline p-4'><a href='/'>Home</a></li> </Link>
          <Link to='/about'> <li className='inline p-4'><a href='/about'>About</a></li></Link>
          <Link to='/profile'> 
          {currentUser ? (
            <img src={currentUser.profilePicture} alt="profile" className='h-7 w-7 rounded-full object-cover' />
          ):(
            <Link to='/signIn'>
            <li className='inline p-4'>SignIn</li> 
             </Link>
          )}
          </Link>
          </ul>
      </div>
    </div>
  )
}

export default Header
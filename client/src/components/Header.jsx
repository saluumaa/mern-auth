import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='bg-slate-200'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
       <Link to='/'>
         <h1 className='font-bold'>AuthApp</h1>
        </Link>
          <ul className='flex gap-4'>
            
          <Link to='/'><li className='inline p-4'><a href='/'>Home</a></li> </Link>
          <Link to='/about'> <li className='inline p-4'><a href='/about'>About</a></li></Link>
          <Link to='/signIn'> <li className='inline p-4'><a href='/signIn'>SignIn</a></li> </Link>
          </ul>
      </div>
    </div>
  )
}

export default Header
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div>
      <div className='bg-slate-200'>
        <div className='flex justify-between p-4'>
            <h1 className='font-bold'>Auth App</h1>
            <ul className='flex gap-4'>
              <Link to='/'><li >Home</li></Link>
              <Link to='/about'><li >About</li></Link>
              <Link to='/profile'>
              {currentUser ? <img className='w-7 h-7 rounded-full object-cover' src={currentUser.profilePicture} alt="profilePicture" /> : <li >Sign In</li>}
              </Link>
            </ul>
        </div>
      </div>
    </div>
  )
}

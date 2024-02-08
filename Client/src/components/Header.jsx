import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
const Header = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const image = currentUser?.userData?.profilePicture
  const _id = currentUser?.userData?._id;

  const dispacher = useDispatch()
  const handleLogOut = async () => {
    try {
      if (currentUser?.userData?._id) {
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        dispacher(signInSuccess({ currentUser: null, loading: false, error: false }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <div className='bg-slate-200'>
        <div className="flex items-center justify-between max-w-6xl p-3 mx-auto">
        <Link to='/'><h1 className="font-bold"> Auth App</h1></Link>
                <ul className='flex gap-4'>
                <Link to='/'><li>{_id? "Home" : null}</li></Link>
                <Link to='/about'><li>About</li></Link>
                <Link to='/sign-in' onClick={handleLogOut}><li>{document.cookie ? 'Sign Out' : 'Sign In'}</li></Link>
                {currentUser?.userData?._id ? <img className='rounded-full size-7' src={image ? image : "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/4/avatar.jpg"}/> : null} 
                </ul>
        </div>
      </div>
  )
}

export default Header

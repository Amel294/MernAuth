import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import {useDispatch,useSelector} from 'react-redux'
function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  
  const dispatch =  useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'credentials': 'include'
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
  
      const data = await res.json();
      if (!data.userData || !data.userData.token) {
        throw new Error('Access token not provided');
      }
  
      document.cookie = `access_token=${data.userData.token}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/;`;
  
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error(error);
      dispatch(signInFailure(error));
    }
  };
  


  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Enter Email'
          id='email'
          name='email'
          className='p-3 rounded-lg bg-slate-100'
          onChange={handleChange}
        ></input>
        <input
          type='password'
          placeholder='Enter Password'
          id='password'
          name='password'
          className='p-3 rounded-lg bg-slate-100'
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading' : 'Sign In'}
        </button>
      </form>
      <div className='flex justify-center gap-2 mt-5'>
        <p>Dont have an Account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-600'>{error  ? error.message ||  'Something went wrong' : ''}</p>
    </div>
  );
}

export default SignIn;

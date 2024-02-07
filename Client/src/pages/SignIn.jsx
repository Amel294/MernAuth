import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'credentials': 'include' 
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error('Sign-in failed');
      }
      
      const data = await res.json();
      if (!data.token) {
        throw new Error('Access token not provided');
      }
  
      document.cookie = `access_token=${data.token}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/;`;
  
      setLoading(false);
      setError(false);
      navigate( '/')
    } catch (error) {
      setLoading(false);
      setError(true);
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
      <p className='text-red-600'>{error && 'Something went wrong'}</p>
    </div>
  );
}

export default SignIn;

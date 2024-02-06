import { Link } from 'react-router-dom'
function SignUp() {
  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign up</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='username' id='username' className='p-3 rounded-lg bg-slate-100' ></input>
        <input type='email' placeholder='username' id='email' className='p-3 rounded-lg bg-slate-100' ></input>
        <input type='password' placeholder='username' id='password' className='p-3 rounded-lg bg-slate-100' ></input>
        <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80">Sign Up</button>
      </form>
      <div className='flex justify-center gap-2 mt-5'>
        <p>Have an account</p>
        <Link to="/sign-in">
            <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp

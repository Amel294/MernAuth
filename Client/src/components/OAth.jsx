import { GoogleAuthProvider, signInWithPopup, getAuth } from '@firebase/auth';
import { app } from '../firebase';
import {  useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

function OAth() {
    const dispatch = useDispatch()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })
      });
      const data = await res.json();
      dispatch(signInSuccess(data))
    } catch (error) {
      console.log("Could not login with Google", error);
    }
  }

  return (
    <button className="p-3 text-white uppercase bg-red-700 rounded-lg hover:opacity-90" onClick={handleGoogleClick}>
      OATH
    </button>
  );
}

export default OAth;
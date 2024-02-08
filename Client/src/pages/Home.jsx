import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { changeImage } from '../redux/user/userSlice';
import axios from 'axios';



function Home() {
  const { currentUser } = useSelector((state) => state.user)
  const dispacher = useDispatch()
  const _id = currentUser?.userData?._id;
  const username = currentUser?.userData?.username;
  const image = currentUser?.userData?.profilePicture
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id' , _id)

    try {
      const response = await axios.post('http://localhost:3000/api/auth/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully. Cloudinary link:', response.data.url);
      // Save the Cloudinary link to your state or perform further actions
      dispacher(changeImage(response.data.url))
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  console.log()
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <img className="object-cover w-32 h-32 mx-auto rounded-full" src={image ? image : "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/4/avatar.jpg"} alt="" />
          <div>
            <input
              style={{ display: 'none' }}
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
            <button onClick={handleClick}>Select File</button>
          </div>
          <p className="mt-6 text-lg font-semibold text-black">My name is : {username} </p>
        </div>
      </div>
    </section>
  )
}

export default Home

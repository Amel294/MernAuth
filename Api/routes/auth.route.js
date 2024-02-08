import express from "express";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { google, signin, signup, signout } from '../controllers/auth.controller.js';
import UserModel from '../models/user.model.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google', google);
router.get('/signout', signout);



// Configure multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dwpedwb6t',
  api_key: '142418937787817',
  api_secret: 'YUGn1izuKH7QvYwU3PrH_6wn--4'
});

// Handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const userId = req.body.id; // Get the user ID from the request
      console.log('User ID:', userId); // Logs the user ID
  
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Update the user's profile picture with the Cloudinary link
      const user = await UserModel.findByIdAndUpdate(userId, { profilePicture: result.secure_url }, { new: true });
  
      // Delete the temporary file uploaded to the server
      // fs.unlinkSync(req.file.path);
  
      res.json({ url: result.secure_url });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Error uploading file' });
    }
  });


export default router;
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(req.body)
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = UserModel({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save();
        res.status(201).json({ message: "User Created Successfully" });

    } catch (error) {
        next(error)
    }

}


export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
      const validUser = await UserModel.findOne({ email });
      if (!validUser) {
          return res.status(404).json({ error: 'User not found' });
      }
  
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
          return res.status(401).json({ error: 'Wrong credentials' });
      }
  
      const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET);
      
      // Set expiry date for the cookie (e.g., 7 days from now)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      
      // Omit the password field from the user object
      const userData = {
          _id: validUser._id,
          username: validUser.username,
          email: validUser.email,
          profilePicture : validUser.profilePicture,
          token:token
          // Add other fields as needed
      };
      console.log(userData)
      
      res.cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
          domain: 'localhost', // Replace with your domain
          path: '/', // Set to root to make the cookie accessible across the entire website
          secure: false, // Only send the cookie over HTTPS
      }).status(200).json({ userData });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};



export const google = async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new UserModel({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };




  export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
  };
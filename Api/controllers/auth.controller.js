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
    const { email, password } = req.body
    console.log(req.body)
    try {
        const validUser = await UserModel.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not Found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials'))
        const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET)
    let {password:hashedPassword,...rest} = validUser._doc
    rest = {token,...rest}
    const expiryDate = new Date(); // Create a new date object
    expiryDate.setDate(expiryDate.getDate() + 7); // Set expiry to 7 days from now
    
    res.cookie('access_token', token, { 
        httpOnly: true,
        expires: expiryDate // Set the expiry date for the cookie
    }).status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

import bcrypt from 'bcryptjs';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { response } from 'express';

dotenv.config()

// Registration controller
export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const user =await User.findOne({
    email
  })
  console.log(user)
  if (user) {
    return res.status(400).json({ message: 'this email id is already exist' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login controller
export const sigin = async (req, res) => {
  const { email, password } = req.body;
console.log(req.body)
  try {
   const user = await User.findOne({
    email
   })
   if(!user){
    return res.status(404).send({error:"user not found"})
   }
  const passwordCheck =await bcrypt.compare(password,user.password)
  if(!passwordCheck){
    return res.status(400).send({error:"invalid password"})
   }
   const token = jwt.sign(
    {
      userId :user._id,
      userName: user.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn:"1d"
    }
   )
   return res.status(200).send({
    msg:"login sucessfull",
    username:user.username,
    token:token
   })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
};
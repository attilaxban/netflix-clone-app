import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userModel from './db/models/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

import { verifyToken } from './auth.js';
import { getRandomNumber } from './randomNumber.js';

const app = express();
app.use(express.json())
app.use(cookieParser())
dotenv.config();
mongoose.connect(process.env.MONGO_URL)






app.post('/api/v1/users/register', async (req, res) => {
    try {
      const existingUser = await userModel.findOne({
        $or: [
          { email: req.body.email },
          { username: req.body.username }
        ]
      });


      if(existingUser){
        if (existingUser.email === req.body.email) {
          return res.status(400).json({ error: 'Email already exists' });
      }
      else if(existingUser.username === req.body.username){
        return res.status(400).json({error: 'Username already exists'})
      }
      }
   

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await userModel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        promotion: req.body.promotion,
        role: req.body.role
    });
    if(newUser){
      return res.status(201).json({ message: 'User registered successfully' });
    }
    
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/v1/users/login/', async (req, res) => {
  try {
      const user = await userModel.findOne({ username: req.body.username });

      if (!user) {
          return res.status(401).json({ error: 'Invalid username' });
      }

      const passwordMatch = await bcrypt.compare(req.body.password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
        sameSite: 'strict'
      })
      res.status(200).json({ token });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/users/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});

app.get('/api/v1/users/credentials', verifyToken, async (req, res) => {
    try {
      const user = await userModel.findOne({ username: req.user.username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({
        _id : user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        password: user.password,
        email: user.email,
        promotion: user.promotion
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});


app.patch("/api/v1/users/update-credentials/:id", verifyToken, async (req, res) => {
    try {
      const updatedUser = { ...req.body };

      if (updatedUser.password) {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
      }
  
      const user = await userModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedUser },
        { new: true }
      );
  
      return res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.delete('/api/v1/users/delete-user', verifyToken, async (req,res) => {
try {
    const user = await userModel.findOne({email: req.body.email});

    if (req.user.username !== user.username && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to delete this user' });
  }

    const deleted = await user.deleteOne();
    return res.status(201).json({message: 'Deleting user was successful'});
  } catch (err) {

    res.status(500).json({ error: 'Internal server error' });
  }
})






/*---------------------------------*/



app.get('/api/v1/movies/popular', verifyToken, async (req,res) => {

  const pageNumber = getRandomNumber()

  console.log(pageNumber)

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}`,{
      method: 'GET',
      headers:{
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type' : 'application/json'
      }
    })

    if(response.ok){
      const data = await response.json();
      return res.send(data);
    }else{
      return res.status(response.status).send({ error: "Failed to fetch data" });
    }
  } catch (error) {
    return res.status(500).json('Internal server error')
  }

})


app.listen(3000, () => {
console.log('App is running on http://localhost:3000')
})
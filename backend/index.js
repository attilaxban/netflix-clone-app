import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userModel from './db/models/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express();
app.use(express.json())
dotenv.config();
mongoose.connect(process.env.MONGO_URI)

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  };

app.post('/api/v1/users/register', async (req, res) => {
    try {
      const existingUser = await userModel.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const newUser = await userModel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        promotion: req.body.promotion
      });
      ;
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.post('/api/v1/users/login/', async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ email: user.email }, 'secret');
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.get('/api/v1/users/:id', async (req,res,next) => {
    const id = req.params.id;

    try {
        const user = await userModel.findById(id);
        if(user){
            console.log(user)
            return res.json(user)
        }else{
           return res.status(404).json('User not found'); 
        }
    } catch (error) {
        return next(error)
    }
})

app.patch("/api/v1/users/:id", async (req, res, next) => {
    try {
      const user = await userModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { new: true }
      );
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  });

app.delete('/api/v1/users/:id', async (req,res,next) => {
    try {
        const user = await userModel.findById(req.params.id);
        const deleted = await user.deleteOne();
        return res.json(deleted);
      } catch (err) {
        return next(err);
      }
})

app.listen(3001, () => {
    console.log('App is running on http://localhost:3000')
})
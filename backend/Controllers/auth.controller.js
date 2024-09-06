import dotenv from 'dotenv';
import userModel from '../db/models/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';


export async function registerUser(req,res) {
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
}

export async function loginUser(req,res) {
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
}

export async function logOutUser(req,res) {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
}

export async function getUserCredentials(req,res) {
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
}

export async function updateUserCredentials(req, res) {
  try {
    const user = await userModel.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.password = req.body.password || user.password;
    user.email = req.body.email || user.email;
    user.promotion = req.body.promotion || user.promotion;

    await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        promotion: user.promotion,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteUser(req,res) {
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
}

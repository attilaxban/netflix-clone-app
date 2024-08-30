import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import netflixUsers from './db/models/user.model.js'
import userModel from './db/models/user.model.js';
const app = express();
app.use(express.json())

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

app.get('/api/v1/users', async (req,res) => {
    try {
        const users = await userModel.find()
        if(users){
            return res.json(users)
        }
        else{
            res.status(404).json('Users not found')
        }
    } catch (error) {
        console.error(error)
        res.status(500).json('Internal server error')
    }
})

app.post('/api/v1/users', async (req,res,next) => {

    const requiredEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
 
    const user = req.body;

    if(!requiredEmail.test(user.email)) {res.status(400).send('Email address is wrong')}
    if(user.password.length < 6) {res.status(400).send('Password length should be min. 6 characters')}
    
    try {
        const newUser = await userModel.create(user);
        return res.json(newUser)
    } catch (error) {
        return next(error)
    }
})

app.get('/api/v1/users/:id',(req,res) => {
    //TODO
})

app.patch('/api/v1/users/:id',(req,res) => {
    //TODO
})

app.delete('/api/v1/users/:id',(req,res) => {
    //TODO
})

app.listen(3000, () => {
    console.log('App is running on port 3000')
})
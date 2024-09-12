import mongoose, { Schema } from "mongoose";

const userModel = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    list: {
        type: Array,
        default: []
    }
})

export default mongoose.model('netflixUsers', userModel)
import mongoose, { Schema } from "mongoose";

const userModel = new Schema({

    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
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
    promotion: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    history: {
        type: Array,
        default: []
    }
})

export default mongoose.model('netflixUsers', userModel)
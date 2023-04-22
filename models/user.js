import mongoose from "mongoose"
import { currentDateTime } from '../utils/functions.js'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    userIty: {
        type: String,
        required: true,
    },
    lastAccessed: {
        type: String,
        default:currentDateTime
    },
})

export const User = mongoose.model("User", schema, "Users")
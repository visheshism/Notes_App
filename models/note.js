import mongoose from 'mongoose';
import { currentDateTime } from '../utils/functions.js'

const noteSchema = new mongoose.Schema({
    createdAt: { type: Date, immutable: true, default: () => Date.now() },
    modifiedAt: { type: String, default: () => currentDateTime() },
    notesDat: { type: String, required: true },
    infIty: { type: String, required: true },
    user: {
        type: String,
        required: true
    },
})


export const Note = mongoose.model("Notes", noteSchema, "notes");
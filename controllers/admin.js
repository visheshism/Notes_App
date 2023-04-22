import { Note } from "../models/note.js"
import { User } from "../models/user.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find().select("name email userIty lastAccessed")

        if (!allUsers) return res.status(404).json({
            success: false,
            message: "Users not found!"
        })

        res.status(500).json({
            success: true,
            users: allUsers
        })
    } catch (error) {
        next(error)
        mailErr("Fetching Users", err.message)
    }
}

export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ user: req.params.id })

        if (!notes) return res.status(404).json({
            success: false,
            message: "Notes not found!"
        })

        res.status(500).json({
            success: true,
            notes
        })
    } catch (error) {
        next(error)
        mailErr("Getting notes by Admin", err.message)
    }
}

export const getOneNote = async (req, res, next) => {
    try {
        const note = await Note.findOne({ infIty: req.params.infIty, user: req.params.id })

        if (!note) return res.status(404).json({
            success: false,
            message: "Note not found!"
        })

        res.status(500).json({
            success: true,
            note
        })
    } catch (error) {
        next(error)
        mailErr("Getting a note by Admin", err.message)
    }
}
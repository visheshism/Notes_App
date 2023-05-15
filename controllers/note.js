import ErrorHandler from "../middlewares/error.js"
import { Note } from "../models/note.js"
import { currentDateTime, genArr, mailErr } from "../utils/functions.js"

export const newNote = async (req, res, next) => {
    try {
        const { _id } = req.creds

        const { notesData } = req.body

        const newNote = await Note.create({
            infIty: genArr(18),
            notesDat: notesData,
            user: _id
        })

        const note = await Note.find({ infIty: newNote.infIty, user: _id }).select({ __v: 0 })
        res.status(201).json({
            success: true,
            note
        })

    } catch (error) {
        next(error)
        mailErr("Loading Notes", error.message)

    }

}

export const readNote = async (req, res, next) => {
    try {
        const { _id } = req.creds
        const note = await Note.findOne({ infIty: req.params.infIty, user: _id }).select({ _id: 0, __v: 0, user: 0, infIty: 0 })

        if (!note) return next(new ErrorHandler("Note not found!", 404))

        res.status(200).json({
            success: true,
            note
        })
    } catch (error) {
        next(error)
        mailErr(`Loading Note : ${req.params.infIty}`, err.message)
    }
}

export const getMyNotes = async (req, res, next) => {
    try {
        const { _id } = req.creds

        const notes = await Note.find({ user: _id }).sort({
            createdAt: 1
        }).select({ _id: 0, __v: 0, user: 0 })

        if (!notes) return next(new ErrorHandler("Notes not found!", 404))

        res.status(200).json({
            success: true,
            notes
        })
    } catch (error) {
        next(error)
        mailErr("Loading Notes", error.message)
    }

}

export const updateNote = async (req, res, next) => {
    try {
        const { _id } = req.creds
        const { notesData } = req.body

        const preNote = await Note.findOne({ infIty: req.params.infIty, user: _id })

        if (!preNote) return next(new ErrorHandler("Note not found!", 404))

        preNote.notesDat = notesData
        preNote.modifiedAt = currentDateTime()

        await preNote.save()

        const note = await Note.findOne({ infIty: req.params.infIty, user: _id }).select({ _id: 0, __v: 0, user: 0, infIty: 0 })

        res.status(200).json({
            success: true,
            message: "Note Updated!",
            data: note
        })

    } catch (error) {
        next(error)
        mailErr(`Updating Note : ${req.params.infIty}`, err.message)
    }

}

export const deleteNote = async (req, res, next) => {
    try {
        const { _id } = req.creds

        const note = await Note.findOne({ infIty: req.params.infIty, user: _id })

        if (!note) return next(new ErrorHandler("Note not found!", 404))

        await note.deleteOne();


        res.status(200).json({
            success: true,
            message: "Note Deleted!"
        })

    } catch (error) {
        next(error)
        mailErr(`Deleting Note : ${req.params.infIty}`, err.message)
    }

}
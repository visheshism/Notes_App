import { config } from "dotenv"

config({
    path: "./data/creds.env"
})

export const { PORT, MONGO_URI, ADMIN_KEY, SMTPJS_SECURE_TOKEN, SMTPJS_TO_EMAIL, SMTPJS_FROM_EMAIL} = process.env

export const JWT_SECRET="notesApp"
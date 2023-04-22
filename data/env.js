import { config } from "dotenv"

config({
    path: "./data/creds.env"
})

export const { PORT, MONGO_URI,ADMIN_KEY } = process.env

export const JWT_SECRET="notesApp"
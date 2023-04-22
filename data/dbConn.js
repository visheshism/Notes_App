import mongoose from "mongoose";

export const dbConn = (MONGO_URI) => mongoose.connect(MONGO_URI, {
    dbName: "notes-app"
})
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err.message))
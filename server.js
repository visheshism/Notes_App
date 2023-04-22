import { MONGO_URI, PORT } from "./data/env.js";
import { App } from "./app.js";
import { dbConn } from "./data/dbConn.js";

dbConn(MONGO_URI)

App


App.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})
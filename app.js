import express from "express"
import mainRouter from "./router/mainRouter.js"
import { errMiddleware } from "./middlewares/error.js"
import path from "path"

export const App = express()

// middlewares
App.use(express.json())
App.use(express.static(path.join(path.resolve(), "public")))

// view engine
App.set('view engine', 'ejs')

// Router
App.use(mainRouter)

// using err middleware
App.use(errMiddleware)
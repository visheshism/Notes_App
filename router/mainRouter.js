import adminRouter from "../routes/admin.js"
import userRouter from "../routes/user.js"
import noteRouter from "../routes/note.js"
import Express from "express"
import { ADMIN_KEY } from "../data/env.js"
import { checkUser } from "../middlewares/userExists.js"
import cookieParser from "cookie-parser"
const router = Express.Router()

// Routes

router.use(cookieParser())
router.use(Express.urlencoded({ extended: true }))
router.get("/", checkUser)

router.use(userRouter)
router.use("/note", noteRouter)
router.use(`/${ADMIN_KEY}`, adminRouter)


// Handling non matching request from the client
router.use((req, res, next) => {
    res.status(404).render("404")
})


router.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});


export default router;
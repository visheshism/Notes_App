import Express from "express"
import { deleteNote, getMyNotes, newNote, readNote, updateNote } from "../controllers/note.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Express.Router();

router.post("/new", isAuthenticated, newNote)

router.get("/my", isAuthenticated, getMyNotes)

router.route("/:infIty").get(isAuthenticated, readNote).put(isAuthenticated, updateNote).delete(isAuthenticated, deleteNote)

export default router;
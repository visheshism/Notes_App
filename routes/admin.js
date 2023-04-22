import Express from "express"
import { getAllNotes, getAllUsers, getOneNote } from "../controllers/admin.js";

const router = Express.Router();

router.get("/all", getAllUsers)

router.get("/:id", getAllNotes)

router.get("/:id/:infIty", getOneNote)

export default router;
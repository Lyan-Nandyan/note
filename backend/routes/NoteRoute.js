import express from "express";
import {getNotes, getNotesById, createNotes, updateNote, deleteNote} from "../controllers/NoteController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/notes', getNotes);
router.get('/notes/:id',verifyToken, getNotesById);
router.post('/notes',verifyToken, createNotes);
router.patch('/notes/:id',verifyToken, updateNote);
router.delete('/notes/:id',verifyToken, deleteNote);

export default router;
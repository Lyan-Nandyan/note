import express from "express";
import {getNotes, getNotesById, createNotes, updateNote, deleteNote} from "../controllers/NoteController.js";

const router = express.Router();

router.get('/notes', getNotes);
router.get('/notes/:id', getNotesById);
router.post('/notes',createNotes);
router.patch('/notes/:id', updateNote);
router.delete('/notes/:id',deleteNote);

export default router;
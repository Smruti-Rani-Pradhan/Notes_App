const express = require("express");

const router = express.Router();

const verifyJWT = require("../middleware/auth.middleware");

const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");

router.use(verifyJWT);

// Create
router.post("/", createNote);

// Read All
router.get("/", getNotes);

// Read One
router.get("/:id", getNoteById);

// Update
router.patch("/:id", updateNote);

// Delete
router.delete("/:id", deleteNote);

module.exports = router;
const express = require("express");

const router = express.Router();

const verifyJWT = require("../middleware/auth.middleware");

const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  updateFavorite,
  deleteNote,
  restoreNote,
  permanentlyDeleteNote,
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

// Favorite
router.patch("/:id/favorite", updateFavorite);

// Delete
router.delete("/:id", deleteNote);

// Restore
router.patch("/:id/restore", restoreNote);

// Permanently Delete
router.delete("/:id/permanent", permanentlyDeleteNote);

module.exports = router;

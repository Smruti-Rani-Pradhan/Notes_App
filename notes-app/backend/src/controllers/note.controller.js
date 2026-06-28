const mongoose = require("mongoose");
const Note = require("../models/note.model");

const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const asyncHandler = require("../middleware/asyncHandler");

const {
  validateNote,
  validateNoteUpdate,
  validateFavorite,
} = require("../validators/note.validator");

// ===============================
// Create Note
// ===============================

const createNote = asyncHandler(async (req, res) => {
  const error = validateNote(req.body);

  if (error) {
    throw new ApiError(400, error);
  }

  const { title, content, tags, color } = req.body;

  const note = await Note.create({
    title: title.trim(),
    content: content?.trim() || "",
    tags: Array.isArray(tags) ? tags : [],
    color: color || "default",
    owner: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      note,
      "Note created successfully."
    )
  );
});

// ===============================
// Get All Notes
// ===============================

const getNotes = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);

  const limit = Math.min(
    Math.max(parseInt(req.query.limit) || 10, 1),
    100
  );

  const skip = (page - 1) * limit;

  const filter = {
    owner: req.user._id,
    deletedAt: null,
  };

  if (req.query.view === "favorites") {
    filter.isFavorite = true;
  }

  if (req.query.view === "trash") {
    filter.deletedAt = { $ne: null };
  }

  if (req.query.tag) {
    filter.tags = req.query.tag;
  }

  if (req.query.search) {
    filter.$text = {
      $search: req.query.search,
    };
  }

  const allowedSortFields = [
    "createdAt",
    "-createdAt",
    "updatedAt",
    "-updatedAt",
    "title",
    "-title",
  ];

  const sort = allowedSortFields.includes(req.query.sort)
    ? req.query.sort
    : "-createdAt";

  const [totalNotes, notes] = await Promise.all([
    Note.countDocuments(filter),
    Note.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        notes,
        pagination: {
          totalNotes,
          totalPages: Math.ceil(totalNotes / limit),
          currentPage: page,
          limit,
          hasNextPage: page < Math.ceil(totalNotes / limit),
          hasPreviousPage: page > 1,
        },
      },
      "Notes fetched successfully."
    )
  );
});

// ===============================
// Get Note By ID
// ===============================

const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID.");
  }

  const note = await Note.findOne({
    _id: id,
    owner: req.user._id,
  });

  if (!note) {
    throw new ApiError(404, "Note not found.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      note,
      "Note fetched successfully."
    )
  );
});

// ===============================
// Update Note
// ===============================

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID.");
  }

  const error = validateNoteUpdate(req.body);

  if (error) {
    throw new ApiError(400, error);
  }

  const note = await Note.findOne({
    _id: id,
    owner: req.user._id,
    deletedAt: null,
  });

  if (!note) {
    throw new ApiError(404, "Note not found.");
  }

  if (req.body.title !== undefined) {
    note.title = req.body.title.trim();
  }

  if (req.body.content !== undefined) {
    note.content = req.body.content.trim();
  }

  if (req.body.tags !== undefined) {
    note.tags = Array.isArray(req.body.tags) ? req.body.tags : [];
  }

  if (req.body.color !== undefined) {
    note.color = req.body.color;
  }

  await note.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      note,
      "Note updated successfully."
    )
  );
});

// ===============================
// Toggle Favorite
// ===============================

const updateFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID.");
  }

  const error = validateFavorite(req.body);

  if (error) {
    throw new ApiError(400, error);
  }

  const note = await Note.findOneAndUpdate(
    {
      _id: id,
      owner: req.user._id,
      deletedAt: null,
    },
    {
      isFavorite: req.body.isFavorite,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!note) {
    throw new ApiError(404, "Note not found.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      note,
      note.isFavorite
        ? "Note added to favorites."
        : "Note removed from favorites."
    )
  );
});

// ===============================
// Delete Note
// ===============================

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID.");
  }

  const note = await Note.findOneAndUpdate(
    {
      _id: id,
      owner: req.user._id,
      deletedAt: null,
    },
    {
      deletedAt: new Date(),
      isFavorite: false,
    },
    {
      new: true,
    }
  );

  if (!note) {
    throw new ApiError(404, "Note not found.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      note,
      "Note moved to trash successfully."
    )
  );
});

// ===============================
// Restore Note
// ===============================

const restoreNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID.");
  }

  const note = await Note.findOneAndUpdate(
    {
      _id: id,
      owner: req.user._id,
      deletedAt: { $ne: null },
    },
    {
      deletedAt: null,
    },
    {
      new: true,
    }
  );

  if (!note) {
    throw new ApiError(404, "Note not found.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      note,
      "Note restored successfully."
    )
  );
});

// ===============================
// Permanently Delete Note
// ===============================

const permanentlyDeleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID.");
  }

  const note = await Note.findOneAndDelete({
    _id: id,
    owner: req.user._id,
    deletedAt: { $ne: null },
  });

  if (!note) {
    throw new ApiError(404, "Note not found.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Note permanently deleted successfully."
    )
  );
});

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  updateFavorite,
  deleteNote,
  restoreNote,
  permanentlyDeleteNote,
};

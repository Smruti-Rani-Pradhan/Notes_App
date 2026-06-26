const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },

    content: {
      type: String,
      default: "",
      trim: true,
      maxlength: 5000,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast retrieval of a user's notes
noteSchema.index({ owner: 1 });

// Text search index with title given higher priority
noteSchema.index(
  {
    title: "text",
    content: "text",
  },
  {
    weights: {
      title: 5,
      content: 1,
    },
    name: "NoteTextIndex",
  }
);

module.exports = mongoose.model("Note", noteSchema);
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

noteSchema.index({ owner: 1 });

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
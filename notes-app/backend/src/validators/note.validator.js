const validateNote = ({ title, content }) => {
  if (!title || title.trim() === "") {
    return "Title is required.";
  }

  if (title.trim().length > 100) {
    return "Title cannot exceed 100 characters.";
  }

  if (content && content.length > 10000) {
    return "Content cannot exceed 10000 characters.";
  }

  return null;
};

const validateNoteUpdate = ({ title, content }) => {
  if (title !== undefined) {
    if (title.trim() === "") {
      return "Title cannot be empty.";
    }

    if (title.trim().length > 100) {
      return "Title cannot exceed 100 characters.";
    }
  }

  if (content !== undefined && content.length > 10000) {
    return "Content cannot exceed 10000 characters.";
  }

  return null;
};

module.exports = {
  validateNote,
  validateNoteUpdate,
};
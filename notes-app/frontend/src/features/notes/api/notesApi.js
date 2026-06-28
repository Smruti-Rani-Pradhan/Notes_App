import api from "@/lib/axios";

export const getNotes = async (params = {}) => {
  const response = await api.get("/notes", {
    params,
  });

  return response.data;
};

export const getNoteById = async (id) => {
  const response = await api.get(`/notes/${id}`);

  return response.data;
};

export const createNote = async (noteData) => {
  const response = await api.post("/notes", noteData);

  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await api.patch(`/notes/${id}`, noteData);

  return response.data;
};

export const updateFavorite = async (id, isFavorite) => {
  const response = await api.patch(`/notes/${id}/favorite`, {
    isFavorite,
  });

  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);

  return response.data;
};

export const restoreNote = async (id) => {
  const response = await api.patch(`/notes/${id}/restore`);

  return response.data;
};

export const permanentlyDeleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}/permanent`);

  return response.data;
};

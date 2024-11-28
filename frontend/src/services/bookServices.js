// services/bookServices.js
const API_URL = 'http://localhost:3001/api/books';

export const fetchBooks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
};

export const fetchBookById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  return response.json();
};

export const createOrUpdateBook = async (book) => {
  const method = book.id ? 'PUT' : 'POST';
  const url = book.id ? `${API_URL}/${book.id}` : API_URL;
  
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error(`Failed to ${book.id ? 'update' : 'create'} book`);
  }
  return response.json();
};

export const deleteBook = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this book?');
  if (!confirmed) {
    return false;
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
  // Don't try to parse JSON if the server doesn't return any
  return true;
};

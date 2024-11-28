const API_URL = 'http://localhost:3001/api/genres';

export const fetchGenres = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  return response.json();
};

export const fetchGenreById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch genre');
  }
  return response.json();
};

export const createOrUpdateGenre = async (genre) => {
  const method = genre.id ? 'PUT' : 'POST';
  const url = genre.id ? `${API_URL}/${genre.id}` : API_URL;
  
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(genre),
  });
  if (!response.ok) {
    throw new Error(`Failed to ${genre.id ? 'update' : 'create'} genre --> ${genre.name} already exists!`);
    
  }
  return response.json();
};

export const deleteGenre = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this genre?');
  if (!confirmed) {
    return false;
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete genre');
  }
  return true;
};

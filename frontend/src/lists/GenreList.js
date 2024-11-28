import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGenres, deleteGenre } from '../services/genreServices'; // Importing the services


const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGenres(); // Use the imported fetchGenres function
        setGenres(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteGenre(id);
      setGenres(genres.filter(genre => genre.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Genres</h1>
      <Link to="/add-genre" className="btn btn-primary mb-3">
        Add New Genre
      </Link>
      <div className="row">
        {genres.map(genre => (
          <div className="col-md-4 mb-3" key={genre._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{genre.name}</h5>
                <div className="d-flex gap-2">
                  <Link to={`/edit-genre/${genre.id}`} className="btn btn-warning">
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(genre.id)} 
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;

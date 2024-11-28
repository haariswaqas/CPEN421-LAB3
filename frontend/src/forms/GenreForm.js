import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createOrUpdateGenre, fetchGenreById } from '../services/genreServices';


const GenreForm = () => {
  const { id } = useParams(); // Fetch the ID from the URL params
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenre = async () => {
      if (id) {
        setIsEditing(true);
        try {
          const genre = await fetchGenreById(id); // Fetch genre details for editing
          setName(genre.name);
        } catch (err) {
          setError('Failed to fetch genre details.');
        }
      }
    };

    fetchGenre();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrUpdateGenre(id ? { id, name } : { name }); // Update or create
      navigate('/view-genres'); // Redirect to genres list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                {isEditing ? 'Edit Genre' : 'Add New Genre'}
              </h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Genre Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {isEditing ? 'Update Genre' : 'Add Genre'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreForm;

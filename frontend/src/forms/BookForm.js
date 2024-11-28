import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchGenres } from '../services/genreServices';
import { createOrUpdateBook } from '../services/bookServices';


const BookForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    genre_id: '',
    copies_left: '',
    image: '',
    description: ''
  });
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadGenres();

    // Load book data if editing
    const loadBook = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:3001/api/books/${id}`);
          if (!response.ok) throw new Error('Failed to fetch book');
          const bookData = await response.json();
          setFormData(bookData);
        } catch (err) {
          setError(err.message);
        }
      }
    };
    loadBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookToSave = { ...formData };
      if (id) bookToSave.id = id;
      await createOrUpdateBook(bookToSave);
      navigate('/view-books');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">{id ? 'Edit Book' : 'Add New Book'}</h2>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Author:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="genre_id" className="form-label">Genre:</label>
                  <select
                    className="form-select"
                    id="genre_id"
                    name="genre_id"
                    value={formData.genre_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a genre</option>
                    {genres.map(genre => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="copies_left" className="form-label">Copies Available:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="copies_left"
                    name="copies_left"
                    value={formData.copies_left}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description:</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image URL:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  {id ? 'Update' : 'Add'} Book
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;

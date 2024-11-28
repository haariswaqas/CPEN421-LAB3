import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks, deleteBook } from '../services/bookServices';
import { fetchGenres } from '../services/genreServices';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [booksData, genresData] = await Promise.all([
          fetchBooks(),
          fetchGenres()
        ]);
        setBooks(booksData);
        setGenres(genresData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredBooks = selectedGenre
    ? books.filter(book => String(book.genre_id) === String(selectedGenre))
    : books;

  if (loading) {
    return <div className="container mt-5 text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  if (error) {
    return <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    </div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Books</h1>
        <Link to="/add-book" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Add New Book
        </Link>
      </div>

      <div className="mb-4">
        <select
          className="form-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {filteredBooks.length === 0 && selectedGenre ? (
        <div className="alert alert-info">
          No books for this genre
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="col">
              <div className="card h-100 shadow-sm">
                {book.image && (
                  <Link to={`/books/${book.id}`}>
                    <img 
                      src={book.image} 
                      className="card-img-top" 
                      alt={book.title}
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                  </Link>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-3">
                    <Link 
                      to={`/books/${book.id}`} 
                      className="text-decoration-none text-dark hover-primary"
                      title={book.title}
                      style={{ ':hover': { color: '#0d6efd' } }}
                    >
                      {book.title}
                    </Link>
                  </h5>
                  <p className="card-text text-muted mb-2">by {book.author}</p>
                  <p className="card-text mb-3">
                    <span className="badge bg-secondary">
                      {genres.find(g => g.id === book.genre_id)?.name || 'Unknown'}
                    </span>
                  </p>
                  <div className="mt-auto d-flex gap-2">
                    <Link 
                      to={`/edit-book/${book.id}`} 
                      className="btn btn-outline-warning btn-sm flex-grow-1"
                    >
                      <i className="bi bi-pencil me-2"></i>Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(book.id)} 
                      className="btn btn-outline-danger btn-sm flex-grow-1"
                    >
                      <i className="bi bi-trash me-2"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;

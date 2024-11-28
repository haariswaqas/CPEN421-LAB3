import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookById, deleteBook } from '../services/bookServices';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

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

  if (!book) {
    return <div className="container mt-5">
      <div className="alert alert-warning" role="alert">
        Book not found
      </div>
    </div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm" style={{ minHeight: '700px' }}>
        <div className="row g-0 h-100">
          <div className="col-md-4">
            {book.image && (
              <img 
                src={book.image} 
                alt={book.title}
                className="img-fluid rounded-start h-100"
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex flex-column h-100">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="card-title mb-0">{book.title}</h1>
                </div>
                <p className="card-text fs-5 text-muted mb-3">by {book.author}</p>
                <p className="card-text">
                  <span className="badge bg-primary me-2">${book.price}</span>
                  <span className="badge bg-success">{book.copies_left} copies available</span>
                </p>
                {book.description && (
                  <div className="mt-4 p-4 bg-light rounded-3 border">
                    <h5 className="card-subtitle mb-3 text-primary">Description</h5>
                    <p className="card-text lead" style={{ 
                      lineHeight: '1.8',
                      textAlign: 'justify',
                      color: '#4a4a4a'
                    }}>
                      {book.description}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-auto">
                <div className="d-flex gap-3 justify-content-end">
                  <Link 
                    to={`/edit-book/${id}`} 
                    className="btn btn-warning"
                  >
                    <i className="bi bi-pencil me-2"></i>Edit Book
                  </Link>
                  <button
                    onClick={() => deleteBook(id)}
                    className="btn btn-danger"
                  >
                    <i className="bi bi-trash me-2"></i>Delete Book
                  </button>
                  <Link 
                    to="/view-books" 
                    className="btn btn-secondary"
                  >
                    <i className="bi bi-arrow-left me-2"></i>Back to Books
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

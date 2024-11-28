import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Navbar Brand */}
        <Link className="navbar-brand" to="/">
          BOOK COLLECTION SYSTEM
        </Link>

        {/* Toggle Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Books Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="booksDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Books
              </Link>
              <ul className="dropdown-menu" aria-labelledby="booksDropdown">
                <li>
                  <Link className="dropdown-item" to="/add-book">
                    Add Book
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/view-books">
                    View All Books
                  </Link>
                </li>
              </ul>
            </li>

            {/* Genres Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="genresDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Genres
              </Link>
              <ul className="dropdown-menu" aria-labelledby="genresDropdown">
                <li>
                  <Link className="dropdown-item" to="/add-genre">
                    Add Genre
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/view-genres">
                    View All Genres
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

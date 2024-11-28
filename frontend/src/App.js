import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS + Popper.js


import Navbar from './essentials/Navbar';
import Footer from './essentials/Footer';
import Home from './home/Home';
import BookForm from './forms/BookForm';
import BookDetail from './details/BookDetail';
import GenreForm from './forms/GenreForm';
import BookList from './lists/BookList';
import GenreList from './lists/GenreList';


const App = () => {
  return (
<div>
  <Router>
    <Navbar />
<Routes>
<Route path="/" element={<Home />} exact />
<Route path="/view-books" element={<BookList />} exact />
<Route path="/add-book" element={<BookForm />} exact />
<Route path="/edit-book/:id" element={<BookForm />} exact />
<Route path="/view-genres" element={<GenreList />} exact />
  <Route path="/add-genre" element={<GenreForm />} exact />
  <Route path="/edit-genre/:id" element={<GenreForm />} exact />
  <Route path="/books/:id" element={<BookDetail />} exact />
</Routes>



  </Router>
  <div style={{ marginTop: '550px' }}>
  <Footer />

  </div>




</div>
  );
}

export default App;

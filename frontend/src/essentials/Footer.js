import React from 'react';

const Footer = () => {
  return (
    <footer className="footer py-3 bg-dark text-white mt-auto">
      <div className="container text-center">
        <span>
          Book Collection System &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;

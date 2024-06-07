import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGlobe } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#171559' }}>
      <div className="container-fluid d-flex justify-content-between">
        <div className='h5 text-light'>Welcome Pramudith!</div>
        <div className='d-flex align-items-center text-light'>
          <span className='me-3'>Server Status</span> {/* Adjust the text as needed */}
          <FaGlobe size={30} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

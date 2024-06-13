import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGlobe } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [serverStatus, setServerStatus] = useState('Disconnected');

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/status');
        console.log('Response from server:', response.data); //logging the response
        if (response.data === 'ok') {
          setServerStatus('Connected');
        } else {
          setServerStatus('Disconnected');
        }
      } catch (error) {
        setServerStatus('Disconnected');
        console.error('Error checking server status:', error);
      }
    };

    checkServerStatus();

    const interval = setInterval(checkServerStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#394d6e' }}>
      <div className="container-fluid d-flex justify-content-between">
        <div className='h5 text-light'>Welcome Pramudith!</div>
        <div className='d-flex align-items-center text-light'>
          <span style={{ marginRight: '5px' }}>
            Server Status: {serverStatus}
          </span>
          <FaGlobe size={30} />
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: serverStatus === 'Connected' ? 'green' : 'red',
              marginLeft: '5px',
            }}
          ></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

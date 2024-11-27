import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MemoryList from './components/MemoryList';
import MemoryForm from './components/MemoryForm';
import Favorites from './components/Favorites';
import Nav from 'react-bootstrap/Nav';
import backgroundImage from './images/backgroundPicture.png';
import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <main  style={{
                                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${backgroundImage})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center center',
                                        backgroundAttachment: 'fixed',
                                        backgroundSize: 'cover',
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        marginTop: '60px',
                                        marginBottom: '60px',
                                        borderRadius: '10px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        filter: 'brightness(1)', // Adjust brightness (1 is default, <1 darker, >1 brighter)
                                    }}>
            <Nav className="nav-container">
              <Nav.Item className="smooth-hover"><Nav.Link as={Link} to="/">Upload Photo</Nav.Link></Nav.Item>
              <Nav.Item className="smooth-hover"><Nav.Link as={Link} to="/view-list">View Gallery</Nav.Link></Nav.Item>
              <Nav.Item className="smooth-hover"><Nav.Link as={Link} to="/view-favorites">My favorites</Nav.Link></Nav.Item>
            </Nav>
            <Routes>
              <Route path="/view-list" element={<MemoryList />} />
              <Route path="/" element={<MemoryForm />} />
              <Route path="/view-favorites" element={<Favorites />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
}

export default App;

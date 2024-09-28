import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MemoryList from './components/MemoryList';
import MemoryForm from './components/MemoryForm';
import Favorites from './components/Favorites';
import Nav from 'react-bootstrap/Nav';
import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <Nav className="nav-container">
              <Nav.Item><Nav.Link as={Link} to="/">Upload Photo</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link as={Link} to="/view-list">View Gallery</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link as={Link} to="/view-favorites">My favorites</Nav.Link></Nav.Item>
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

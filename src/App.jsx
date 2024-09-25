import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Academic from './components/Academic';
import News from './components/News';
import Gallery from './components/Gallery';
import Teachers from './components/Teachers';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/academic">Academic</Link>
          <Link to="/news">News</Link>
          <Link to="/teachers">Teachers</Link> {/* Fixed typo here */}
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </Header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academic" element={<Academic />} />
            <Route path="/news" element={<News />} />
            <Route path="/teachers" element={<Teachers />} /> {/* Added Teachers route */}
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
};

export default App;

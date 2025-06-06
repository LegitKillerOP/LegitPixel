import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
// Import other pages when you have them
// import About from './pages/About';
// import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <div className="p-pageWrapper">
        {/* Header can go here if any */}

        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes as needed */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>

        {/* Footer can go here if any */}
      </div>
    </Router>
  );
};

export default App;

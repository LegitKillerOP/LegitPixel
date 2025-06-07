import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Games from "./pages/Games";
import Leaderboard from "./pages/Leaderboard";
import Rules from "./pages/Rules";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="p-pageWrapper">
        <Header />
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/players" element={<Leaderboard />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />

      </div>
    </Router>
  );
};

export default App;

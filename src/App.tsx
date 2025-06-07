import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Games from "./pages/Games";
import Leaderboard from "./pages/Leaderboard";

const App = () => {
  return (
    <Router>
      <div className="p-pageWrapper">
        {/* Header can go here if any */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/players" element={<Leaderboard />} />
        </Routes>

      </div>
    </Router>
  );
};

export default App;

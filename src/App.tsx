import { BrowserRouter as BrowserRouter , Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Games from "./pages/Games";
import Leaderboard from "./pages/Leaderboard";
import Rules from "./pages/Rules";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AdminPanel from "./pages/AdminPanel";
import Forum from "./pages/Forum";
import ForumPostPage from "./pages/ForumPostPage";

const App = () => {
  return (
<BrowserRouter>
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
          <Route path="/account/*" element={<Account />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/forums" element={<Forum />} />
          <Route path="/forum/:postId" element={<ForumPostPage />} />
        </Routes>

        <Footer />

      </div>
</BrowserRouter>
  );
};

export default App;

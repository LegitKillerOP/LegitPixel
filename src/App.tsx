import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Home from './pages/Home';
import Games from './pages/Games';
import Leaderboard from './pages/Leaderboard';
import Rules from './pages/Rules';
import Register from './pages/Register';
import Login from './pages/Login';
import Account from './pages/Account';
import AdminPanel from './pages/AdminPanel';
import Forum from './pages/Forum';
import ForumPostPage from './pages/ForumPostPage';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingBar from './components/LoadingBar';
import Terms from './pages/Terms';
import ForumCreate from './pages/ForumCreate';
import ForumCategoryPage from './pages/ForumCategoryPage';

const RouteChangeHandler = ({ setIsLoading }: { setIsLoading: (val: boolean) => void }) => {
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    // Wait until next paint after route change to hide loading
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsLoading(false);
      });
    });
  }, [location]);

  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Router>
      <LoadingBar isLoading={isLoading} />
      <RouteChangeHandler setIsLoading={setIsLoading} />

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
          <Route path="/forum/:postCategory/:postId" element={<ForumPostPage />} />
          <Route path="/forum/community-info" element={<ForumCategoryPage category="community-info" />} />
          <Route path="/forum/announcements" element={<ForumCategoryPage category="announcements" />} />
          <Route path="/forum/support" element={<ForumCategoryPage category="support" />} />
          <Route path="/forum/suggestions" element={<ForumCategoryPage category="suggestions" />} />
          <Route path="/forum/legitpixel-server" element={<ForumCategoryPage category="legitpixel-server" />} />
          <Route path="/forum/general" element={<ForumCategoryPage category="general" />} />
          <Route path="/forum/skywars" element={<ForumCategoryPage category="skywars" />} />
          <Route path="/forum/skyblock" element={<ForumCategoryPage category="skyblock" />} />
          <Route path="/forum/bedwars" element={<ForumCategoryPage category="bedwars" />} />
          <Route path="/forum/create" element={<ForumCreate />} />
          <Route path="/terms" element={<Terms />} /> 
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

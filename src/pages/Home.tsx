import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import NewsCard from '../components/ForumLayout';
import Footer from '../components/Footer';
import ForumLayout from '../components/ForumLayout';

const Home = () => {
  return (
    <div style={{ backgroundImage: `url('/src/assets/background.png')` }} className="min-h-screen bg-cover bg-fixed bg-center">
      <Header />
      <Navigation />
      <ForumLayout />
      <Footer />
    </div>
  );
};

export default Home;

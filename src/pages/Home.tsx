import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div style={{ backgroundImage: `url('/src/assets/background.png')` }} className="min-h-screen bg-cover bg-fixed bg-center">
      <Header />
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <NewsCard title="BUG FIXES" subtitle="MAY 2025" date="May 14, 2025" content="It's time to let you know about some bug fixes that didn’t make it into a news post and weren’t part of an update." color="green" />
          <NewsCard title="DISASTERS" subtitle="5.1 UPDATE" date="Apr 30, 2025" content="This update brings bug fixes, new maps, and new disasters. We're bringing you a small patch with some quality of life features!" color="red" />
          <NewsCard title="HOUSING" subtitle="UPDATE" date="Apr 28, 2025" content="Enjoy Variables, Action Improvements, and more in this update!" color="orange" />
        </div>
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

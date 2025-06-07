import ForumLayout from '../components/ForumLayout';

const Home = () => {
  return (
    <div style={{ backgroundImage: `url('/src/assets/background.png')` }} className="min-h-screen bg-cover bg-fixed bg-center">
      <ForumLayout />
    </div>
  );
};

export default Home;

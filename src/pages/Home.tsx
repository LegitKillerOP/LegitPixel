import MainHome from "../components/MainHome";


const Home = () => {
  return (
    <div style={{ backgroundImage: `url('/src/assets/background.png')` }} className="min-h-screen bg-cover bg-fixed bg-center">
      <MainHome />
    </div>
  );
};

export default Home;

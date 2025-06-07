import Footer from "../components/Footer";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

export default function Rules() {
  return (
    <div style={{ fontFamily: "Neuton, serif" }}>
      <Header />
      <Navigation />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-20 flex-col">
        <ul className="breadcrumbs py-2">
          <li className="text-yellow-400">Home</li>
        </ul>
        <div className="py-5 flex justify-between items-center text-white">
          <h1 className="text-2xl">Rules & Policies</h1>
        </div>
      </div>

      {/* Top Decoration */}
      <div
        className="h-12 bg-no-repeat bg-top bg-center"
        style={{ backgroundImage: "url(/assets/content-top-bg.png)" }}
      ></div>

      {/* Main Content */}
      <div
        className="bg-repeat-y bg-top bg-center"
        style={{ backgroundImage: "url(/assets/content-middle-bg.png)" }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row px-4 sm:px-6 lg:px-16 py-4 gap-6">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-[250px] flex flex-col gap-4">
            <div className="bg-white border border-gray-300">
              <h2 className="text-gray-700 bg-gray-200 text-lg py-2 px-2">Pages</h2>
              <div className="flex flex-col py-2 gap-2">
                <a href="#" className="w-full px-2 text-[#343637]">Server Rules</a>
                <a href="#" className="w-full px-2 text-[#343637]">SkyBlock Rules</a>
                <a href="#" className="w-full px-2 text-[#343637]">Forum Rules</a>
                <a href="#" className="w-full px-2 text-[#343637]">Terms of Service</a>
                <a href="#" className="w-full px-2 text-[#343637]">Privacy Policy</a>
              </div>
            </div>
            <div className="bg-white border border-gray-300">
              <h2 className="text-gray-700 bg-gray-200 text-lg py-2 px-2">Quick Links</h2>
              <div className="flex flex-col py-2 gap-2">
                <a href="#" className="w-full px-2 text-[#343637]">Allowed Modifications</a>
                <a href="#" className="w-full px-2 text-[#343637]">How to Make an Appeal</a>
                <a href="#" className="w-full px-2 text-[#343637]">Submit an Appeal</a>
                <a href="#" className="w-full px-2 text-[#343637]">Guide to Account Security Alerts</a>
                <a href="#" className="w-full px-2 text-[#343637]">Get Support</a>
              </div>
            </div>
          </aside>

          {/* Content Section */}
          <main className="flex-1 border border-gray-300 bg-white p-4 text-lg">
            <div className="border-b border-gray-300 mb-4">
              <h3 className="text-yellow-400 hover:underline cursor-pointer">Server Rules</h3>
              <p>These rules apply to the whole Hypixel Server Network</p>
            </div>
            <div className="border-b border-gray-300 mb-4">
              <h3 className="text-yellow-400 hover:underline cursor-pointer">SkyBlock Rules</h3>
              <p>These rules apply to Hypixel SkyBlock</p>
            </div>
            <div className="border-b border-gray-300 mb-4">
              <h3 className="text-yellow-400 hover:underline cursor-pointer">Forum Rules</h3>
              <p>These rules apply to hypixel.net</p>
            </div>
            <div className="border-b border-gray-300 mb-4">
              <h3 className="text-yellow-400 hover:underline cursor-pointer">Terms of Service</h3>
              <p>Hypixel Terms of Service</p>
            </div>
            <div className="border-b border-gray-300 mb-4">
              <h3 className="text-yellow-400 hover:underline cursor-pointer">Privacy Policy</h3>
              <p>Hypixel Privacy Policy</p>
            </div>
          </main>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div
        className="h-12 mb-10 bg-no-repeat bg-top bg-center"
        style={{ backgroundImage: "url(/assets/content-bottom-bg.png)" }}
      ></div>

      <Footer />
    </div>
  );
}

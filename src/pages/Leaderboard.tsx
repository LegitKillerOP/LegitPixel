export default function Leaderboards() {
  return (
    <div style={{ fontFamily: "Neuton, serif" }}>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-20 flex-col">
        <ul className="breadcrumbs py-2">
          <li className="text-yellow-400">Home</li>
        </ul>
        <div className="py-5 flex justify-between text-white">
          <h1 className="text-2xl">Players</h1>
          <div className="flex text-black">
            <input
              className="bg-white px-1 md:px-3 md:py-2 outline-none"
              type="text"
              placeholder="Find a player..."
            />
            <button className="bg-[#e1b962] px-3 py-2">
              <a href="#">Search</a>
            </button>
          </div>
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
        style={{
          backgroundImage: "url(/assets/content-middle-bg.png)",
        }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row px-16">
          {/* Main Section */}
          <div className="w-full">
            <h2 className="text-[22px] font-normal text-[#343637] mb-4 font-serif">
              Leaderboards
            </h2>
            <ul className="playerWall detailed flex flex-grow flex-wrap gap-4">
              <li className="bg-[#eee] w-[258px] mb-2">
                <a href="#" className="flex p-2 hover:bg-gray-200 transition">
                  <img
                    src="/assets/BedWars-64.png"
                    alt="Bedwars"
                    className="w-12 h-12 mr-2"
                  />
                  <div className="flex flex-col content-stretch">
                    <div className="text-sm font-bold">Bedwars</div>
                    <div className="text-xs">Leaderboards</div>
                  </div>
                </a>
              </li>
              <li className="bg-[#eee] w-[258px] mb-2">
                <a href="#" className="flex p-2 hover:bg-gray-200 transition">
                  <img
                    src="/assets/Skywars-64.png"
                    alt="Skywars"
                    className="w-12 h-12 mr-2"
                  />
                  <div className="flex flex-col content-stretch">
                    <div className="text-sm font-bold">SkyWars</div>
                    <div className="text-xs">Leaderboards</div>
                  </div>
                </a>
              </li>
              <li className="bg-[#eee] w-[258px] mb-2">
                <a href="#" className="flex p-2 hover:bg-gray-200 transition">
                  <img
                    src="/assets/Arcade-64.png"
                    alt="Arcade"
                    className="w-12 h-12 mr-2"
                  />
                  <div className="flex flex-col content-stretch">
                    <div className="text-sm font-bold">Arcade</div>
                    <div className="text-xs">Leaderboards</div>
                  </div>
                </a>
              </li>
              <li className="bg-[#eee] w-[258px] mb-2">
                <a href="#" className="flex p-2 hover:bg-gray-200 transition">
                  <img
                    src="/assets/Duels-64.png"
                    alt="Duels"
                    className="w-12 h-12 mr-2"
                  />
                  <div className="flex flex-col content-stretch">
                    <div className="text-sm font-bold">Duels</div>
                    <div className="text-xs">Leaderboards</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-[250px]">
            <div className="bg-white border border-gray-300 mb-4">
              <h2 className="text-gray-700 bg-gray-200 text-lg px-2">Friends</h2>
              <a href="#" className="w-full px-2 text-[#343637]">
                Login in here to see a list of your friends.
              </a>
            </div>
            <div className="bg-white border border-gray-300 mb-4">
              <h2 className="text-gray-700 bg-gray-200 text-lg px-2">Your Guild</h2>
              <a href="#" className="w-full px-2 text-[#343637]">
                Login in here to see your guild info.
              </a>
            </div>
            <div className="bg-white border border-gray-300 mb-4">
              <h2 className="text-gray-700 bg-gray-200 text-lg px-2">Pixel Painter</h2>
              <a href="#" className="w-full px-2 text-[#343637]">
                Login in here to view your Pixel Painter Drawings.
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div
        className="h-12 mb-10 bg-no-repeat bg-top bg-center"
        style={{ backgroundImage: "url(/assets/content-bottom-bg.png)" }}
      ></div>
    </div>
  );
}

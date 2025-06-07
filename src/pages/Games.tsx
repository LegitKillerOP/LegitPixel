import { useState } from "react";

const games = [
  {
    name: "Bed Wars",
    type: "Survival",
    icon: "assets/BedWars-64.png",
    screenshot: "assets/BedWars.png",
    bg: "assets/BedWars-bg.png",
    description: `In Bed Wars, you and up to 3 teammates spawn on islands. You must gather 4 resources: Iron, Gold, Diamonds and Emeralds to buy items and upgrades at the Shopkeepers on your island.<br><br>
    Each island has a Bed - if your Bed is destroyed you can no longer respawn. Place blocks around your bed to defend it from being destroyed. Destroy other teams' beds then kill them to win!`,
  },
  {
    name: "SkyWars",
    type: "Survival",
    icon: "assets/Skywars-64.png",
    screenshot: "assets/Skywars.png",
    bg: "assets/Skywars-bg.png",
    description: `Our take on the Skywars gamemode - featuring the Angel of Death. Each player/team spawns on its own island and the aim is to be the last player or team alive. Kill players using a weapon or knock them off. With each kill you will be rewarded with a soul. You can use souls to unlock many kits and perks to improve your game experience.`,
  },
  {
    name: "Arcade",
    type: "Casual Games",
    icon: "assets/Arcade-64.png",
    screenshot: "assets/Arcade.png",
    bg: "assets/Arcade-bg.png",
    description: `The Arcade Games lobby offers you a wide range of fun and casual minigames which are played in a fast-paced style. Surviving hordes of zombies, fighting against the enemy team using beam swords or building the best plot are just a few of all the activities that you can do in our unique Arcade Games.`,
  },
  {
    name: "Duels",
    type: "Competitive",
    icon: "assets/Duels-64.png",
    screenshot: "assets/Duels.png",
    bg: "assets/Duels-bg.png",
    description: `In Duels, players face off against each other in a variety of game modes and team sizes. With modes including SkyWars, UHC, OP Duels, and more, in each one you select your setup and battle one or more opponents for dominance.<br><br>Can you make it into the daily leaderboard?`,
  },
  // Add more games...
];

const features = [
  {
    key: "lobby",
    name: "A unique lobby - for each game",
    description: [
      "You will find weaponsmiths, NPC quest masters offering you unique daily and weekly quests, information about the game, leaderboards and more.",
      "They have neat places to explore along with cool animations and sounds effects visible by the whole lobby when you find new epic items.",
      "To access each games lobby simply log on our Minecraft server, right-click to open your inventory and then click on a game. You’ll automatically be teleported there."
    ],
    img: "assets/lobbies.png",
  },
  {
    key: "parties",
    name: "Party",
    description: [
      "The party system allows you to crush your enemies with glorious teamwork!",
      "You can play most of the games on the LegitPixel server in parties. Invite friends before joining games to be on the same team.",
      "Type /party <name> to invite, and type /party for more commands."
    ],
    img: "assets/parties.png",
  },
  {
    key: "friends",
    name: "Friends",
    description: [
      "Keep your friends close, but keep your enemies closer!",
      "Add someone to your friend list and stay updated on what they are doing while logged on.",
      "Type /friend for full list of commands."
    ],
    img: "assets/friends.png",
  },
  {
    key: "guilds",
    name: "Guilds",
    description: [
      "Guilds are sort of never-ending parties!",
      "VIP+ players can create guilds. Join one to play and chat together.",
      "It's like Clans — build your community!"
    ],
    img: "assets/guilds.png",
  },
  {
    key: "coins",
    name: "Coins & Credits",
    description: [
      "Use coins to buy or craft new items, upgrade classes, or unlock specializations.",
      "Coins are earned through performance during games."
    ],
    img: "assets/coins.png",
  },
];


export default function Games() {
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div>

      {/* Instructions */}
      <div className="p-body my-10" style={{fontFamily: "Neuton, serif"}}>
        <div
          className="flex flex-col lg:flex-row justify-center items-start rounded-xl p-6 gap-10 max-w-7xl mx-auto"
          style={{
            backgroundImage: `url('/assets/dirt.png')`,
            userSelect: "none",
            fontFamily: "minecraftmedium, monospace",
          }}
        >
          <div className="text-white max-w-xl w-full">
            <p className="mb-4">
              Play Bed Wars, SkyWars, Murder Mystery and many more unique Minecraft
              minigames on the LegitPixel Server — just log in!
            </p>

            <ol className="list-decimal list-inside mb-4 space-y-2">
              <li>
                In Minecraft, go to{" "}
                <span className="font-bold text-yellow-400">Multiplayer</span>, then{" "}
                <span className="font-bold">Add Server</span>
              </li>
              <li>
                Enter{" "}
                <span className="font-bold text-yellow-400">mc.legitpixel.fun</span> in the
                server address box and click <span className="font-bold">Done</span>
              </li>
            </ol>

            <h2 className="text-xl font-bold text-gray-300 mb-2">Server Address</h2>

            <div
              className="relative w-full max-w-[368px] h-10 px-4 mx-auto mb-6 border-2 border-gray-400 bg-black text-white text-[15px] leading-[42px] cursor-pointer flex items-center justify-between rounded"
              data-clipboard-text="mc.legitpixel.fun"
              onClick={() => {
                navigator.clipboard.writeText("mc.legitpixel.fun");
                alert("Copied mc.legitpixel.fun to clipboard!");
              }}
            >
              <span className="font-mono text-lg">mc.legitpixel.fun</span>
              <span className="text-sm">📋</span>
            </div>

            <div className="flex justify-center">
              <button
                className="w-[368px] h-[40px] text-white text-[14px] leading-[43px]"
                style={{
                  background: "url(/assets/mc-button.png) no-repeat",
                  textShadow: "2px 2px 0px #383838",
                }}
              >
                Done
              </button>
            </div>
          </div>

          {/* Trailer */}
          <div className="w-full max-w-2xl aspect-video border-4 border-black shadow-lg">
            <iframe
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              title="LegitPixel Minecraft Server - Trailer"
              src="https://www.youtube.com/embed/bkWHyz1MmaQ?autoplay=0&loop=1&modestbranding=1&rel=0"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Game Selector */}
      <div id="games" className="max-w-7xl mx-auto my-10 px-4" style={{fontFamily: "Neuton, serif"}}>
        <h1 className="text-center text-3xl font-bold text-white mb-8">
          Check out our Minecraft games
        </h1>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.map((game, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedGame(game)}
              className={`flex items-center justify-around border border-gray-700 rounded p-2 text-center cursor-pointer hover:bg-opacity-80 transition-all duration-200 ${
                selectedGame.name === game.name ? "bg-yellow-400" : "bg-black bg-opacity-80"
              }`}
            >
              <span className="text-white font-medium">{game.name}</span>
              <img
                src={game.icon}
                alt={game.name}
                className="w-14 h-14"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Game Info */}
      <div className="relative max-w-7xl mx-auto my-10 px-4">
        {/* Blurred Background Layer */}
        <div
          className="absolute inset-0 rounded-xl z-0"
          style={{
            backgroundImage: `url(${selectedGame.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(5px)",
            opacity: 0.6,
          }}
        />

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 p-6 rounded-xl backdrop-blur-md" style={{fontFamily: "Neuton, serif"}}>
          <div className="infoPane h-auto lg:h-[500px] text-white w-full lg:w-1/2">
            <div className="p-4">
              <h2 className="text-2xl mb-2">{selectedGame.name}</h2>
              <h3 className="text-lg mb-4 text-yellow-400">{selectedGame.type}</h3>
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: selectedGame.description }}
              />
            </div>
          </div>

          <div className="artPane w-full lg:w-1/2 flex items-center justify-center">
            <img
              src={selectedGame.screenshot}
              alt={selectedGame.name}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col lg:flex-row items-start justify-between max-w-7xl mx-auto px-4 py-12 featuresSection gap-10"  style={{fontFamily: "Neuton, serif"}}>
      {/* Info + Art */}
      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row featureInfo">
        <div className="featureArt w-full lg:w-1/2 flex items-center justify-center p-4">
          <img src={activeFeature.img} alt={activeFeature.key} className="max-w-full" />
        </div>
        <div className="featureInfo w-full lg:w-1/2 p-4">
          <h1
            className="text-black text-[18px] uppercase font-normal mb-4"
            style={{
              background: "#e5bc57",
              padding: "12px 18px 10px",
              marginRight: "-20px"
            }}
          >
            {activeFeature.name}
          </h1>
          <div
            className="featureDescription text-white text-[16px] font-light space-y-3"
            style={{
              padding: "22px 36px 22px 22px",
              fontFamily: "Neuton, serif",
            }}
          >
            {activeFeature.description.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Selector */}
      <div
        id="featureSelector"
        className="relative w-[380px] h-[370px] mt-[-30px] ml-auto"
      >
        {/* Top */}
        <div
          className="h-[70px] text-center text-[17px] text-[#2b110b] leading-[93px] uppercase font-normal"
          style={{
            background: "url(assets/feature-menu.png) no-repeat center top",
            fontFamily: "Neuton, serif",
            marginLeft: "-40px",
          }}
        >
          Unique Features
        </div>

        {/* Middle */}
        <ul
          className="h-[265px] list-none px-[65px] py-0"
          style={{
            background: "url(assets/feature-menu-middle.png) repeat-y center top",
            marginLeft: "-40px",
          }}
        >
          {features.map((f) => (
            <li
              key={f.key}
              onClick={() => setActiveFeature(f)}
              className={`cursor-pointer px-6 py-4 border-b-1 border-yellow-700 text-[16px] ${
                activeFeature.key === f.key
                  ? "bg-yellow-200"
                  : "hover:bg-yellow-200/30"
              }`}
            >
              <a>{f.name}</a>
            </li>
          ))}
        </ul>

        {/* Bottom */}
        <div
          className="h-[70px]"
          style={{
            background: "url(assets/feature-menu-bottom.png) no-repeat center top",
            marginLeft: "-40px",
          }}
        />
      </div>
    </div>
    </div>
  );
}

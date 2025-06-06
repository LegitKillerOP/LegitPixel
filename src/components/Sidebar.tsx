import React from 'react';

const Sidebar = () => (
  <aside className="space-y-6">
    <div className="content-frame p-4 bg-[rgba(139,69,19,0.9)] border-[3px] border-[#8B4513] rounded-xl shadow-inner shadow-black">
      <div className="bg-purple-600 text-white p-4 rounded text-center">
        <h3 className="font-bold mb-2">OFFICIAL HYPIXEL DISCORD</h3>
        <p className="text-sm mb-3">Join the official Discord and get access to exclusive content!</p>
        <button className="bg-purple-800 px-4 py-2 rounded text-sm">JOIN NOW</button>
      </div>
    </div>

    <div className="content-frame p-4 text-white">
      <h4 className="font-bold mb-3">SOCIAL NETWORKS</h4>
      <div className="grid grid-cols-4 gap-2">
        {['YT', 'TW', 'IG', 'DC', 'FB', 'GH', 'SK', 'EM'].map(label => (
          <div key={label} className="bg-gray-600 w-8 h-8 rounded flex items-center justify-center text-white text-xs">{label}</div>
        ))}
      </div>
    </div>

    <div className="content-frame p-4 text-white">
      <h4 className="font-bold mb-3">LATEST POSTS</h4>
      <div className="space-y-3 text-xs">
        <div><div className="font-semibold">🔧 Something wrong with pit</div><div className="text-gray-300">Today at 7:56 AM</div></div>
        <div><div className="font-semibold">📊 Ranked Skywars for upcoming seasons</div><div className="text-gray-300">Today at 7:54 AM</div></div>
        <div><div className="font-semibold">🎮 Why are there so many cheaters in SkyWars?</div><div className="text-gray-300">Today at 7:52 AM</div></div>
      </div>
    </div>
  </aside>
);

export default Sidebar;

import React from 'react';

const Footer = () => (
  <footer className="mt-12 bg-black bg-opacity-50 text-white p-8">
    <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
      <div>
        <h5 className="font-bold mb-3">📖 About Us</h5>
        <p className="text-sm">Hypixel is one of the largest Minecraft Server Networks, featuring original games such as The Walls, Mega Walls, Blitz Survival Games, and more!</p>
      </div>
      <div>
        <h5 className="font-bold mb-3">🔗 Useful Links</h5>
        <ul className="text-sm space-y-1">
          {['Home', 'Rules & Policies', 'Support', 'Status', 'Jobs', 'Terms of Service', 'Privacy Policy'].map(link => (
            <li key={link}><a href="#" className="hover:text-yellow-400">{link}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h5 className="font-bold mb-3">👍 Like us on Facebook</h5>
        <div className="bg-blue-600 p-3 rounded text-sm font-bold">Hypixel Serve...<div className="text-xs">Like Page</div></div>
      </div>
      <div>
        <h5 className="font-bold mb-3">🏪 Hypixel Store</h5>
        <p className="text-sm mb-3">Purchasing ranks, Hypixel Gold, and SkyBlock Gems helps support more quality content.</p>
        <button className="bg-yellow-600 text-black px-4 py-2 rounded font-bold">Visit the store</button>
      </div>
    </div>
  </footer>
);

export default Footer;

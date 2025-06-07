import { useState, useEffect, useContext } from "react";
import { Menu, Search, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  // Adjust path as needed

export default function Navigation() {
  const { user } = useContext(AuthContext); // Get current logged in user
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [forumOpen, setForumOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const location = useLocation();

  const toggleRulesDropdown = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation(); // Prevent bubbling to <a>
    e.preventDefault();  // Prevent navigation
    setRulesOpen(!rulesOpen);
  };

  const toggleForumsDropdown = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setForumOpen(!forumOpen);
  };

  // Auto-close on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setForumOpen(false);
    setRulesOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  // Show scroll-to-top button on desktop only
  useEffect(() => {
    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 1024;
      setShowScrollButton(window.scrollY > 300 && isDesktop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navButtonClasses = `
    flex items-center justify-center text-[#302409] text-xl font-semibold bg-center bg-no-repeat bg-cover h-[60px] px-4 no-underline transition hover:opacity-90
  `;

  return (
    <nav className="p-nav my-3 md:mb-12 relative z-50 text-[#ffd87d] font-sans">
      {/* Mobile Topbar */}
      <div className="bg-[#ffd87d] flex items-center justify-between px-4 py-2 md:hidden">
        <button onClick={() => setMobileMenuOpen(true)} className="text-black">
          <Menu size={24} />
        </button>
        <a href="/" className="flex items-center">
          <img src="/assets/logo.png" alt="LegitPixel Forums" width={60} />
        </a>
        <button onClick={() => setSearchOpen(!searchOpen)} className="text-black">
          <Search size={24} />
        </button>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-end max-w-[1150px] h-[65px] mx-auto bg-[url('/assets/menu-border-bg.png')] bg-no-repeat bg-center px-3">
        <ul className="flex items-center w-full space-x-0">
          <li className="w-[118px]">
            <a href="/" className={`${navButtonClasses} bg-[url('/assets/button-home.png')]`}>Home</a>
          </li>
          <li className="w-[116px]">
            <a href="/games" className={`${navButtonClasses} bg-[url('/assets/button-games.png')]`}>Games</a>
          </li>
          <li className="w-[165px]">
            <a href="/players" className={`${navButtonClasses} bg-[url('/assets/button-leaderboards.png')]`}>Leaderboards</a>
          </li>
          <li className="w-[127px] relative">
            <a href="/forums" className={`block bg-[url('/assets/button-rules.png')] ${navButtonClasses}`}>Forums
              <span
                className="ml-1 cursor-pointer"
                onClick={toggleForumsDropdown}>▼</span>
            </a>
            {forumOpen && (
              <div className="absolute top-full mt-1 left-0 w-full bg-white text-black shadow-md rounded z-50">
                <a href="/whats-new/posts/" className="block px-4 py-2 hover:bg-gray-100">New posts</a>
                <a href="/search/?type=post" className="block px-4 py-2 hover:bg-gray-100">Search forums</a>
              </div>
            )}
          </li>
          <li className="w-[90px]">
            <a href="https://wiki.hypixel.net/Main_Page" className={`${navButtonClasses} bg-[url('/assets/button-wiki.png')]`}>Wiki</a>
          </li>
          <li className="w-[183px] relative">
            <a href="/rules" className={`block bg-[url('/assets/button-rules.png')] ${navButtonClasses}`}>Rules & Policies
              <span
                className="ml-1 cursor-pointer"
                onClick={toggleRulesDropdown}>▼</span>
            </a>
            {rulesOpen && (
              <div className="absolute top-full mt-1 left-0 w-full bg-white text-black shadow-md rounded z-50">
                <a href="/legitpixel-rules" className="block px-4 py-2 hover:bg-gray-100">Server Rules</a>
                <a href="/skyblock-rules" className="block px-4 py-2 hover:bg-gray-100">SkyBlock Rules</a>
                <a href="/forum-rules" className="block px-4 py-2 hover:bg-gray-100">Forum Rules</a>
                <a href="/terms" className="block px-4 py-2 hover:bg-gray-100">Terms of Service</a>
                <a href="/privacy" className="block px-4 py-2 hover:bg-gray-100">Privacy Policy</a>
              </div>
            )}
          </li>
          <li className="w-[128px]">
            <a href="https://support.hypixel.net/" className={`${navButtonClasses} bg-[url('/assets/button-support.png')]`}>Support</a>
          </li>
          <li className="w-[143px]">
            <a href="https://store.hypixel.net/" className={`${navButtonClasses} bg-[url('/assets/button-store.png')]`}>Store</a>
          </li>
          <li className="m-auto flex items-center">
            <button onClick={() => setSearchOpen(!searchOpen)} className={`${navButtonClasses} bg-[url('/assets/button-search-small.png')]`}>
              <Search size={24} />
            </button>
          </li>
        </ul>
      </div>

      {/* Search Panel */}
      {searchOpen && (
        <div className="absolute right-4 top-[90px] md:top-[82px] bg-white text-black w-[90%] md:w-[400px] rounded shadow-lg z-50 p-4">
          <h3 className="text-lg font-semibold mb-2">Search</h3>
          <form method="post" action="/search/search">
            <input type="text" name="keywords" placeholder="Search…" className="w-full border px-3 py-2 rounded mb-3" />
            <label className="flex items-center mb-2">
              <input type="checkbox" name="c[title_only]" value="1" className="mr-2" />
              Search titles only
            </label>
            <input type="text" name="c[users]" placeholder="Member" className="w-full border px-3 py-2 rounded mb-3" />
            <div className="flex justify-between">
              <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">Search</button>
              <button type="submit" name="from_search_menu" className="text-blue-600">Advanced search…</button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-xs bg-black/90 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#ffd87d]">
          <h2 className="text-[#ffd87d] text-xl font-bold">Menu</h2>
          <button onClick={() => setMobileMenuOpen(false)} className="text-[#ffd87d]">
            <X size={24} />
          </button>
        </div>
        <ul className="p-4 space-y-2 text-[#ffd87d]">
          {!user && (
            <>
              <li><a href="/login" className="block py-2 px-2">Login</a></li>
              <li><a href="/register" className="block py-2 px-2">Register</a></li>
            </>
          )}
          <li><a href="/" className="block py-2 px-2">Home</a></li>
          <li><a href="/games" className="block py-2 px-2">Games</a></li>
          <li><a href="/players" className="block py-2 px-2">Leaderboards</a></li>
          <li><a href="/forums" className="block py-2 px-2">Forums</a></li>
          <li><a href="https://wiki.hypixel.net/Main_Page" className="block py-2 px-2">Wiki</a></li>
          <li><a href="/hypixel-rules" className="block py-2 px-2">Rules & Policies</a></li>
          <li><a href="https://support.hypixel.net/" className="block py-2 px-2">Support</a></li>
          <li><a href="https://store.hypixel.net/" className="block py-2 px-2">Store</a></li>
        </ul>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-[#ffd87d] text-black p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          ↑
        </button>
      )}
    </nav>
  );
}

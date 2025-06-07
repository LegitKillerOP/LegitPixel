import React, { useState } from 'react';
import { ChevronRight, MessageCircle, Youtube, Twitter, Instagram, Facebook } from 'lucide-react';

// Type definitions
interface NewsItem {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  timeAgo: string;
  content: string;
  comments: number;
  image: string;
  link: string;
  color: string;
}

interface Thread {
  id: number;
  title: string;
  author: string;
  avatar: string | null;
  time: string;
  timeAgo: string;
  forum: string;
  label?: string;
}

interface NewsBlockProps {
  item: NewsItem;
}

interface ThreadItemProps {
  thread: Thread;
  showLabel?: boolean;
}

const ForumLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 148;

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "BUG FIXES",
      subtitle: "MAY 2025",
      date: "May 16, 2025",
      time: "8:44 AM",
      timeAgo: "21d",
      content: "This is some long text for several minigames!",
      comments: 124,
      image: "/api/placeholder/600/300",
      link: "/threads/bug-fixes-may-2025.5906307/",
      color: "green"
    },
    {
      id: 2,
      title: "DISASTERS",
      subtitle: "PTL UPDATE",
      date: "Apr 30, 2025",
      time: "12:10 PM",
      timeAgo: "Apr 30",
      content: "Hello everyone! We're happy to see the continued love for Disasters after its February update, and we want to keep the game fresh, fun, and free of bugs. Today, we're bringing you a small patch with some quality of life features, bug fixes, and more. Read on to find out what all we have in store!",
      comments: 90,
      image: "/api/placeholder/600/300",
      link: "/threads/disasters-v0-3-update.5879135/",
      color: "orange"
    }
  ];

  const latestThreads: Thread[] = [
    {
      id: 1,
      title: "I Have Brought Great Shame....",
      author: "FluffehSnuggles",
      avatar: "/api/placeholder/32/32",
      time: "Today at 8:22 AM",
      timeAgo: "5h",
      forum: "LegitPixel Forums Discussion"
    },
    {
      id: 2,
      title: "Mega-Teaser for upcoming projects",
      author: "-Gr8astic-",
      avatar: "/api/placeholder/32/32",
      time: "Today at 7:53 AM",
      timeAgo: "6h",
      forum: "Off Topic"
    }
  ];

  const skyblockThreads: Thread[] = [
    {
      id: 1,
      title: "Kuudra suggestions & more?",
      author: "Depk12351",
      avatar: null,
      time: "Today at 8:35 AM",
      timeAgo: "5h",
      forum: "SkyBlock Ideas and Feedback",
      label: "Balancing"
    },
    {
      id: 2,
      title: "missing sacks?",
      author: "sandgun06",
      avatar: "/api/placeholder/32/32",
      time: "Today at 8:05 AM",
      timeAgo: "5h",
      forum: "SkyBlock General Discussion"
    }
  ];

  const Pagination = () => (
    <nav className="flex items-center justify-between mb-4 p-3 bg-gray-100 border border-gray-300 rounded">
      <div className="flex items-center space-x-1">
        <span className="px-2 py-1 bg-blue-600 text-white rounded text-sm font-medium">1</span>
        <a href="/?page=2" className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm">2</a>
        <a href="/?page=3" className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm">3</a>
        <span className="px-2 py-1 text-gray-400 text-sm">…</span>
        <a href="/?page=148" className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm">148</a>
      </div>
      <a href="/?page=2" className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
        <span>Next</span>
        <ChevronRight size={14} />
      </a>
    </nav>
  );

  const NewsBlock: React.FC<NewsBlockProps> = ({ item }) => (
    <div className="bg-white border border-gray-300 rounded mb-4 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 hover:text-blue-600">
          <a href={item.link}>{item.title}</a>
        </h2>
        <div className="text-gray-500 text-sm">
          <time title={`${item.date} at ${item.time}`}>{item.date}</time>
        </div>
      </div>
      
      <div className="p-4">
        {/* News Header with styled background */}
        <div className={`relative text-center py-12 mb-4 rounded text-white font-bold ${
          item.color === 'green' ? 'bg-green-700' : 
          item.color === 'orange' ? 'bg-orange-600' : 'bg-blue-600'
        }`} style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="text-3xl font-bold mb-2">{item.title}</div>
          <div className="text-xl text-yellow-300">{item.subtitle}</div>
          <div className="absolute bottom-2 left-4 text-sm opacity-90">
            {item.timeAgo}
          </div>
        </div>
        
        <div className="text-gray-700 mb-4 leading-relaxed">
          {item.content}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            by <span className="text-blue-600 font-medium">LegitPixel Team</span> at <span className="text-blue-600">{item.time}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <MessageCircle size={14} />
              <span>{item.comments} comments</span>
            </div>
            <a href={item.link} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
              Continue reading...
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const ThreadItem: React.FC<ThreadItemProps> = ({ thread, showLabel = false }) => (
    <li className="flex items-start space-x-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
      <div className="flex-shrink-0">
        {thread.avatar ? (
          <img 
            src={thread.avatar} 
            alt={thread.author}
            className="w-8 h-8 rounded border"
          />
        ) : (
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">
            {thread.author[0]}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          {showLabel && thread.label && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded">
              {thread.label}
            </span>
          )}
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium truncate">
            {thread.title}
          </a>
        </div>
        <div className="text-xs text-gray-500 space-x-2">
          <span className="text-blue-600 font-medium">{thread.author}</span>
          <span>•</span>
          <span>{thread.timeAgo}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {thread.forum}
        </div>
      </div>
    </li>
  );

  return (
    <div className="min-h-screen">
      {/* Ornate border container */}
      <div className="relative min-h-screen">
        {/* Top ornate border */}
        <div 
          className="absolute top-0 left-0 right-0 h-20 bg-no-repeat bg-top bg-center z-10"
          style={{
          backgroundImage: `url('/assets/content-top-bg.png')`
          }}
        />
        
        {/* Bottom ornate border */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-20 bg-no-repeat bg-bottom bg-center z-10"
          style={{
            backgroundImage: `url('/assets/content-bottom-bg.png')`
          }}
        />

        {/* Main content with padding for borders */}
        <div 
          className="relative z-0 pt-20 pb-20"
          style={{
            background: 'url(/assets/content-middle-bg.png) repeat-y center center'
          }}
        >
          <div className="max-w-6xl mx-auto px-4" style={{ padding: '0 60px' }}>
            <div className="flex gap-6">
              {/* Main Content */}
              <div className="flex-1">
                <Pagination />
                
                {newsItems.map(item => (
                  <NewsBlock key={item.id} item={item} />
                ))}
                
                <Pagination />
              </div>

              {/* Sidebar */}
              <div className="w-80 space-y-4">
                {/* Upgrade Account CTA */}
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-4 text-center text-white shadow-lg">
                  <div className="bg-black bg-opacity-20 rounded p-3 mb-3">
                    <div className="text-lg font-bold text-yellow-300">LegitPixel</div>
                    <div className="text-sm">Upgrade Account!</div>
                  </div>
                  <div className="text-sm mb-3">Ranks, SkyBlock Gems, and more</div>
                  <a href="https://store.hypixel.net/" className="inline-block bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-300 text-sm">
                    Open Store
                  </a>
                </div>

                {/* Social Media */}
                <div className="bg-white border border-gray-300 rounded shadow-sm">
                  <h3 className="text-sm font-bold p-3 bg-gray-50 border-b border-gray-200 text-gray-700">Social Media</h3>
                  <div className="p-3">
                    <div className="grid grid-cols-4 gap-2">
                      <a href="https://www.youtube.com/user/Hypixel" className="p-2 bg-red-500 text-white rounded text-center hover:bg-red-600">
                        <Youtube size={16} className="mx-auto" />
                      </a>
                      <a href="https://twitter.com/HypixelNetwork" className="p-2 bg-blue-400 text-white rounded text-center hover:bg-blue-500">
                        <Twitter size={16} className="mx-auto" />
                      </a>
                      <a href="https://instagram.com/hypixelofficial" className="p-2 bg-pink-500 text-white rounded text-center hover:bg-pink-600">
                        <Instagram size={16} className="mx-auto" />
                      </a>
                      <a href="https://www.facebook.com/Hypixel" className="p-2 bg-blue-600 text-white rounded text-center hover:bg-blue-700">
                        <Facebook size={16} className="mx-auto" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Latest Threads */}
                <div className="bg-white border border-gray-300 rounded shadow-sm">
                  <h3 className="text-sm font-bold p-3 bg-gray-50 border-b border-gray-200 text-gray-700">
                    <a href="/whats-new/" className="hover:text-blue-600">Latest Threads</a>
                  </h3>
                  <ul>
                    {latestThreads.map(thread => (
                      <ThreadItem key={thread.id} thread={thread} />
                    ))}
                  </ul>
                </div>

                {/* Latest SkyBlock Threads */}
                <div className="bg-white border border-gray-300 rounded shadow-sm">
                  <h3 className="text-sm font-bold p-3 bg-gray-50 border-b border-gray-200 text-gray-700">
                    <a href="/whats-new/" className="hover:text-blue-600">Latest SkyBlock Threads</a>
                  </h3>
                  <ul>
                    {skyblockThreads.map(thread => (
                      <ThreadItem key={thread.id} thread={thread} showLabel={true} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumLayout;
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Link } from 'react-router-dom';
import { Youtube, Twitter, Instagram, Facebook, MessageCircle } from 'lucide-react';
import LoadingBar from '../components/LoadingBar';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  views?: number;
  replies?: number;
  category?: string;
  authorName?: string;
  createdAt: Date;
}

const MainHome: React.FC = () => {
  const [topPosts, setTopPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const q = query(
      collection(db, 'forumPosts'),
      orderBy('views', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts: ForumPost[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
          views: data.views ?? 0,
          replies: data.replies ?? 0,
          category: data.category,
          authorName: data.authorName,
        };
      });
      setTopPosts(posts);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="main-content">
      <LoadingBar isLoading={isLoading} />

      {/* Top Decoration */}
      <div
        className="h-12 bg-no-repeat bg-top"
        style={{ backgroundImage: "url(/assets/content-top-bg.png)" }}
      ></div>

      {/* Main Content */}
      <div
        className="bg-repeat-y bg-top"
        style={{
          backgroundImage: "url(/assets/content-middle-bg.png)",
        }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-4 px-16">
          {/* Main Section */}
          <div className="w-full">
            <div className="flex flex-col gap-4">
              {topPosts.map((post) => (
                <Link to={`/forum/${post.category}/${post.id}`} key={post.id}>
                  <div className="rounded text-black shadow">
                    <div className="w-full flex justify-between p-2 bg-gray-300 text-lg text-gray-700">
                      <h3>{post.title}</h3>
                      <h3>
                        {post.createdAt.toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </h3>
                    </div>
                    <p className="text-sm p-2 line-clamp-2">{post.content}</p>
                    <div className="text-xs p-2 border-t border-gray-300 mt-2 flex gap-3">
                      <span>By {post.authorName}</span>
                      <span>
                        At{' '}
                        {post.createdAt.toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              {topPosts.length === 0 && (
                <p className="text-gray-400">No top forum posts found.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-[250px]">
            <div className="bg-white border border-gray-300 mb-4">
              <div className="upgradeCTA">
                <img src="assets/upgrade-account-cta.png" alt="" />
              </div>
            </div>
            <div className="bg-white border border-gray-300 mb-4 rounded shadow-sm">
              <h2 className="text-gray-700 bg-gray-200 text-lg px-2 py-2 font-semibold">Social Media</h2>
              <div className="flex flex-wrap justify-around gap-1 p-3">
                <a href="https://www.youtube.com/user/Hypixel" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-red-600 hover:bg-red-700 text-white">
                  <Youtube size={24} />
                </a>
                <a href="https://twitter.com/HypixelNetwork" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-blue-400 hover:bg-blue-500 text-white">
                  <Twitter size={24} />
                </a>
                <a href="https://instagram.com/hypixelofficial" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-pink-500 hover:bg-pink-600 text-white">
                  <Instagram size={24} />
                </a>
                <a href="https://www.facebook.com/Hypixel" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-blue-700 hover:bg-blue-800 text-white">
                  <Facebook size={24} />
                </a>
                <a href="https://discord.gg/hypixel" target="_blank" rel="noopener noreferrer" className="p-2 rounded" style={{ backgroundColor: '#5865F2' }}>
                  <MessageCircle size={24} color="white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div
        className="h-12 mb-10 bg-no-repeat bg-top"
        style={{ backgroundImage: "url(/assets/content-bottom-bg.png)" }}
      ></div>
    </div>
  );
}

export default MainHome;

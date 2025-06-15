import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { Link } from 'react-router-dom';
import LoadingBar from '../../components/LoadingBar';

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

const ForumAnnouncements: React.FC = () => {
  const [announcementPosts, setAnnouncementPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
        setIsLoading(true);
    const q = query(
        collection(db, 'forumPosts'),
        where('category', '==', 'announcements')
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
      setAnnouncementPosts(posts);
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
            <h1 className="text-3xl font-bold mb-6 border-b pb-2">Announcements</h1>

            <div className="flex flex-col gap-4">
              {announcementPosts.length === 0 && (
                <p className="text-gray-400">No announcements found.</p>
              )}
              {announcementPosts.map((post) => (
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
                      <span>By {post.authorName || 'Unknown'}</span>
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
};

export default ForumAnnouncements;

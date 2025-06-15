import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Link } from 'react-router-dom';
import LoadingBar from '../components/LoadingBar';
import type { ForumPost } from '../services/Forum';

interface Props {
  category: string;
}

const ForumCategoryPage: React.FC<Props> = ({ category }) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'forumPosts'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
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
          isPinned: data.isPinned ?? false,
        };
      });

      setPosts(posts);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [category]);

  return (
    <div className="main-content">
      <LoadingBar isLoading={isLoading} />

      <div className="h-12 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-top-bg.png)' }} />

      <div className="bg-repeat-y bg-top" style={{ backgroundImage: 'url(/assets/content-middle-bg.png)' }}>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-4 px-16 py-10">
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-6 border-b pb-2 capitalize">{category.replace('-', ' ')}</h1>

            <div className="flex flex-col gap-4">
              {isLoading ? (
                <p className="text-gray-500">Loading posts...</p>
              ) : posts.length === 0 ? (
                <p className="text-gray-400">No posts in this category.</p>
              ) : (
                posts.map((post) => (
                  <Link to={`/forum/${post.category}/${post.id}`} key={post.id}>
                    <div className="rounded text-black shadow bg-white border border-gray-300">
                      <div className="w-full flex justify-between p-2 bg-gray-200 text-lg text-gray-700">
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-12 mb-10 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-bottom-bg.png)' }} />
    </div>
  );
};

export default ForumCategoryPage;

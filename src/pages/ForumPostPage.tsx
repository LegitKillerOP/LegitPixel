import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { ForumPost } from '../services/Forum';

const ForumPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      const postRef = doc(db, 'forumPosts', postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const data = postSnap.data();
        setPost({
          id: postSnap.id,
          title: data.title,
          content: data.content,
          category: data.category,
          authorName: data.authorName,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          replies: data.replies ?? 0,
          views: data.views ?? 0,
          isPinned: data.isPinned ?? false,
        });

        await updateDoc(postRef, {
          views: increment(1),
        });
      } else {
        setPost(null);
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <p className="text-center text-gray-400 mt-8">Loading post...</p>;
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-slate-900 text-white rounded-md shadow-md mt-8">
        <p>Post not found.</p>
        <Link to="/forums" className="text-blue-500 underline">
          Back to forum
        </Link>
      </div>
    );
  }

  return (
    <div className="font-serif">
      {/* Top Image Border */}
      <div className="h-12 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-top-bg.png)' }} />

      {/* Content */}
      <div className="bg-repeat-y bg-top" style={{ backgroundImage: 'url(/assets/content-middle-bg.png)' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-6">
          <Link to={`/forum/${post.category}`} className="text-yellow-500 underline mb-4 inline-block text-sm">
            &larr; Back to forum
          </Link>

          <div className="bg-white border border-gray-300 shadow-lg rounded p-6">
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded text-white text-xs font-bold uppercase tracking-wide ${getCategoryBadgeColor(
                  post.category
                )}`}
              >
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-[#343637] mb-4">{post.title}</h1>

            <p className="whitespace-pre-line text-gray-800 mb-6 leading-relaxed">{post.content}</p>

            <div className="text-gray-600 text-sm flex flex-wrap gap-6 border-t pt-4">
              <span>
                <strong>Author:</strong> {post.authorName}
              </span>
              <span>
                <strong>Posted:</strong> {post.createdAt.toLocaleString()}
              </span>
              <span>
                <strong>Replies:</strong> {post.replies}
              </span>
              <span>
                <strong>Views:</strong> {post.views + 1}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Image Border */}
      <div className="h-12 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-bottom-bg.png)' }} />
    </div>
  );
};

export default ForumPostPage;

// Category Badge Color Logic
const getCategoryBadgeColor = (category: string) => {
  const colors: Record<string, string> = {
    general: 'bg-gray-500',
    skyblock: 'bg-blue-500',
    bedwars: 'bg-red-500',
    skywars: 'bg-yellow-500',
    announcements: 'bg-purple-600',
    suggestions: 'bg-green-600',
    support: 'bg-orange-500',
    'community-info': 'bg-teal-600',
    'hypixel-server': 'bg-pink-600',
  };
  return colors[category] || 'bg-gray-500';
};

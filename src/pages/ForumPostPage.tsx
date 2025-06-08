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

        // Increment views atomically
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
        <Link to="/forum" className="text-blue-500 underline">
          Back to forum
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-900 text-white rounded-md shadow-md mt-8">
      <Link to="/forums" className="text-blue-400 underline mb-4 inline-block">
        &larr; Back to forum
      </Link>
      <div className="mb-4">
        <span
          className={`px-2 py-1 rounded text-white text-xs font-semibold ${getCategoryBadgeColor(
            post.category
          )}`}
        >
          {post.category}
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="whitespace-pre-line mb-6">{post.content}</p>
      <div className="text-gray-400 text-sm flex flex-wrap gap-4">
        <span>By {post.authorName}</span>
        <span>Created: {post.createdAt.toLocaleString()}</span>
        <span>{post.replies} replies</span>
        <span>{post.views + 1} views</span>
      </div>
    </div>
  );
};

export default ForumPostPage;

// You can copy getCategoryBadgeColor from your Forum component or extract it to a utils file.
const getCategoryBadgeColor = (category: string) => {
  const colors: Record<string, string> = {
    general: 'bg-gray-500',
    skyblock: 'bg-blue-500',
    bedwars: 'bg-red-500',
    skywars: 'bg-yellow-500',
    announcements: 'bg-purple-500',
    suggestions: 'bg-green-500',
    support: 'bg-orange-500',
  };
  return colors[category] || 'bg-gray-500';
};

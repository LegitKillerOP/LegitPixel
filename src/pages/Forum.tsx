import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  QuerySnapshot,
} from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from '../utils/firebase';
import { useAuth } from "../context/AuthContext";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  createdAt: Date;
  replies?: number;
  views?: number;
  isPinned?: boolean;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'general', label: 'General Discussion' },
  { value: 'skyblock', label: 'SkyBlock' },
  { value: 'bedwars', label: 'Bed Wars' },
  { value: 'skywars', label: 'SkyWars' },
  { value: 'announcements', label: 'Announcements' },
  { value: 'suggestions', label: 'Suggestions' },
  { value: 'support', label: 'Support' },
];

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

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });

  const { currentUser: user } = useAuth();

  // Realtime posts listener
  useEffect(() => {
    const postsRef = collection(db, "forumPosts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const loadedPosts: ForumPost[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
          category: data.category,
          authorName: data.authorName,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          replies: data.replies ?? 0,
          views: data.views ?? 0,
          isPinned: data.isPinned ?? false,
        };
      });
      setPosts(loadedPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter posts by category and search
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (date: Date) =>
    date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Handle new post submission
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
      await addDoc(collection(db, "forumPosts"), {
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        authorName: user?.displayName || user?.email || 'Anonymous',
        createdAt: serverTimestamp(),
        replies: 0,
        views: 0,
        isPinned: false,
      });
      setNewPost({ title: '', content: '', category: 'general' });
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-900 text-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">Community Forum</h1>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          className="flex-1 p-2 rounded bg-slate-800 border border-purple-600 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 rounded bg-slate-800 border border-purple-600 text-white max-w-xs"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded hover:opacity-90"
        >
          Create Post
        </button>
      </div>

      {/* Create Post Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-md p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 rounded bg-slate-700 border border-purple-600 text-white"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
              />
              <select
                className="w-full p-2 rounded bg-slate-700 border border-purple-600 text-white"
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              >
                {categories
                  .filter((c) => c.value !== 'all')
                  .map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
              </select>
              <textarea
                rows={5}
                placeholder="Content"
                className="w-full p-2 rounded bg-slate-700 border border-purple-600 text-white resize-none"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts List */}
      {loading ? (
        <p className="text-center text-gray-400 mt-8">Loading posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">No posts found.</p>
      ) : (
        <ul className="space-y-6">
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              className="bg-slate-800 rounded-md p-4 hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                {post.isPinned && <span className="text-yellow-400 font-bold">📌</span>}
                <span
                  className={`px-2 py-1 rounded text-white text-xs font-semibold ${getCategoryBadgeColor(
                    post.category
                  )}`}
                >
                  {categories.find((c) => c.value === post.category)?.label || post.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
              <p className="text-gray-300 mb-3 line-clamp-2">{post.content}</p>
              <div className="text-gray-400 text-sm flex flex-wrap gap-4">
                <span>By {post.authorName}</span>
                <span>Created: {formatDate(post.createdAt)}</span>
                <span>{post.replies ?? 0} replies</span>
                <span>{post.views ?? 0} views</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Forum;

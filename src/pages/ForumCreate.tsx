import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../utils/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const categories = [
  { value: 'announcements', label: 'News and Announcements', adminOnly: true },
  { value: 'community-info', label: 'Community Info and Changes', adminOnly: true },
  { value: 'support', label: 'Support (Appeals, Bug Reports)', adminOnly: false },
  { value: 'suggestions', label: 'Suggestions', adminOnly: false },
  { value: 'hypixel-server', label: 'Hypixel Server Discussion', adminOnly: false },
  { value: 'general', label: 'General Discussion', adminOnly: false },
  { value: 'skywars', label: 'SkyWars', adminOnly: false },
  { value: 'skyblock', label: 'SkyBlock', adminOnly: false },
  { value: 'bedwars', label: 'BedWars', adminOnly: false },
];

const ForumCreate: React.FC = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0].value);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const selectedCategory = categories.find(cat => cat.value === category);
    if (!userData) {
      setError('You must be logged in to post.');
      return;
    }
    if (selectedCategory?.adminOnly && !userData.isAdmin) {
      setError('You do not have permission to post in this category.');
      return;
    }

    try {
      await addDoc(collection(db, 'forumPosts'), {
        title,
        content,
        category,
        authorId: userData.uid,
        authorName: userData.username,
        createdAt: Timestamp.now(),
        views: 0,
        replies: 0,
      });
      navigate('/forums');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post.');
    }
  };

  return (
    <div style={{ fontFamily: 'Neuton, serif' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-20 flex-col">
        <ul className="breadcrumbs py-2">
          <li className="text-yellow-400">Home</li>
          <li>/</li>
          <li className="text-yellow-400">Forum</li>
          <li>/</li>
          <li>Create Post</li>
        </ul>
        <div className="py-5 text-white">
          <h1 className="text-2xl">Create a New Forum Post</h1>
        </div>
      </div>

      <div className="h-12 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-top-bg.png)' }}></div>

      <div className="bg-repeat-y bg-top" style={{ backgroundImage: 'url(/assets/content-middle-bg.png)' }}>
        <div className="max-w-[900px] mx-auto px-8 py-10 bg-white shadow border border-gray-300 rounded">
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Category</label>
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label} {cat.adminOnly ? '(Admins only)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Content</label>
              <textarea
                className="w-full border border-gray-300 px-3 py-2 rounded h-40"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded"
              >
                Post Thread
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="h-12 mb-10 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-bottom-bg.png)' }}></div>
    </div>
  );
};

export default ForumCreate;

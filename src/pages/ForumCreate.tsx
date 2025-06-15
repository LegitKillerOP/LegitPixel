import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../utils/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const categories = [
  { value: 'announcements', label: 'News and Announcements', adminOnly: true },
  { value: 'community-info', label: 'Community Info and Changes', adminOnly: true },
  { value: 'support', label: 'Support (Appeals, Bug Reports)', adminOnly: false },
  { value: 'suggestions', label: 'Suggestions', adminOnly: false },
  { value: 'legitpixel-server', label: 'LegitPixel Server Discussion', adminOnly: false },
  { value: 'general', label: 'General Discussion', adminOnly: false },
  { value: 'skywars', label: 'SkyWars', adminOnly: false },
  { value: 'skyblock', label: 'SkyBlock', adminOnly: false },
  { value: 'bedwars', label: 'BedWars', adminOnly: false },
];

const ForumCreate: React.FC = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0].value);
  const [error, setError] = useState('');

  // Auto-select category from URL param
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam && categories.some(cat => cat.value === catParam)) {
      setCategory(catParam);
    }
  }, [searchParams]);

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
          <h1 className="text-3xl font-bold">Create a New Forum Post</h1>
        </div>
      </div>

      <div className="h-12 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-top-bg.png)' }}></div>

      <div className="bg-repeat-y bg-top" style={{ backgroundImage: 'url(/assets/content-middle-bg.png)' }}>
        <div className="max-w-[900px] mx-auto px-8 py-10 bg-white shadow-lg border border-gray-300 rounded-lg">
          {error && <div className="text-red-600 mb-4 font-semibold">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter your post title"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Category</label>
              <select
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              <label className="block text-gray-800 font-semibold mb-2">Content</label>
              <textarea
                placeholder="Write your post content here..."
                className="w-full border border-gray-300 px-4 py-2 rounded h-40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate('/forums')}
                className="text-gray-600 hover:text-black underline"
              >
                ← Back to Forum
              </button>
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

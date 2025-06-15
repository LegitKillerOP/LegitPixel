import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pin, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getForumPosts, deleteForumPost, pinForumPost } from '../services/Forum';
import type { ForumPost } from '../services/Forum';
import LoadingBar from '../components/LoadingBar';

const AdminPanel = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // New states for requested features:
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'replies' | 'pinned'>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const postsPerPage = 10;

  useEffect(() => {
    if (!userData?.isAdmin) {
      navigate('/');
      return;
    }
    loadPosts();
  }, [userData]);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const forumPosts = await getForumPosts();
      setPosts(forumPosts);
    } catch (error) {
      alert('Error loading posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteForumPost(postId);
      loadPosts();
      setSelectedPosts(prev => prev.filter(id => id !== postId));
    } catch (error) {
      alert('Failed to delete post.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedPosts.length} posts?`)) return;

    try {
      await Promise.all(selectedPosts.map(id => deleteForumPost(id)));
      setSelectedPosts([]);
      loadPosts();
    } catch {
      alert('Failed to delete selected posts.');
    }
  };

  const handlePinPost = async (postId: string, current: boolean) => {
    try {
      await pinForumPost(postId, !current);
      loadPosts();
    } catch (error) {
      alert('Failed to pin/unpin post.');
    }
  };

  const toggleSelectPost = (id: string) => {
    setSelectedPosts(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length === paginatedPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(paginatedPosts.map(p => p.id));
    }
  };

  // Filtering posts by search and category
  const filteredPosts = posts.filter(post => {
    const searchMatch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const categoryMatch = filterCategory ? post.category === filterCategory : true;

    return searchMatch && categoryMatch;
  });

  // Sorting posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'replies') {
      return (b.replies || 0) - (a.replies || 0);
    }
    if (sortBy === 'pinned') {
      return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
    }
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Reset currentPage if filtered result changes to avoid empty page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, sortBy]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';

    const date =
      typeof timestamp === 'string'
        ? new Date(timestamp)
        : timestamp?.toDate
        ? timestamp.toDate()
        : new Date();

    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  const getBadgeColor = (category: string) => {
    const colors: { [key: string]: string } = {
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

  if (!userData?.isAdmin) {
    return (
      <div>
        <LoadingBar isLoading={isLoading} />
        <div className="h-12 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-top-bg.png)' }} />
        <div className="max-w-[1200px] mx-auto px-5 sm:px-20 py-8">
          <div className="bg-red-950 border border-red-500 p-8 rounded-lg text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h1>
            <p className="text-gray-300">You do not have administrator privileges.</p>
          </div>
        </div>
        <div className="h-12 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-bottom-bg.png)' }} />
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-20 flex-col">
        <ul className="breadcrumbs py-2">
          <li className="text-yellow-400">Home</li>
        </ul>
        <div className="py-5 flex justify-between text-white">
          <h1 className="text-2xl">Admin</h1>
        </div>
      </div>

      {/* Top Decoration */}
      <div className="h-12 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-top-bg.png)' }} />

      <div
        className="max-w-[1200px] mx-auto px-5 sm:px-20 bg-repeat-y bg-top"
        style={{
          backgroundImage: 'url(/assets/content-middle-bg.png)',
        }}
      >
        {/* Header */}
        <div className="mb-8 text-gray-700">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-gray-700 font-serif">Manage and moderate forum posts</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-200 border border-gray-300 p-6 rounded text-center">
            <div className="text-3xl font-bold text-yellow-400">{posts.length}</div>
            <div className="text-gray-400">Total Posts</div>
          </div>
          <div className="bg-gray-200 border border-gray-300 p-6 rounded text-center">
            <div className="text-3xl font-bold text-yellow-400">{posts.filter((p) => p.isPinned).length}</div>
            <div className="text-gray-400">Pinned Posts</div>
          </div>
          <div className="bg-gray-200 border border-gray-300 p-6 rounded text-center">
            <div className="text-3xl font-bold text-yellow-400">{posts.filter((p) => p.category === 'announcements').length}</div>
            <div className="text-gray-400">Announcements</div>
          </div>
          <div className="bg-gray-200 border border-gray-300 p-6 rounded text-center">
            <div className="text-3xl font-bold text-yellow-400">{posts.filter((p) => p.category === 'support').length}</div>
            <div className="text-gray-400">Support Posts</div>
          </div>
        </div>

        {/* Search, Filter & Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-1 flex-grow"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="skyblock">Skyblock</option>
            <option value="bedwars">Bedwars</option>
            <option value="skywars">Skywars</option>
            <option value="announcements">Announcements</option>
            <option value="suggestions">Suggestions</option>
            <option value="support">Support</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border rounded px-3 py-1"
          >
            <option value="date">Sort by Date</option>
            <option value="replies">Sort by Replies</option>
            <option value="pinned">Sort by Pinned</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedPosts.length > 0 && (
          <div className="mb-4">
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Delete Selected ({selectedPosts.length})
            </button>
          </div>
        )}

        {/* Posts */}
        <div className="border border-gray-300 p-6 rounded">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Forum Posts</h2>

          {loading ? (
            <p className="text-center text-black">Loading posts...</p>
          ) : paginatedPosts.length === 0 ? (
            <p className="text-center text-black">No posts found.</p>
          ) : (
            <>
              <div className="mb-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPosts.length === paginatedPosts.length}
                  onChange={toggleSelectAll}
                />
                <label>Select All</label>
              </div>

              <div className="space-y-4">
                {paginatedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-300 rounded p-4 flex justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={selectedPosts.includes(post.id)}
                          onChange={() => toggleSelectPost(post.id)}
                        />
                        {post.isPinned && <Pin className="w-4 h-4 text-yellow-400" />}
                        <span
                          className={`text-xs px-2 py-1 rounded text-white ${getBadgeColor(
                            post.category
                          )}`}
                        >
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-black">{post.title}</h3>
                      <p className="text-sm text-black mb-2">{post.content.slice(0, 100)}...</p>
                      <div className="text-xs text-gray-500 flex gap-3 flex-wrap">
                        <span className="flex items-center gap-1">By {post.authorName}</span>
                        <span className="flex items-center gap-1">Created: {formatDate(post.createdAt)}</span>
                        <span className="flex items-center gap-1">{post.replies || 0} replies</span>
                        <span className="flex items-center gap-1">{post.views || 0} views</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => handlePinPost(post.id, post.isPinned || false)}
                        className={`p-2 rounded border text-xs ${
                          post.isPinned
                            ? 'bg-yellow-600 text-white'
                            : 'border-black text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 rounded border border-red-500 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded ${
                      currentPage === i + 1 ? 'bg-yellow-400' : 'bg-white'
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="h-12 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-bottom-bg.png)' }} />
    </div>
  );
};

export default AdminPanel;

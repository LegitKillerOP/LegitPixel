import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pin, Trash2, Eye, MessageCircle, User, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getForumPosts, deleteForumPost, pinForumPost } from '../services/Forum';
import type { ForumPost } from '../services/Forum';

const AdminPanel = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData?.isAdmin) {
      navigate('/');
      return;
    }
    loadPosts();
  }, [userData, navigate]);

  const loadPosts = async () => {
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
      alert('Post deleted successfully');
      loadPosts();
    } catch (error) {
      alert('Failed to delete post.');
    }
  };

  const handlePinPost = async (postId: string, currentPinStatus: boolean) => {
    try {
      await pinForumPost(postId, !currentPinStatus);
      alert(`Post ${!currentPinStatus ? 'pinned' : 'unpinned'} successfully`);
      loadPosts();
    } catch (error) {
      alert('Failed to pin/unpin post.');
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getBadgeColor = (category: string) => {
    const colors: { [key: string]: string } = {
      general: 'bg-gray-500',
      skyblock: 'bg-blue-500',
      bedwars: 'bg-red-500',
      skywars: 'bg-yellow-500',
      announcements: 'bg-purple-500',
      suggestions: 'bg-green-500',
      support: 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  if (!userData?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-950 border border-red-500 p-8 rounded-lg text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-300">You do not have administrator privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
        <p className="text-gray-400">Manage forum posts and moderate the community</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-purple-500/20 p-6 rounded text-center">
          <div className="text-3xl font-bold text-purple-400">{posts.length}</div>
          <div className="text-gray-400">Total Posts</div>
        </div>
        <div className="bg-slate-900 border border-blue-500/20 p-6 rounded text-center">
          <div className="text-3xl font-bold text-blue-400">{posts.filter(p => p.isPinned).length}</div>
          <div className="text-gray-400">Pinned Posts</div>
        </div>
        <div className="bg-slate-900 border border-green-500/20 p-6 rounded text-center">
          <div className="text-3xl font-bold text-green-400">{posts.filter(p => p.category === 'announcements').length}</div>
          <div className="text-gray-400">Announcements</div>
        </div>
        <div className="bg-slate-900 border border-yellow-500/20 p-6 rounded text-center">
          <div className="text-3xl font-bold text-yellow-400">{posts.filter(p => p.category === 'support').length}</div>
          <div className="text-gray-400">Support Posts</div>
        </div>
      </div>

      {/* Posts */}
      <div className="bg-slate-900 border border-purple-500/20 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Forum Posts Management</h2>

        {loading ? (
          <p className="text-center text-gray-400 py-6">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 py-6">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-slate-800 border border-purple-500/20 p-4 rounded-lg">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {post.isPinned && <Pin className="w-4 h-4 text-yellow-400" />}
                      <span className={`text-xs px-2 py-1 rounded text-white ${getBadgeColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      {post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.authorName}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.createdAt)}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.replies || 0} replies</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views || 0} views</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => handlePinPost(post.id, post.isPinned || false)}
                      className={`px-2 py-1 text-sm rounded border ${post.isPinned ? 'bg-yellow-600 text-white' : 'border-purple-500 text-white hover:bg-purple-700'}`}
                    >
                      <Pin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-2 py-1 text-sm rounded border border-red-500 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

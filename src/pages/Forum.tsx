import React, { useEffect, useState } from 'react';
import {
  StickyNote,
  UserRound,
  AlertCircle,
  Settings,
  Info,
  MessageCircle,
  Gamepad2,
  Users,
  Megaphone,
  Lightbulb
} from 'lucide-react';
import LoadingBar from '../components/LoadingBar';
import { Link } from 'react-router-dom';
import { db } from '../utils/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  views: number;
  replies: number;
  category: string;
  authorName: string;
}

interface User {
  id: string;
  username: string;
  createdAt: Date;
  isOnline: boolean;
}

const Forum: React.FC = () => {
  const [forumData, setForumData] = useState<Record<string, { count: number; post: ForumPost | null }>>({});
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    threads: 0,
    members: 0,
    latestMember: '',
  });
  const { userData } = useAuth();

  const categories = [
    { value: 'announcements', label: 'News and Announcements', description: 'Official news and announcements.', adminOnly: true },
    { value: 'community-info', label: 'Community Info and Changes', description: 'Changes and updates.', adminOnly: true },
    { value: 'support', label: 'Support (Appeals, Bug Reports)', description: 'Appeals, reports, etc.', adminOnly: false },
    { value: 'suggestions', label: 'Suggestions', description: 'Share your feedback.', adminOnly: false },
    { value: 'hypixel-server', label: 'Hypixel Server Discussion', description: 'Talk about Hypixel games and updates.', adminOnly: false },
    { value: 'general', label: 'General Discussion', description: 'Off-topic or general chat.', adminOnly: false },
    { value: 'skywars', label: 'SkyWars', description: 'Discuss SkyWars strategies, maps and tips.', adminOnly: false },
    { value: 'skyblock', label: 'SkyBlock', description: 'SkyBlock economy, guides and co-ops.', adminOnly: false },
    { value: 'bedwars', label: 'BedWars', description: 'Tactics, team comps and BedWars fun.', adminOnly: false },
  ];

  const fetchLatestPost = async (category: string) => {
    const q = query(
      collection(db, 'forumPosts'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const latest = snapshot.docs[0]?.data();
    return {
      count: snapshot.size,
      post: latest
        ? {
            id: snapshot.docs[0].id,
            title: latest.title || 'Unknown',
            content: latest.content || '',
            createdAt: latest.createdAt?.toDate() || new Date(),
            views: latest.views || 0,
            replies: latest.replies || 0,
            category: latest.category || category,
            authorName: latest.authorName || 'Anonymous',
          }
        : null,
    };
  };

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const threadSnapshot = await getDocs(collection(db, 'forumPosts'));
        const membersSnapshot = await getDocs(
          query(collection(db, 'users'), orderBy('createdAt', 'desc'))
        );

        const forumResults: Record<string, { count: number; post: ForumPost | null }> = {};
        for (const cat of categories) {
          forumResults[cat.value] = await fetchLatestPost(cat.value);
        }
        setForumData(forumResults);

        setStats({
          threads: threadSnapshot.size,
          members: membersSnapshot.size,
          latestMember: membersSnapshot.docs[0]?.data()?.username || 'Unknown',
        });

        unsubscribe = onSnapshot(
          query(collection(db, 'users'), where('isOnline', '==', true)),
          (snapshot) => {
            setOnlineUsers(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                username: doc.data().username || 'Anonymous',
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                isOnline: true,
              }))
            );
          }
        );

        setIsLoading(false);
      } catch (err) {
        console.error('Error loading forum data:', err);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const renderCreateButton = (cat: string, isAdminOnly: boolean) => {
    const isAdmin = userData?.isAdmin;
    const canCreate = !isAdminOnly || isAdmin;
    return canCreate ? (
      <Link
        to={`/forum/create?category=${cat}`}
        className="text-sm text-blue-600 hover:underline"
      >
        + Create Thread
      </Link>
    ) : null;
  };

  const renderForumBox = (
    title: string,
    description: string,
    link: string,
    cat: string,
    isAdminOnly: boolean,
    IconComponent: React.ElementType
  ) => {
    const data = forumData[cat];
    return (
      <div className="border-b border-gray-300 p-3 flex justify-between items-center">
        <LoadingBar isLoading={isLoading} />
        <Link to={link} className="flex gap-3 items-center">
          <IconComponent className="text-yellow-400" />
          <div>
            <p className="text-[#4e2d15] font-bold">{title}</p>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </Link>
        <div className="flex gap-8 items-center">
          <div className="text-center">
            <p className="text-gray-700 text-sm">Threads</p>
            <p className="text-[#4e2d15]">{data?.count || 0}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-700 text-sm">Messages</p>
            <p className="text-[#4e2d15]">0</p>
          </div>
          <div className="text-sm text-right">
            {data?.post ? (
              <div className="flex gap-2 items-center">
                <UserRound className="border rounded-full p-1" />
                <div>
                  <Link
                    to={`/forum/${data.post.category}/${data.post.id}`}
                    className="text-[#4e2d15] hover:underline block"
                  >
                    <div>
                      {data.post.title}
                    </div>
                    <div>
                      <span className="text-gray-600">{data.post.createdAt.toLocaleDateString()}</span>
                      <span className="text-[#4e2d15] ml-1">- {data.post.authorName}</span>
                    </div>
                  </Link>
                  <div>{renderCreateButton(cat, isAdminOnly)}</div>
                </div>
              </div>
            ) : (
              <div>{renderCreateButton(cat, isAdminOnly)}</div>
            )}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div style={{ fontFamily: 'Neuton, serif' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-20 flex-col">
        <ul className="breadcrumbs py-2">
          <li className="text-yellow-400">Home</li>
        </ul>
        <div className="py-5 flex justify-between text-white">
          <h1 className="text-2xl">Forum List</h1>
        </div>
      </div>

      <div className="h-12 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-top-bg.png)' }}></div>

      <div className="bg-repeat-y bg-top" style={{ backgroundImage: 'url(/assets/content-middle-bg.png)' }}>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row px-16 gap-4">
          <div className="w-full">
            <div className="w-full">
              {/* Section: Official Updates */}
              <div className="bg-white border-1 border-gray-300 rounded mb-4">
                <div className="p-2 bg-gray-200 text-gray-700 border-b-gray-300">
                  <h3>Official Updates</h3>
                  <p>News, updates, and announcements from the team.</p>
                </div>
                {renderForumBox('News and Announcements', 'Official news and announcements.', '/forum/announcements', 'announcements', true, Megaphone)}
                {renderForumBox('Community Info and Changes', 'Changes and updates.', '/forum/community-info', 'community-info', true, Info)}
              </div>

              {/* Section: Contact the Staff Team */}
              <div className="bg-white border-1 border-gray-300 rounded mb-4">
                <div className="p-2 bg-gray-200 text-gray-700 border-b-gray-300">
                  <h3>Contact the Staff Team</h3>
                  <p>Report rule breakers, submit appeals, or open bug reports.</p>
                </div>
                {renderForumBox('Support (Appeals, Bug Reports)', 'Appeals, reports, etc.', '/forum/support', 'support', false, AlertCircle)}
              </div>

              {/* Section: Share Your Ideas */}
              <div className="bg-white border-1 border-gray-300 rounded mb-4">
                <div className="p-2 bg-gray-200 text-gray-700 border-b-gray-300">
                  <h3>Share Your Ideas</h3>
                  <p>Post suggestions to help improve the community.</p>
                </div>
                {renderForumBox('Suggestions', 'Share your feedback.', '/forum/suggestions', 'suggestions', false, Lightbulb)}
              </div>

              {/* Section: Server & Game Discussions */}
              <div className="bg-white border-1 border-gray-300 rounded mb-4">
                <div className="p-2 bg-gray-200 text-gray-700 border-b-gray-300">
                  <h3>Server & Game Discussions</h3>
                  <p>Talk about your favorite Hypixel games and topics.</p>
                </div>
                {renderForumBox('Hypixel Server Discussion', 'Talk about Hypixel games and updates.', '/forum/hypixel-server', 'hypixel-server', false, MessageCircle)}
                {renderForumBox('General Discussion', 'Off-topic or general chat.', '/forum/general', 'general', false, Users)}
              </div>

              {/* Section: Game Categories */}
              <div className="bg-white border-1 border-gray-300 rounded mb-4">
                <div className="p-2 bg-gray-200 text-gray-700 border-b-gray-300">
                  <h3>Game Categories</h3>
                  <p>Join discussions about specific Hypixel games.</p>
                </div>
                {renderForumBox('SkyWars', 'Discuss SkyWars strategies, maps and tips.', '/forum/skywars', 'skywars', false, Gamepad2)}
                {renderForumBox('SkyBlock', 'SkyBlock economy, guides and co-ops.', '/forum/skyblock', 'skyblock', false, StickyNote)}
                {renderForumBox('BedWars', 'Tactics, team comps and BedWars fun.', '/forum/bedwars', 'bedwars', false, Settings)}
              </div>

            </div>

          </div>

          <div className="w-full md:w-[250px] space-y-4">
            <div className="bg-white border rounded border-gray-300 flex gap-4 p-4 text-center">
              <UserRound className="user p-1 border-1 rounded-full" />
              <p className="font-semibold text-[#343637]">
                {userData?.username || 'Welcome'}
              </p>
            </div>
            <div className="bg-white border rounded border-gray-300 p-4">
              <h3 className="text-yellow-600 text-lg font-semibold mb-2">Members Online</h3>
              <p className="text-[#343637] font-medium">{onlineUsers.length}</p>
              <ul className="text-sm mt-2 space-y-1 text-gray-800">
                {onlineUsers.slice(0, 5).map((user) => (
                  <li key={user.id}>• {user.username}</li>
                ))}
              </ul>
              {onlineUsers.length > 5 && (
                <p className="text-xs text-blue-600">+{onlineUsers.length - 5} more online</p>
              )}
            </div>
            <div className="bg-white border rounded border-gray-300 p-4">
              <h3 className="text-yellow-600 text-lg font-semibold mb-2">Forum Statistics</h3>
              <div className="text-[#343637] text-sm space-y-1">
                <p>Threads: {stats.threads.toLocaleString()}</p>
                <p>Members: {stats.members.toLocaleString()}</p>
                <p>Latest Member: <span className="text-yellow-600 font-semibold">{stats.latestMember}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-12 mb-10 bg-no-repeat bg-top" style={{ backgroundImage: 'url(/assets/content-bottom-bg.png)' }}></div>
    </div>
  );
};

export default Forum;

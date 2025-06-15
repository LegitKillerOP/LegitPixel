import React, { useEffect, useState } from 'react';
import { StickyNote, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../utils/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
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
  const [latestAnnouncementPost, setLatestAnnouncementPost] = useState<ForumPost | null>(null);
  const [latestCommunityPost, setLatestCommunityPost] = useState<ForumPost | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [announcementCount, setAnnouncementCount] = useState<number>(0);
  const [communityCount, setCommunityCount] = useState<number>(0);
  const [lastOnlineUser, setLastOnlineUser] = useState<string>('Unknown');

  const [stats, setStats] = useState({
    threads: 0,
    members: 0,
    latestMember: '',
  });

  const { userData } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Threads Count
        const threadSnapshot = await getDocs(collection(db, 'forumPosts'));
        setStats((prev) => ({ ...prev, threads: threadSnapshot.size }));

        // Announcement Threads & Latest
        const announcementQuery = query(
          collection(db, 'forumPosts'),
          where('category', '==', 'announcements'),
          orderBy('createdAt', 'desc')
        );
        const announcementSnapshot = await getDocs(announcementQuery);
        setAnnouncementCount(announcementSnapshot.size);
        const latestAnn = announcementSnapshot.docs[0]?.data();
        setLatestAnnouncementPost({
          id: announcementSnapshot.docs[0]?.id ?? '',
          title: latestAnn?.title ?? 'Unknown',
          content: latestAnn?.content ?? '',
          createdAt: latestAnn?.createdAt?.toDate() ?? new Date(),
          views: latestAnn?.views ?? 0,
          replies: latestAnn?.replies ?? 0,
          category: latestAnn?.category ?? 'announcements',
          authorName: latestAnn?.authorName ?? 'Anonymous',
        });

        // Community Info Threads & Latest
        const communityQuery = query(
          collection(db, 'forumPosts'),
          where('category', '==', 'community-info'),
          orderBy('createdAt', 'desc')
        );
        const communitySnapshot = await getDocs(communityQuery);
        setCommunityCount(communitySnapshot.size);
        const latestCommunity = communitySnapshot.docs[0]?.data();
        setLatestCommunityPost({
          id: communitySnapshot.docs[0]?.id ?? '',
          title: latestCommunity?.title ?? 'Unknown',
          content: latestCommunity?.content ?? '',
          createdAt: latestCommunity?.createdAt?.toDate() ?? new Date(),
          views: latestCommunity?.views ?? 0,
          replies: latestCommunity?.replies ?? 0,
          category: latestCommunity?.category ?? 'community-info',
          authorName: latestCommunity?.authorName ?? 'Anonymous',
        });

        // Members
        const membersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
        const membersSnapshot = await getDocs(membersQuery);
        setStats((prev) => ({
          ...prev,
          members: membersSnapshot.size,
          latestMember: membersSnapshot.docs[0]?.data()?.username ?? 'Unknown',
        }));

        // Online Users
        const onlineQuery = query(
          collection(db, 'users'),
          where('isOnline', '==', true),
          orderBy('lastOnline', 'desc')
        );
        const onlineSnap = await getDocs(onlineQuery);
        if (!onlineSnap.empty) {
          const lastUser = onlineSnap.docs[0].data();
          setLastOnlineUser(lastUser.username ?? 'Unknown');
        }

        // Realtime Online Users
        const unsubscribeOnline = onSnapshot(
          query(collection(db, 'users'), where('isOnline', '==', true)),
          (snapshot) => {
            const users: User[] = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                username: data.username ?? 'Anonymous',
                createdAt: data.createdAt?.toDate?.() ?? new Date(),
                isOnline: true,
              };
            });
            setOnlineUsers(users);
          }
        );

        return () => unsubscribeOnline();
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const renderForumBox = (
    title: string,
    description: string,
    link: string,
    count: number,
    post: ForumPost | null
  ) => (
    <div className="border-b border-gray-300 p-3 flex justify-between items-center">
      <Link to={link} className="flex gap-3 items-center">
        <StickyNote className="text-yellow-400" />
        <div>
          <p className="text-[#4e2d15] font-bold">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </Link>
      <div className="flex gap-8 items-center">
        <div className="text-center">
          <p className="text-gray-700 text-sm">Threads</p>
          <p className="text-[#4e2d15]">{count}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-700 text-sm">Messages</p>
          <p className="text-[#4e2d15]">0</p>
        </div>
        {post && (
          <div className="flex gap-2 items-center text-sm">
            <UserRound className="border rounded-full p-1" />
            <div>
              <p className="text-[#4e2d15]">{post.title}</p>
              <span className="text-gray-600">{post.createdAt.toLocaleDateString()}</span>
              <span className="text-[#4e2d15] ml-1">- {post.authorName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

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
          {/* Main Forum Section */}
          <div className="w-full">
            <h2 className="text-[22px] font-normal text-[#343637] mb-4 font-serif">Leaderboards</h2>

            <div className="bg-white border-1 border-gray-300 rounded mb-4">
              <div className="p-2 bg-gray-200 text-gray-700 border-b-gray-300">
                  <h3 className="text-2xl">Official Communications</h3>
                  <p>Official news, announcements, and information posted by Hypixel Administrators regarding the network</p>
              </div>
              {renderForumBox(
                'News and Announcements',
                'Official news and announcements posted by staff.',
                '/forum/news-and-announcements',
                announcementCount,
                latestAnnouncementPost
              )}
              {renderForumBox(
                'Community Information and Changes',
                'Information about community changes and updates.',
                '/forum/community-information-and-changes',
                communityCount,
                latestCommunityPost
              )}
            </div>

            <div className="bg-white border-1 border-gray-300 rounded mb-4">
              <div className="p-2 bg-gray-200 text-gray-700 border-b-gray-300"><h3>Contact the Staff Team</h3>
                <p>In this section you can learn about how to report rule breakers, submit punishment appeals, or open bug reports.</p>
              </div>
              {renderForumBox(
                'Punishment Appeals',
                '',
                '/',
                0,
                null
              )}{renderForumBox(
                'Server Bug Reports',
                '',
                '/',
                0,
                null
              )}{renderForumBox(
                'Clip Submissions',
                '',
                '/',
                0,
                null
              )}{renderForumBox(
                'Report Rule Breakers',
                '',
                '/',
                0,
                null
              )}
            </div>

            <div className="bg-white border-1 border-gray-300 rounded mb-4">
              <div className="p-2 bg-gray-200 text-gray-700 border-b-gray-300"><h3>Hypixel Server</h3>
                <p>Discuss Hypixel server related topics, ask questions, post suggestions, and advertise or find a guild!</p>
              </div>
              {renderForumBox(
                'Hypixel Server Discussion',
                '',
                '/forum/hypixel-server',
                0,
                null
              )}{renderForumBox(
                'Community Help Forum',
                '',
                '/forum/hypixel-server',
                0,
                null
              )}{renderForumBox(
                'Ideas and Feedback',
                '',
                '/forum/hypixel-server',
                0,
                null
              )}{renderForumBox(
                'Guilds ',
                '',
                '/forum/hypixel-server',
                0,
                null
              )}
            </div>

            <div className="bg-white border-1 border-gray-300 rounded mb-4">
              <div className="p-2 bg-gray-200 text-gray-700 border-b-gray-300"><h3>Hypixel Community</h3>
                <p>Check out all the other sections dedicated to the Hypixel Forums, community creations, events, and non-Hypixel related discussions!</p>
              </div>
              {renderForumBox(
                'Hypixel Forum Discussion',
                '',
                '/forum/hypixel-forum',
                0,
                null
              )}{renderForumBox(
                'Off Topic',
                '',
                '/forum/hypixel-forum',
                0,
                null
              )}{renderForumBox(
                'Introduce Yourself',
                '',
                '/forum/hypixel-forum',
                0,
                null
              )}{renderForumBox(
                'Hypixel Events',
                '',
                '/forum/hypixel-forum',
                0,
                null
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-[250px] space-y-4">
            <div className="bg-white border rounded border-gray-300 flex gap-4 p-4 text-center">
              <UserRound className="user p-1 border-1 rounded-full" />
              <p className="font-semibold text-[#343637]">
                {userData?.username ? ` ${userData.username}` : 'Welcome'}
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
                <p>
                  Latest Member:{' '}
                  <span className="text-yellow-600 font-semibold">{stats.latestMember}</span>
                </p>
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

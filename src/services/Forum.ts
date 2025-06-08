import type { DocumentData } from 'firebase/firestore';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from '../utils/firebase';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  createdAt: Date;
  replies: number;
  views: number;
  isPinned: boolean;
}

export const createForumPost = async (
  title: string,
  content: string,
  category: string,
  authorId: string,
  authorName: string
) => {
  const docRef = await addDoc(collection(db, 'forums'), {
    title,
    content,
    category,
    authorId,
    authorName,
    createdAt: serverTimestamp(),
    isPinned: false,
    replies: 0,
    views: 0,
  });
  
  return docRef.id;
};

export const getForumPosts = async (): Promise<ForumPost[]> => {
  const q = query(collection(db, 'forumPosts'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;

    return {
      id: doc.id,
      authorName: data.authorName || 'Anonymous',
      category: data.category || 'general',
      content: data.content || '',
      createdAt: data.createdAt || new Date().toISOString(),
      isPinned: data.isPinned || false,
      replies: data.replies || 0,
      title: data.title || '',
      views: data.views || 0,
    };
  });
};

export const getForumPostsByCategory = async (category: string) => {
  const q = query(
    collection(db, 'forums'), 
    where('category', '==', category),
    orderBy('isPinned', 'desc'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ForumPost[];
};

export const pinForumPost = async (postId: string, isPinned: boolean): Promise<void> => {
  const postRef = doc(db, 'forumPosts', postId);
  await updateDoc(postRef, { isPinned });
};

export const deleteForumPost = async (postId: string): Promise<void> => {
  const postRef = doc(db, 'forumPosts', postId);
  await deleteDoc(postRef);
};

export const incrementViews = async (postId: string) => {
  const postRef = doc(db, 'forums', postId);
  // In a real app, you'd want to implement proper view counting
  // This is a simplified version
  await updateDoc(postRef, {
    views: (await import('firebase/firestore')).increment(1)
  });
};

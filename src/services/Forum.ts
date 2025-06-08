
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
  authorId: string;
  authorName: string;
  createdAt: any;
  isPinned?: boolean;
  replies?: number;
  views?: number;
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

export const getForumPosts = async () => {
  const q = query(collection(db, 'forums'), orderBy('isPinned', 'desc'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ForumPost[];
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

export const pinForumPost = async (postId: string, isPinned: boolean) => {
  await updateDoc(doc(db, 'forums', postId), {
    isPinned
  });
};

export const deleteForumPost = async (postId: string) => {
  await deleteDoc(doc(db, 'forums', postId));
};

export const incrementViews = async (postId: string) => {
  const postRef = doc(db, 'forums', postId);
  // In a real app, you'd want to implement proper view counting
  // This is a simplified version
  await updateDoc(postRef, {
    views: (await import('firebase/firestore')).increment(1)
  });
};

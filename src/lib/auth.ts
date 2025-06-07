
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

/**
 * Register a new user with email and password, and store user info in Firestore.
 */
export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save user data to Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    username,
    createdAt: serverTimestamp(),
  });

  return userCredential;
};

/**
 * Login an existing user with email and password.
 */
export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in with Google and store user info in Firestore if not already stored.
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  // Only store if it's a new user
  if (!docSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      username: user.displayName || "Unknown",
      createdAt: serverTimestamp(),
    });
  }

  return result;
};

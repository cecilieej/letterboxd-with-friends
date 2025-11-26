import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';

/**
 * Save user's movie list to Firestore
 */
export async function saveUserMovies(userId, movies) {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      movies: movies,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving movies:', error);
    throw error;
  }
}

/**
 * Get user's movie list from Firestore
 */
export async function getUserMovies(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data().movies || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting movies:', error);
    throw error;
  }
}

/**
 * Get all users (for friend list)
 */
export async function getAllUsers() {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    return snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}

/**
 * Save user profile
 */
export async function saveUserProfile(userId, profile) {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      displayName: profile.displayName,
      email: profile.email,
      photoURL: profile.photoURL,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
}
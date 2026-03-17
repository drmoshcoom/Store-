import { auth, db as firestore } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useState, useEffect } from 'react';

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'user';
  displayName?: string;
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(firestore, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        let userProfile = await getUserProfile(user.uid);
        
        // Auto-bootstrap admin role for the specified email
        if (!userProfile && user.email === 'drmoshart@gmail.com') {
          userProfile = {
            uid: user.uid,
            email: user.email,
            role: 'admin',
            displayName: user.displayName || 'Admin'
          };
          await setDoc(doc(firestore, 'users', user.uid), userProfile);
        }
        
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, profile, loading, isAdmin: profile?.role === 'admin' };
};

import { Injectable, inject } from '@angular/core';
import { doc, setDoc, getDoc, getDocs, serverTimestamp, collection } from 'firebase/firestore';

import { Firebase } from '../../core/services/firebase';
import { AppUser } from '../../shared/models/appUser';

@Injectable({
  providedIn: 'root',
})
export class User {
  firebase = inject(Firebase);

  async createUser(uid: string, email: string, name: string) {
    const ref = doc(this.firebase.firestore, 'users', uid);

    await setDoc(ref, {
      uid,
      name,
      email,
      role: 'user',
      createdAt: serverTimestamp(),
    });
  }

  async getUser(uid: string): Promise<AppUser | null> {
    const snap = await getDoc(doc(this.firebase.firestore, 'users', uid));
    return snap.exists() ? (snap.data() as AppUser) : null;
  }

  async getAllUsers(): Promise<AppUser[]> {
    const ref = collection(this.firebase.firestore, 'users');
    const snapshot = await getDocs(ref);

    return snapshot.docs.map((doc) => doc.data() as AppUser);
  }
}

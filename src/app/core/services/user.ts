import { Injectable, inject } from '@angular/core';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

import { Firebase } from '../../core/services/firebase';

@Injectable({
  providedIn: 'root',
})

export class User {
  firebase = inject(Firebase);

  async createUser(uid: string, email: string, name: string) {
    const ref = doc(this.firebase.firestore, 'users', uid);

    await setDoc(ref, {
      name,
      email,
      role: 'user',
      createdAt: serverTimestamp(),
    });
  }

  async getUser(uid: string) {
    const snap = await getDoc(doc(this.firebase.firestore, 'users', uid));

    return snap.exists() ? snap.data() : null;
  }
}

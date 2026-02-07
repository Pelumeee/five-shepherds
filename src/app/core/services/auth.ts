import { Injectable, inject } from '@angular/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { Firebase } from '../../core/services/firebase';
import { User } from '../../core/services/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firebase = inject(Firebase);
  private user = inject(User);

  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.firebase.auth, email, password);
    } catch (err) {
      console.log('this sis coming from the sign In method in the service' + err);
      throw this.normalizeError(err);
    }
  }

  async signUp(email: string, password: string, name: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.firebase.auth,
        email,
        password,
      );

      await this.user.createUser(userCredential.user.uid, userCredential.user.email!, name);
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  async logout(): Promise<void> {
    return signOut(this.firebase.auth);
  }

  private normalizeError(err: unknown): Error {
    if (err instanceof FirebaseError) {
      return new Error(err.code);
    }
    return new Error('auth/unknown-error');
  }
}

import { Injectable, inject } from '@angular/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { Firebase } from '../../core/services/firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firebase = inject(Firebase);

  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.firebase.auth, email, password);
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  async signUp(email: string, password: string): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(this.firebase.auth, email, password);
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

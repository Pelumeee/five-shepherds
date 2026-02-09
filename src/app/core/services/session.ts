import { Injectable, inject, signal } from '@angular/core';
import { onAuthStateChanged } from 'firebase/auth';
import { Firebase } from '../../core/services/firebase';
import { User } from '../../core/services/user';
import { AppUser } from '../../shared/models/appUser';

@Injectable({
  providedIn: 'root',
})
export class Session {
  private firebase = inject(Firebase);
  private users = inject(User);

  user = signal<AppUser | null>(null);
  loading = signal(true);

  constructor() {
    onAuthStateChanged(this.firebase.auth, async (authUser) => {
      if (!authUser) {
        this.user.set(null);
        this.loading.set(false);
        return;
      }

      const profile = await this.users.getUser(authUser.uid);
      this.user.set(profile);
      this.loading.set(false);
    });
  }
}

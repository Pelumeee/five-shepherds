import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
})
export class Auth {
  private auth = inject(AuthService);

  name = '';
  email = '';
  password = '';
  error = signal('');
  loading = signal(false);

  isLogin = signal(true);

  setMode(value: boolean) {
    this.isLogin.set(value);
  }

  async handleAuth() {
    if (this.isLogin() && (!this.email || !this.password)) {
      this.error.set('Email and password are required.');
      return;
    } else if (this.isLogin() === false && (!this.email || !this.password || !this.name)) {
      this.error.set('Please fill all fields!');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      if (this.isLogin()) {
        await this.auth.signIn(this.email, this.password);
      } else {
        const newUser = await this.auth.signUp(this.email, this.password, this.name);
        console.log(newUser);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.error.set(this.mapError(err.message));
        this.resetError();
      } else {
        this.error.set('Authentication failed...');
        this.resetError();
      }
    } finally {
      this.loading.set(false);
    }
  }

  private mapError(code: string): string {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Invalid email or password.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later.';
      case 'auth/email-already-in-use':
        return 'This email is already registered.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      default:
        return 'Authentication failed.';
    }
  }

  resetError() {
    setTimeout(() => {
      this.error.set('');
    }, 1000);
  }
}

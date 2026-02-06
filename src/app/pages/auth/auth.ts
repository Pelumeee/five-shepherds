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

  email = '';
  password = '';
  error = '';
  loading = signal(false);

  isLogin = signal(true);

  setMode(value: boolean) {
    this.isLogin.set(value);
  }

  async handleAuth() {
    if (!this.email || !this.password) {
      this.error = 'Email and password are required.';
      return;
    }

    this.loading.set(true);
    this.error = '';

    try {
      if (this.isLogin()) {
        await this.auth.signIn(this.email, this.password);
      } else {
        await this.auth.signUp(this.email, this.password);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.error = this.mapError(err.message);
        console.log(err);
      } else {
        this.error = 'Authentication failed...';
      }
    } finally {
      this.loading.set(false);
    }
  }

  private mapError(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'Email already registered.';
      default:
        return 'Authentication failed.';
    }
  }
}

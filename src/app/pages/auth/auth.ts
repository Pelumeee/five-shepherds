import { Component, inject } from '@angular/core';
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
  loading = false;

  async handleSignIn() {
    this.loading = true;
    this.error = '';

    try {
      await this.auth.signIn(this.email, this.password);
    } catch (err: any) {
      this.error = this.mapError(err.message);
    } finally {
      this.loading = false;
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

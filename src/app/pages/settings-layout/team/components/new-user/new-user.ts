import { Component, output, signal } from '@angular/core';
import { CloseIcon } from '../../../../../shared/components/close-icon/close-icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  imports: [CloseIcon, FormsModule],
  templateUrl: './new-user.html',
})
export class NewUser {
  closeForm = output();
  error = signal(false);
  errorText = signal('');

  fullName = '';
  email = '';
  role = 'user';

  handleFormSubmission() {
    if (!this.fullName || !this.email || !this.role) {
      this.error.set(true);
      this.errorText.set('All fields are required!');
      setTimeout(() => {
        this.error.set(false);
      }, 1000);
      return;
    }

    console.log(this.email, this.fullName, this.role);
  }

  handleCloseForm() {
    this.closeForm.emit();
  }
}

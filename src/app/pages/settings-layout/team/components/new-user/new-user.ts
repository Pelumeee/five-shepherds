import { Component, output } from '@angular/core';
import { CloseIcon } from '../../../../../shared/components/close-icon/close-icon';

@Component({
  selector: 'app-new-user',
  imports: [CloseIcon],
  templateUrl: './new-user.html',
})
export class NewUser {
  closeForm = output();

  handleCloseForm() {
    this.closeForm.emit();
  }
}

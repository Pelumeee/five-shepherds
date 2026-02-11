import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CloseIcon } from '../../../../../shared/components/close-icon/close-icon';

@Component({
  selector: 'app-new-product',
  imports: [FormsModule, CloseIcon],
  templateUrl: './new-product.html',
})
export class NewProduct {
  closeForm = output();

  error = signal(false);
  errorText = signal('');

  productName = '';
  sku = '';
  description = '';
  unit = '';
  status: 'active' | 'inactive' = 'active';
  selectedImage!: File;

  handleFormSubmission() {}
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedImage = input.files[0];
  }

  handleCloseForm() {
    this.closeForm.emit();
  }
}

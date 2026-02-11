import { Component, signal, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CloseIcon } from '../../../../../shared/components/close-icon/close-icon';
import { ProductPayload, ProductService } from '../../../../../core/services/product';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'app-new-product',
  imports: [FormsModule, CloseIcon],
  templateUrl: './new-product.html',
})
export class NewProduct {
  productService = inject(ProductService);
  toast = inject(ToastService);

  closeForm = output();

  isLoading = signal(false);
  isSuccess = signal(false);

  error = signal(false);
  errorText = signal('');

  productName = '';
  sku = '';
  description = '';
  unit: ProductPayload['unit'] = 'pcs';
  status: 'active' | 'inactive' = 'active';
  selectedImage!: File;

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedImage = input.files[0];
  }

  async handleFormSubmission() {
    if (!this.productName || !this.sku || !this.description || !this.selectedImage) {
      alert('All fields are required');
      return;
    }

    this.isLoading.set(true);

    try {
      await this.productService.createProduct(
        {
          name: this.productName,
          sku: this.sku,
          description: this.description,
          unit: this.unit,
          status: this.status,
        },
        this.selectedImage,
      );
      this.isSuccess.set(true);
      this.toast.show('Product created successfully', 'success');
      this.productService.productSavedSuccessFully.set(true);
    } catch (err) {
      this.toast.show('Failed to create product', 'error');
    } finally {
      this.isLoading.set(false);
      setTimeout(() => {
        this.isSuccess.set(false);
      }, 1500);
    }
  }

  handleCloseForm() {
    this.closeForm.emit();
  }

  get buttonText() {
    if (this.isLoading() && !this.isSuccess()) {
      return 'Saving...';
    }

    if (this.isSuccess()) {
      return 'Product saved';
    }

    return 'Save product';
  }
}

import { Component, signal, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CloseIcon } from '../../../../../shared/components/close-icon/close-icon';
import { ProductPayload, ProductService } from '../../../../../core/services/product';

@Component({
  selector: 'app-new-product',
  imports: [FormsModule, CloseIcon],
  templateUrl: './new-product.html',
})
export class NewProduct {
  productService = inject(ProductService);
  closeForm = output();

  isLoading = signal(false);

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
      const savedProduct = await this.productService.createProduct(
        {
          name: this.productName,
          sku: this.sku,
          description: this.description,
          unit: this.unit,
          status: this.status,
        },
        this.selectedImage,
      );
      console.log(savedProduct);
    } catch (err) {}
  }

  handleCloseForm() {
    this.closeForm.emit();
  }
}

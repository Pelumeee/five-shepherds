import { Component, signal, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CloseIcon } from '../../../../../shared/components/close-icon/close-icon';
import { ProductPayload, ProductService } from '../../../../../core/services/product';
import { ToastService } from '../../../../../core/services/toast';
import { ProductCreationFlowService } from '../../../../../core/services/product-creation-flow-service';
import { PRODUCT_CATEGORIES, ProductCategory } from '../../../../../constants/product-category';

@Component({
  selector: 'app-new-product',
  imports: [FormsModule, CloseIcon],
  templateUrl: './new-product.html',
})
export class NewProduct {
  productService = inject(ProductService);
  flow = inject(ProductCreationFlowService);
  toast = inject(ToastService);

  closeForm = output();

  isLoading = signal(false);
  isSuccess = signal(false);

  error = signal(false);
  errorText = signal('');
  productCategory = PRODUCT_CATEGORIES;

  // Form Inputs
  productName = '';
  brandName = '';
  sku = '';
  category: ProductCategory = 'electronics';
  description = '';
  unit: ProductPayload['unit'] = 'pcs';
  status: 'active' | 'inactive' = 'active';
  selectedImage!: File;

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedImage = input.files[0];
  }

  validateRequiredFields() {
    const requiredFields = {
      productName: this.productName,
      sku: this.sku,
      description: this.description,
      image: this.selectedImage,
      brandName: this.brandName,
      category: this.category,
    };

    if (Object.values(requiredFields).some((v) => v == null || v === '')) {
      alert('All fields are required');
      return false;
    }

    return true;
  }

  async handleFormSubmission() {
    if (!this.validateRequiredFields()) return;

    this.isLoading.set(true);

    try {
      await this.productService.createProduct(
        {
          name: this.productName,
          sku: this.sku,
          description: this.description,
          unit: this.unit,
          status: this.status,
          category: this.category,
          brandName: this.brandName,
        },
        this.selectedImage,
      );
      this.isSuccess.set(true);
      this.toast.show('Product created successfully', 'success');
      this.flow.productCreated();
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
    this.flow.reset();
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

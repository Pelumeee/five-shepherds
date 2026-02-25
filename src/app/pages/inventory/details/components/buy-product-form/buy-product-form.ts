import { Component, signal, computed, input, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CloseIcon } from '../../../../../shared/components/close-icon/close-icon';
import { InventoryObject } from '../../../../../core/services/inventory';
import { OrderService } from '../../../../../core/services/order';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'app-buy-product-form',
  imports: [FormsModule, CloseIcon],
  templateUrl: './buy-product-form.html',
})
export class BuyProductForm {
  orderService = inject(OrderService);
  toast = inject(ToastService);
  productDetails = input<InventoryObject>();
  closeForm = output<void>();
  error = signal(false);
  errorText = signal('');

  isSubmitting = signal(false);

  quantity = signal(1);
  offerPrice = signal(0);

  showOfferPrice = computed(() => {
    return this.quantity() > 3 && this.quantity() < this.productDetails()!.quantity;
  });

  isOverBought = computed(() => this.quantity() > this.productDetails()!.quantity);

  onQuantityChange(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.quantity.set(value);
    if (this.isOverBought()) {
      this.errorText.set('Quantity exceeds available stock.');
      this.error.set(true);
    } else {
      this.error.set(false);
    }
  }

  handleCloseForm() {
    this.closeForm.emit();
  }

  async handleFormSubmission() {
    if (this.quantity() < 1) {
      this.errorText.set('Quantity must be at least 1.');
      this.error.set(true);
      return;
    }

    try {
      this.isSubmitting.set(true);

      await this.orderService.createOrder(
        this.productDetails()!,
        this.quantity(),
        this.offerPrice(),
      );

      this.toast.show('Order created successfully!');
      this.closeForm.emit();
    } catch (error) {
      this.errorText.set('Failed to create order. Please try again.');
      this.error.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}

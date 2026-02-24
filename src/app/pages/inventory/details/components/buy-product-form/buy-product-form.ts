import { Component, signal, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CloseIcon } from '../../../../../shared/components/close-icon/close-icon';
import { InventoryObject } from '../../../../../core/services/inventory';

@Component({
  selector: 'app-buy-product-form',
  imports: [FormsModule, CloseIcon],
  templateUrl: './buy-product-form.html',
})
export class BuyProductForm {
  productDetails = input<InventoryObject>();
  error = signal(false);
  errorText = signal('');

  quantity = signal(1);
  offerPrice = signal(0);

  showOfferPrice = computed(() => {
    return this.quantity() > 3 && this.quantity() < this.productDetails()!.quantity;
  });

  onQuantityChange(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.quantity.set(value);
  }
  
  handleCloseForm() {}

  handleFormSubmission() {}
}

import { Component, input, inject, signal, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderObject, OrderService } from '../../../../core/services/order';
import { CloseIcon } from '../../../../shared/components/close-icon/close-icon';
import { ToastService } from '../../../../core/services/toast';

@Component({
  selector: 'app-counter-offer',
  imports: [CurrencyPipe, FormsModule, CloseIcon],
  templateUrl: './counter-offer.html',
})
export class CounterOffer {
  orderObject = input<OrderObject | null>(null);
  hideCounterOffer = output();
  orderService = inject(OrderService);
  toast = inject(ToastService);
  counterPrice = signal(0);
  optionalMessage = signal('');
  isLoading = signal(false);
  
  
  async sendCounterOffer() {
    this.isLoading.set(true);

    try {
      const order = this.orderObject();
      const counterPrice = this.counterPrice();
      const message = this.optionalMessage();

      if (counterPrice == null || isNaN(counterPrice)) {
        throw new Error('Please enter a valid counter price.');
      }

      if (counterPrice <= 0) {
        throw new Error('Counter price must be greater than zero.');
      }

      if (counterPrice >= order!.price) {
        throw new Error('Counter price should be less than the original price.');
      }

      if (message && message.length > 200) {
        throw new Error('Message cannot exceed 200 characters.');
      }

      await this.orderService.counterOfferOrder(order!, counterPrice, message);

      this.toast.show('Counter Offer sent successfully!', 'success');

      this.hideCounterOffer.emit();
      
    } catch (error: any) {
      console.error(error);
      this.toast.show(error.message ?? 'There was an error sending counter offer', 'error');
    } finally {
      this.isLoading.set(false);
    }
  }
}

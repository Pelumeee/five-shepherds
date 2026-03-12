import { Component, input, output, inject } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { OrderObject, OrderService } from '../../../../core/services/order';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago-pipe';
import { ToastService } from '../../../../core/services/toast';

@Component({
  selector: 'app-order-card',
  imports: [TimeAgoPipe, CurrencyPipe, NgClass],
  templateUrl: './order-card.html',
})
export class OrderCard {
  order = input<OrderObject>();
  isLoading = output<boolean>();
  orderObject = output<OrderObject>();
  showCounterOfferForm = output<boolean>();
  private orderService = inject(OrderService);
  private toastService = inject(ToastService);

  async rejectOrder() {
    this.isLoading.emit(true);
    try {
      await this.orderService.rejectOrder(this.order()!);
      this.toastService.show('Order rejected successfully', 'success');
      this.isLoading.emit(false);
    } catch (err) {
      console.log(err);
      this.toastService.show('Error rejecting order', 'error');
      this.isLoading.emit(false);
    }
  }

  async acceptOrder() {
    this.isLoading.emit(true);
    try {
      await this.orderService.acceptOrder(this.order()!);
      this.toastService.show('Order accepted successfully', 'success');
      this.isLoading.emit(false);
    } catch (err) {
      console.log(err);
      this.toastService.show('Error accepting order', 'error');
      this.isLoading.emit(false);
    }
  }

  handleShowCounterOfferForm() {
    this.showCounterOfferForm.emit(true);
    this.orderObject.emit(this.order()!);
  }

  conterOffer() {}
}

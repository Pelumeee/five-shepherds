import { Component, input, inject } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { OrderObject, OrderService } from '../../../../core/services/order';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago-pipe';

@Component({
  selector: 'app-order-card',
  imports: [TimeAgoPipe, CurrencyPipe, NgClass],
  templateUrl: './order-card.html',
})
export class OrderCard {
  order = input<OrderObject>();
  private orderService = inject(OrderService);

  rejectOrder() {}

  acceptOrder() {}

  conterOffer() {}
}

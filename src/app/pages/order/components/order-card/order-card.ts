import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { OrderObject } from '../../../../core/services/order';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago-pipe';

@Component({
  selector: 'app-order-card',
  imports: [TimeAgoPipe, CurrencyPipe],
  templateUrl: './order-card.html',
})
export class OrderCard {

  order = input<OrderObject>();

}

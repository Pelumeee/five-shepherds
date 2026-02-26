import { Component, input } from '@angular/core';
import { OrderObject } from '../../../../core/services/order';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.html',
})
export class OrderCard {

  order = input<OrderObject>();

}

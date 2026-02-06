import { Component, signal } from '@angular/core';
import { CounterOffer } from './components/counter-offer/counter-offer';

@Component({
  selector: 'app-order',
  imports: [CounterOffer],
  templateUrl: './order.html',
})
export class Order {
  showCounterOffer = signal(false);
}

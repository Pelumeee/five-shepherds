import { Component } from '@angular/core';
import { CounterOffer } from "./components/counter-offer/counter-offer";

@Component({
  selector: 'app-order',
  imports: [CounterOffer],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {

}

import { Component, input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderObject } from '../../../../core/services/order';
import { CloseIcon } from '../../../../shared/components/close-icon/close-icon';

@Component({
  selector: 'app-counter-offer',
  imports: [CurrencyPipe, FormsModule, CloseIcon],
  templateUrl: './counter-offer.html',
})
export class CounterOffer {
  orderObject = input<OrderObject | null>(null);
  counterOfferPrice = signal('');
  optionalMessage = signal('');

  sendCounterOffer() {}
}

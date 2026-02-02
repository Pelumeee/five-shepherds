import { Component, input } from '@angular/core';
import { SummaryCardsIcon } from '../summary-cards-icon/summary-cards-icon';

@Component({
  selector: 'app-summary-cards',
  imports: [SummaryCardsIcon],
  templateUrl: './summary-cards.html',
})
export class SummaryCards {
  name = input<string>();
  text = input<string>();
  value = input<string>();
}

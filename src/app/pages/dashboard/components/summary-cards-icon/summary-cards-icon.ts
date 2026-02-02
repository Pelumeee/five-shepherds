import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-cards-icon',
  imports: [],
  templateUrl: './summary-cards-icon.html',
})

export class SummaryCardsIcon {
  name = input<string>();
}

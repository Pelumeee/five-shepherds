import { Component, inject } from '@angular/core';
import { CtaCards } from './components/cta-cards/cta-cards';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { Session } from '../../core/services/session';

interface SummaryCard {
  name: string;
  text: string;
  value: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CtaCards, SummaryCards],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  session = inject(Session);

  get userName() {
    return this.session.user()?.name;
  }

  summaryItems: SummaryCard[] = [
    { name: 'products', text: 'Total products', value: '156' },
    { name: 'orders', text: 'Pending orders', value: '20' },
    { name: 'stocks', text: 'Out of stock', value: '5' },
    { name: 'sales', text: 'Total sales', value: '₦150,000,000.00' },
  ];
}

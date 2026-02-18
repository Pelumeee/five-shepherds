import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CtaCards } from './components/cta-cards/cta-cards';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { Session } from '../../core/services/session';
import { ProductCreationFlowService } from '../../core/services/product-creation-flow-service';
import { UserCreationFlowService } from '../../core/services/user-creation-flow-service';

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
  router = inject(Router);
  productflow = inject(ProductCreationFlowService);
  userflow = inject(UserCreationFlowService);

  addNewProduct = signal(false);

  get userName() {
    return this.session.user()?.name;
  }

  summaryItems: SummaryCard[] = [
    { name: 'products', text: 'Total products', value: '156' },
    { name: 'orders', text: 'Pending orders', value: '20' },
    { name: 'stocks', text: 'Out of stock', value: '5' },
    { name: 'sales', text: 'Total sales', value: '₦150,000,000.00' },
  ];

  redirectToCreateProduct() {
    this.productflow.startCreate();
    this.router.navigate(['/inventory/product']);
  }
  redirectToCreateUser() {
    this.userflow.startCreate();
    this.router.navigate(['/settings/team']);
  }
}

import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CtaCards } from './components/cta-cards/cta-cards';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { Session } from '../../core/services/session';
import { ProductCreationFlowService } from '../../core/services/product-creation-flow-service';
import { UserCreationFlowService } from '../../core/services/user-creation-flow-service';
import { ProductData, ProductService } from '../../core/services/product';
import { InventoryObject, InventoryService } from '../../core/services/inventory';

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

  product = inject(ProductService);
  inventory = inject(InventoryService);

  addNewProduct = signal(false);
  isLoading = signal(false);
  totalProduct = signal<ProductData[] | null>(null);
  totalInventory = signal<InventoryObject[] | null>(null);

  get userName() {
    return this.session.user()?.name;
  }

  summaryItems = computed<SummaryCard[]>(() => {
    const products = this.totalProduct();
    const inventories = this.totalInventory();

    let lowStock = 0;
    let outOfStock = 0;

    for (const p of inventories!) {
      if (p.quantity === 0) outOfStock++;
      else if (p.quantity < 5) lowStock++;
    }

    return [
      {
        name: 'products',
        text: 'Total products',
        value: products?.length.toString() || '0',
      },

      {
        name: 'stocks',
        text: 'Out of stock',
        value: outOfStock.toString() || '0',
      },
      { name: 'orders', text: 'Pending orders', value: '20' },
      { name: 'sales', text: 'Total sales', value: '₦15,000,000.00' },
    ];
  });

  constructor() {
    this.loadDashboard();
  }

  private async loadDashboard() {
    this.isLoading.set(true);

    try {
      const [products, inventory] = await Promise.all([
        this.product.getAllProduct(),
        this.inventory.getAllInventory(),
      ]);

      this.totalProduct.set(products);
      this.totalInventory.set(inventory);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  redirectToCreateProduct() {
    this.productflow.startCreate();
    this.router.navigate(['/inventory/product']);
  }
  redirectToCreateUser() {
    this.userflow.startCreate();
    this.router.navigate(['/settings/team']);
  }
}

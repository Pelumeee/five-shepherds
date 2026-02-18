import { Component, computed, input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CurrencyPipe } from '@angular/common';
import { InventoryObject } from '../../../../core/services/inventory';
import { StockBadge } from '../../details/components/stock-badge/stock-badge';

@Component({
  selector: 'app-inventory-card',
  imports: [CurrencyPipe, StockBadge],
  templateUrl: './inventory-card.html',
})
export class InventoryCard {
  route = inject(Router);
  inventoryObject = input<InventoryObject>();

  quantity = computed(() => this.inventoryObject()?.quantity ?? 0);

  stockLabel = computed(() => {
    const qty = this.quantity();

    if (qty < 1) return 'Out of stock';
    if (qty <= 5) return 'Low stock';
    return 'In stock';
  });

  stockStatus = computed(() => {
    const qty = this.quantity();

    if (qty < 1) return 'out';
    if (qty <= 5) return 'low';
    return 'in';
  });

  nagivateToEdit() {
    this.route.navigate(['/inventory/edit'], {
      queryParams: {
        sku: this.inventoryObject()?.sku,
      },
    });
  }
}

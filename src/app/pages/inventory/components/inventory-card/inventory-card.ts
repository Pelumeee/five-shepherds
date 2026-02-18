import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InventoryObject } from '../../../../core/services/inventory';
import { StockBadge } from '../../details/components/stock-badge/stock-badge';

@Component({
  selector: 'app-inventory-card',
  imports: [CurrencyPipe, StockBadge],
  templateUrl: './inventory-card.html',
})
export class InventoryCard {
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
}

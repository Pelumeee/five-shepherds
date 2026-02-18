import { Component, input, computed } from '@angular/core';
import { DecimalPipe, TitleCasePipe, DatePipe } from '@angular/common';
import { InventoryObject } from '../../../../../core/services/inventory';
import { StockBadge } from '../stock-badge/stock-badge';

@Component({
  selector: 'app-inventory-table',
  imports: [TitleCasePipe, DecimalPipe, DatePipe, StockBadge],
  templateUrl: './inventory-table.html',
})
export class InventoryTable {
  inventoryData = input<InventoryObject[]>();

  quantity = computed(() => this.inventoryData()?.[0]?.quantity ?? 0);

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

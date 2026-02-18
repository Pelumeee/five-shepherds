import { NgClass } from '@angular/common';
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-stock-badge',
  imports: [NgClass],
  templateUrl: './stock-badge.html',
})
export class StockBadge {
  quantity = input<number>(0);

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

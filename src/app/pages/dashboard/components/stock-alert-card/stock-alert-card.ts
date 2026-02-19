import { Component, input } from '@angular/core';
import { InventoryObject } from '../../../../core/services/inventory';

@Component({
  selector: 'app-stock-alert-card',
  imports: [],
  templateUrl: './stock-alert-card.html',
})
export class StockAlertCard {
  stockData = input<InventoryObject>();

  getColor(qty: number): string {
    if (qty === 0) return '#d32f2f'; // red
    if (qty < 3) return '#ff6b00'; // orange
    return '#f4b400'; // yellow
  }

  getPercent(qty: number): number {
    return Math.min((qty / 5) * 100, 100);
  }
}

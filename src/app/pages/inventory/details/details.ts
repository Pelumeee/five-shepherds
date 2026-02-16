import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { InventoryCard } from '../components/inventory-card/inventory-card';
import { InventoryPayload, InventoryService } from '../../../core/services/inventory';
import { DetailsSkeletonLoader } from './components/details-skeleton-loader/details-skeleton-loader';

@Component({
  selector: 'app-details',
  imports: [RouterLink, InventoryCard, DetailsSkeletonLoader, CurrencyPipe],
  templateUrl: './details.html',
})
export class Details {
  private inventory = inject(InventoryService);

  isLoading = signal(false);
  totalInventory = signal<InventoryPayload[]>([]);

  constructor() {
    this.loadInventory();
  }

  private async loadInventory() {
    this.isLoading.set(true);

    try {
      const data = await this.inventory.getAllInventory();
      this.totalInventory.set(data);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  totalWorth = computed(() => {
    const inventory = this.totalInventory();

    if (!inventory || !inventory.length) return 0;

    return inventory.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.sellingPrice) || 0;
      return sum + quantity * price;
    }, 0);
  });
}

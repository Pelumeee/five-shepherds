import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InventoryCard } from '../components/inventory-card/inventory-card';
import { InventoryPayload, InventoryService } from '../../../core/services/inventory';
import { DetailsSkeletonLoader } from "./components/details-skeleton-loader/details-skeleton-loader";

@Component({
  selector: 'app-details',
  imports: [RouterLink, InventoryCard, DetailsSkeletonLoader],
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
}

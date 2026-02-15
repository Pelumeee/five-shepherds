import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InventoryCard } from '../components/inventory-card/inventory-card';
import { InventoryPayload, InventoryService } from '../../../core/services/inventory';

@Component({
  selector: 'app-details',
  imports: [RouterLink, InventoryCard],
  templateUrl: './details.html',
})
export class Details {
  private inventory = inject(InventoryService);

  loading = signal(false);
  totalInventory = signal<InventoryPayload[]>([]);

  constructor() {
    this.loadInventory();
  }

  private async loadInventory() {
    this.loading.set(true);

    try {
      const data = await this.inventory.getAllInventory();
      this.totalInventory.set(data);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }
}

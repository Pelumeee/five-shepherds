import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { InventoryCard } from '../components/inventory-card/inventory-card';
import { InventoryPayload, InventoryService } from '../../../core/services/inventory';
import { DetailsSkeletonLoader } from './components/details-skeleton-loader/details-skeleton-loader';
import { InventoryTable } from "./components/inventory-table/inventory-table";

@Component({
  selector: 'app-details',
  imports: [RouterLink, InventoryCard, DetailsSkeletonLoader, CurrencyPipe, InventoryTable],
  templateUrl: './details.html',
})
export class Details {
  private inventory = inject(InventoryService);

  isLoading = signal(false);
  totalInventory = signal<InventoryPayload[]>([]);

  view = signal<'list' | 'grid'>('grid');

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

  stockStats = computed(() => {
    const inventory = this.totalInventory() ?? [];

    let inStock = 0;
    let lowStock = 0;
    let outStock = 0;

    inventory.forEach((item) => {
      const qty = Number(item.quantity) || 0;

      if (qty >= 5) inStock++;
      else if (qty > 0) lowStock++;
      else outStock++;
    });

    const total = inStock + lowStock + outStock;

    return {
      inStock,
      lowStock,
      outStock,
      total,
    };
  });

  page = signal(1);
  pageSize = signal(5);

  totalPages = computed(() => Math.ceil(this.totalInventory().length / this.pageSize()));

  paginatedInventory = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    const end = start + this.pageSize();

    return this.totalInventory().slice(start, end);
  });

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.page();
    const delta = 2;

    const pages: (number | string)[] = [];

    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(total - 1, current + delta);

    pages.push(1);

    if (rangeStart > 2) {
      pages.push('...');
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < total - 1) {
      pages.push('...');
    }

    if (total > 1) {
      pages.push(total);
    }

    return pages;
  });

  changePageSize(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'all') {
      this.pageSize.set(this.totalInventory().length);
    } else {
      this.pageSize.set(Number(value));
    }

    this.page.set(1);
  };

  changePage(p: number | string) {
    if (typeof p !== 'number') return;
    if (p < 1 || p > this.totalPages()) return;
    this.page.set(p);
  }
}

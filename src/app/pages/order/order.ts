import { Component, signal, inject, computed } from '@angular/core';
import { CounterOffer } from './components/counter-offer/counter-offer';
import { OrderObject, OrderService } from '../../core/services/order';
import { OrderSkeletonLoader } from './components/order-skeleton-loader/order-skeleton-loader';
import { OrderCard } from './components/order-card/order-card';

@Component({
  selector: 'app-order',
  imports: [CounterOffer, OrderSkeletonLoader, OrderCard],
  templateUrl: './order.html',
})
export class Order {
  private order = inject(OrderService);
  showCounterOffer = signal(false);
  isLoading = signal(false);
  totalOrders = signal<OrderObject[]>([]);

  constructor() {
    this.loadInventory();
  }

  orderStats = computed(() => {
    const stats = {
      pending: 0,
      accepted: 0,
      rejected: 0,
      countered: 0,
    };

    for (const order of this.totalOrders()) {
      stats[order.status]++;
    }

    return stats;
  });

  private async loadInventory() {
    this.isLoading.set(true);

    try {
      const data = await this.order.getAllOrders();
      this.totalOrders.set(data);
      console.log('Orders loaded:', data);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}

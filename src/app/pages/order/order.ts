import { Component, signal, inject, computed } from '@angular/core';
import { CounterOffer } from './components/counter-offer/counter-offer';
import { OrderObject, OrderService } from '../../core/services/order';
import { OrderSkeletonLoader } from './components/order-skeleton-loader/order-skeleton-loader';
import { OrderCard } from './components/order-card/order-card';
import { Spinner } from '../../shared/components/spinner/spinner';

@Component({
  selector: 'app-order',
  imports: [CounterOffer, OrderSkeletonLoader, OrderCard, Spinner],
  templateUrl: './order.html',
})
export class Order {
  private order = inject(OrderService);
  showCounterOffer = signal(false);
  orderSubmitting = signal(false);
  // totalOrders = signal<OrderObject[]>([]);

  orders = this.order.totalOrders;
  isLoading = this.order.isLoading;

  searchTerm = signal('');
  orderFilter = signal<'all' | 'pending' | 'accepted' | 'rejected' | 'countered'>('all');

  constructor() {
    this.order.getAllOrders();
  }

  orderStats = computed(() => {
    const stats = {
      pending: 0,
      accepted: 0,
      rejected: 0,
      countered: 0,
    };

    for (const order of this.orders()) {
      stats[order.status]++;
    }

    return stats;
  });

  filteredOrders = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const filter = this.orderFilter();

    return this.orders().filter((order) => {
      const matchesSearch =
        !term ||
        order.productName?.toLowerCase().includes(term) ||
        order.sku?.toLowerCase().includes(term);

      const matchesFilter = filter === 'all' || order.status === filter;

      return matchesSearch && matchesFilter;
    });
  });

  handleOrderSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  changeOrderFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value as
      | 'all'
      | 'pending'
      | 'accepted'
      | 'rejected'
      | 'countered';

    this.orderFilter.set(value);
  }

  showLoader(value: boolean) {
    this.orderSubmitting.set(value);
  }
}

import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Notification } from '../../settings-layout/preferences/components/notification/notification';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-new',
  imports: [Notification, RouterLink],
  templateUrl: './new.html',
})
export class New {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  selectedProduct = signal<Product | null>(null);

  async ngOnInit() {
    const sku = this.route.snapshot.queryParamMap.get('sku');

    if (sku) {
      const product = await this.productService.getProductBySku(sku);
      this.selectedProduct.set(product);
      console.log(product);
    }
  }

  testObj = {
    id: 'oo1',
    title: 'Use catalog images',
    description: 'Use default product images from catalog',
    isEnabled: true,
  };
}

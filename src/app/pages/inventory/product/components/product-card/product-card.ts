import { Component, input, inject } from '@angular/core';
import { ProductData } from '../../../../../core/services/product';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [TitleCasePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  router = inject(Router);

  product = input<ProductData>();

  addToInventory() {
    this.router.navigate(['/inventory/new'], {
      queryParams: {
        sku: this.product()?.sku,
      },
    });
  }
}

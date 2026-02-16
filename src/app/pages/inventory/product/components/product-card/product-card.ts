import { Component, input } from '@angular/core';
import { Product } from '../../../../../core/services/product';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [TitleCasePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input<Product>();
}

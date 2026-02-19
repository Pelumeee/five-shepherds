import { Component } from '@angular/core';
import { StockBadge } from '../../../inventory/details/components/stock-badge/stock-badge';

@Component({
  selector: 'app-best-selling-product-card',
  imports: [StockBadge],
  templateUrl: './best-selling-product-card.html',
})
export class BestSellingProductCard {}

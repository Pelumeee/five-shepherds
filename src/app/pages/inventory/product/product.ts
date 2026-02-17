import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NewProduct } from './components/new-product/new-product';
import { ProductCreationFlowService } from '../../../core/services/product-creation-flow-service';
import { ConfirmAddProductToInventory } from './components/confirm-add-product-to-inventory/confirm-add-product-to-inventory';
import { ProductData, ProductService } from '../../../core/services/product';
import { ProductCard } from './components/product-card/product-card';

@Component({
  selector: 'app-new',
  imports: [RouterLink, NewProduct, ConfirmAddProductToInventory, ProductCard],
  templateUrl: './product.html',
})
export class Product {
  router = inject(Router);
  flow = inject(ProductCreationFlowService);
  productService = inject(ProductService);

  inputValue = signal('');
  isTyping = computed(() => this.inputValue().length >= 3);
  isLoading = signal(false);
  allProducts = signal<ProductData[]>([]);
  searchedProducts = signal<ProductData[]>([]);

  constructor() {
    this.loadProduct();
  }

  private async loadProduct() {
    this.isLoading.set(true);

    try {
      const data = await this.productService.getAllProduct();
      this.allProducts.set(data);
      console.log('products', data);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  handleProductSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.trim().length < 3) {
      this.searchedProducts.set([]);
      this.inputValue.set(value);

      return;
    }

    const searchTerm = value.toLowerCase();
    const filteredProducts = this.allProducts().filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm),
    );
    this.searchedProducts.set(filteredProducts);
    this.inputValue.set(value);
  }

  navigateToAddInventotyPage() {
    this.router.navigate(['/inventory/new'], {
      queryParams: {
        sku: this.productService.newlyCreatedProductSku(),
      },
    });
  }
}

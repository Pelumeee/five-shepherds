import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NewProduct } from './components/new-product/new-product';
import { ProductCreationFlowService } from '../../../core/services/product-creation-flow-service';
import { ConfirmAddProductToInventory } from './components/confirm-add-product-to-inventory/confirm-add-product-to-inventory';
import { ProductPayload, ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-new',
  imports: [RouterLink, NewProduct, ConfirmAddProductToInventory],
  templateUrl: './product.html',
})
export class Product {
  router = inject(Router);
  flow = inject(ProductCreationFlowService);
  productService = inject(ProductService);





  inputValue = signal('');
  isShowProductForm = signal(false);
  isTyping = computed(() => this.inputValue().length >= 3);


  isLoading = signal(false);
  allProducts = signal<ProductPayload[]>([]);

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



  navigateToAddInventotyPage() {
    this.router.navigate(['/inventory/new'], {
      queryParams: {
        sku: this.productService.newlyCreatedProductSku(),
      },
    });
  }
}

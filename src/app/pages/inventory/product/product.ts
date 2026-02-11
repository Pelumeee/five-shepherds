import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewProduct } from './components/new-product/new-product';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-new',
  imports: [RouterLink, NewProduct],
  templateUrl: './product.html',
})
export class Product {
  productService = inject(ProductService);
  inputValue = signal('');
  isShowProductForm = signal(false);

  isTyping = computed(() => this.inputValue().length >= 3);

  showProductForm() {
    this.isShowProductForm.set(true);
  }
  closeProductForm() {
    this.isShowProductForm.set(false);
  }
}

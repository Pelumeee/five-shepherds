import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewProduct } from "./components/new-product/new-product";

@Component({
  selector: 'app-new',
  imports: [RouterLink, NewProduct],
  templateUrl: './product.html',
})
export class Product {
  inputValue = signal('');
  isShowProductForm = signal(false)

  isTyping = computed(() => this.inputValue().length >= 3);

  showProductForm(){
    this.isShowProductForm.set(true);
  }
  closeProductForm(){
    this.isShowProductForm.set(false);
  }
}

import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new',
  imports: [RouterLink],
  templateUrl: './product.html',
})
export class Product {
  inputValue = signal('');

  isTyping = computed(() => this.inputValue().length >= 3);
}

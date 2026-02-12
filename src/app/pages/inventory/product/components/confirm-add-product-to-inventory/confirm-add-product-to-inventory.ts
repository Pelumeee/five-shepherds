import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';

import { ProductCreationFlowService } from '../../../../../core/services/product-creation-flow-service';

@Component({
  selector: 'app-confirm-add-product-to-inventory',
  imports: [],
  templateUrl: './confirm-add-product-to-inventory.html',
})
export class ConfirmAddProductToInventory {
  flow = inject(ProductCreationFlowService);
  router = inject(Router);

  click = output();

  handleCloseForm() {
    this.flow.finish();
    this.router.navigate(['/inventory']);
  }

  handleClick() {
    this.flow.finish();
    this.click.emit();
  }
}

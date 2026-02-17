import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Notification } from '../../settings-layout/preferences/components/notification/notification';
import { ProductService } from '../../../core/services/product';
import { ToastService } from '../../../core/services/toast';
import { InventoryPayload, InventoryService } from '../../../core/services/inventory';
import { Spinner } from "../../../shared/components/spinner/spinner";

@Component({
  selector: 'app-new',
  imports: [Notification, RouterLink, TitleCasePipe, FormsModule, Spinner],
  templateUrl: './new.html',
})
export class New {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private inventoryService = inject(InventoryService);
  toast = inject(ToastService);

  selectedProduct = signal<Product | null>(null);
  issavingInventory = signal(false);

  sku = signal('');
  unit = signal<InventoryPayload['unit'] | null>(null);
  imageUrl = signal('');
  quantity = 1;
  sellingPrice = 0.0;
  costPrice = 0.0;
  barCode = '';
  minStock = 1;
  productName = signal('');
  productCategory = signal('');

  async ngOnInit() {
    const sku = this.route.snapshot.queryParamMap.get('sku');

    if (sku) {
      const product = await this.productService.getProductBySku(sku);
      this.selectedProduct.set(product);
      this.sku.set(product!.sku);
      this.unit.set(product!.unit);
      this.imageUrl.set(product!.imageUrl!);
      this.productName.set(product!.name);
      this.productCategory.set(product!.category);
    }
  }

  async addProdInventory() {
    if (!this.sellingPrice || !this.quantity) {
      this.toast.show('Please fill required inputs', 'error');
      return;
    }

    this.issavingInventory.set(true);

    const payLoad: InventoryPayload = {
      productName: this.productName(),
      sku: this.sku(),
      quantity: this.quantity,
      unit: this.unit()!,
      minStock: this.minStock,
      sellingPrice: this.sellingPrice,
      costPrice: this.costPrice,
      barCode: this.barCode,
      imageUrl: this.imageUrl(),
      productCategory: this.productCategory(),
    };

    try {
      await this.inventoryService.createInventory(payLoad);
      this.toast.show('Inventory added successfully', 'success');
      setTimeout(() => {
        this.issavingInventory.set(false);
        this.router.navigate(['/inventory']);
      }, 500);
    } catch (error: string | any) {
      this.issavingInventory.set(false);
      this.toast.show(error.message || error, 'error');
    }
  }

  testObj = {
    id: 'oo1',
    title: 'Use catalog images',
    description: 'Use default product images from catalog',
    isEnabled: true,
  };
}

import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Notification } from '../../settings-layout/preferences/components/notification/notification';
import { ProductService } from '../../../core/services/product';
import { ToastService } from '../../../core/services/toast';
import { InventoryPayload, InventoryService } from '../../../core/services/inventory';
import { Spinner } from '../../../shared/components/spinner/spinner';
import { SkeletonLoader } from "./components/skeleton-loader/skeleton-loader";

@Component({
  selector: 'app-new',
  imports: [Notification, RouterLink, TitleCasePipe, FormsModule, Spinner, SkeletonLoader],
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
  isDeletingInventory = signal(false);
  isEditMode = signal(false);
  isLoading = signal(true);

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
    this.isLoading.set(true);

    try {
      const sku = this.route.snapshot.queryParamMap.get('sku');
      const mode = this.route.snapshot.data['mode'];

      if (sku) {
        this.isEditMode.set(false);
        const product = await this.productService.getProductBySku(sku);
        this.selectedProduct.set(product);

        if (mode === 'new') {
          this.sku.set(product!.sku);
          this.unit.set(product!.unit);
          this.imageUrl.set(product!.imageUrl!);
          this.productName.set(product!.name);
          this.productCategory.set(product!.category);
        }
      }

      if (sku && mode === 'edit') {
        const inventory = await this.inventoryService.getInventoryBySku(sku);

        if (!inventory) {
          this.toast.show('There was an error retrieving inventory details', 'error');
          this.router.navigate(['/inventory']);
          return;
        }

        this.isEditMode.set(true);
        this.sku.set(inventory.sku);
        this.unit.set(inventory.unit);
        this.quantity = inventory.quantity;
        this.sellingPrice = inventory.sellingPrice;
        this.costPrice = inventory.costPrice || 0;
        this.barCode = inventory.barCode || '';
        this.minStock = inventory.minStock || 1;
      }
    } catch (error) {
      console.error(error);
      this.toast.show('Something went wrong while loading product', 'error');
    } finally {
      this.isLoading.set(false);
    }
  }

  async addInventory() {
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
  async updateInventory() {
    if (!this.sellingPrice || !this.quantity) {
      this.toast.show('Please fill required inputs', 'error');
      return;
    }

    this.issavingInventory.set(true);

    const payLoad = {
      quantity: this.quantity,
      sellingPrice: this.sellingPrice,
      costPrice: this.costPrice,
      barCode: this.barCode,
    };

    try {
      await this.inventoryService.updateInventory(this.sku(), payLoad);
      this.toast.show('Inventory updated successfully', 'success');
      setTimeout(() => {
        this.issavingInventory.set(false);
        this.router.navigate(['/inventory']);
      }, 500);
    } catch (error: string | any) {
      this.issavingInventory.set(false);
      this.toast.show(error.message || error, 'error');
    }
  }

  async deleteInventory(sku: string) {
    const confirmDelete = confirm('Are you sure you want to delete this item?');

    if (!confirmDelete) return;

    this.isDeletingInventory.set(true);
    try {
      await this.inventoryService.deleteInventory(sku);

      this.toast.show('Inventory deleted successfully', 'success');
      this.router.navigate(['/inventory']);
    } catch (error) {
      console.error(error);
      this.toast.show('Failed to delete inventory', 'error');
    } finally {
      this.isDeletingInventory.set(false);
    }
  }

  testObj = {
    id: 'oo1',
    title: 'Use catalog images',
    description: 'Use default product images from catalog',
    isEnabled: true,
  };
}

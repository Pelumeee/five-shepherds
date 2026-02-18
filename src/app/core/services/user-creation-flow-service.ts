import { Injectable, signal } from '@angular/core';

type ProductFlowStep = 'idle' | 'create' | 'confirmInventory' | 'done';
@Injectable({
  providedIn: 'root',
})
export class ProductCreationFlowService {
  step = signal<ProductFlowStep>('idle');

  startCreate() {
    this.step.set('create');
  }

  productCreated() {
    this.step.set('confirmInventory');
  }

  finish() {
    this.step.set('done');
  }

  reset() {
    this.step.set('idle');
  }
}

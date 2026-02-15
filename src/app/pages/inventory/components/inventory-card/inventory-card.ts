import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-inventory-card',
  imports: [NgClass],
  templateUrl: './inventory-card.html',
})

export class InventoryCard {
  quantity = signal(6);
}

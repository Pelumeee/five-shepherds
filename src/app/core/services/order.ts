import { Injectable, inject } from '@angular/core';
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { Firebase } from '../../core/services/firebase';

export interface OrderService {
  id?: string;
  orderNumber: string;

  inventoryId: string;

  productName: string;
  sku: string;
  productImage: string;

  price: number;
  quantity: number;
  totalPrice: number;

  offerPrice?: number;
  counterPrice?: number;

  status: 'pending' | 'accepted' | 'rejected' | 'countered';

  customerName?: string;

  createdBy: 'external' | 'admin';

  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  firebase = inject(Firebase);
}

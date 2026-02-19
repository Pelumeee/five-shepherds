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

export interface InventoryPayload {
  productName: string;
  sku: string;
  quantity: number;
  unit: 'pcs' | 'kg' | 'ltr';
  minStock?: number;
  sellingPrice: number;
  costPrice?: number;
  barCode?: string;
  imageUrl: string;
  productCategory: string;
}

export interface InventoryObject extends InventoryPayload {
  createdAt?: any;
  updatedAt?: any;
}

@Injectable({
  providedIn: 'root',
})

export class InventoryService {
  firebase = inject(Firebase);

  async createInventory(payload: InventoryPayload): Promise<string> {
    const ref = doc(this.firebase.firestore, 'inventory', payload.sku);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      throw new Error('Inventory already exists for this product');
    }

    await setDoc(ref, {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return ref.id;
  }

  async getInventoryBySku(sku: string): Promise<InventoryPayload | null> {
    const ref = doc(this.firebase.firestore, 'inventory', sku);
    const snap = await getDoc(ref);

    return snap.exists() ? (snap.data() as InventoryPayload) : null;
  }

  async getAllInventory(): Promise<InventoryObject[]> {
    const ref = collection(this.firebase.firestore, 'inventory');
    const snap = await getDocs(ref);

    return snap.docs.map((doc) => doc.data() as InventoryObject);
  }

  async updateInventory(sku: string, updates: Partial<InventoryPayload>): Promise<void> {
    const ref = doc(this.firebase.firestore, 'inventory', sku);

    await updateDoc(ref, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }

  async deleteInventory(sku: string): Promise<void> {
    const ref = doc(this.firebase.firestore, 'inventory', sku);
    await deleteDoc(ref);
  }
}

import { Injectable, inject } from '@angular/core';
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { Firebase } from '../../core/services/firebase';

// export interface Inventory {
//   sku: string;
//   quantity: number;
//   sellingPrice: number;
//   costPrice?: number;
//   unit?: 'pcs' | 'kg' | 'ltr';
//   minStock?: number;
//   createdAt?: any;
//   updatedAt?: any;
// }

export interface InventoryPayload {
  sku: string;
  quantity: number;
  unit: 'pcs' | 'kg' | 'ltr';
  minStock?: number;
  sellingPrice: number;
  costPrice?: number;
  barCode?: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  firebase = inject(Firebase);

  async createInventory(payload: InventoryPayload): Promise<string> {
    const ref = doc(this.firebase.firestore, 'inventory', payload.sku);

    await setDoc(ref, {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return ref.id;
  }

  /* ================= GET ONE ================= */
  async getInventoryBySku(sku: string): Promise<InventoryPayload | null> {
    const ref = doc(this.firebase.firestore, 'inventory', sku);
    const snap = await getDoc(ref);

    return snap.exists() ? (snap.data() as InventoryPayload) : null;
  }

  /* ================= GET ALL ================= */
  async getAllInventory(): Promise<InventoryPayload[]> {
    const ref = collection(this.firebase.firestore, 'inventory');
    const snap = await getDocs(ref);

    return snap.docs.map((doc) => doc.data() as InventoryPayload);
  }

  /* ================= UPDATE ================= */
  async updateInventory(sku: string, updates: Partial<InventoryPayload>): Promise<void> {
    const ref = doc(this.firebase.firestore, 'inventory', sku);

    await updateDoc(ref, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }
}

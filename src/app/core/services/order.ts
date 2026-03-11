import { Injectable, inject } from '@angular/core';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  runTransaction,
} from 'firebase/firestore';

import { Firebase } from '../../core/services/firebase';
import { InventoryObject } from './inventory';

export interface OrderObject {
  id?: string;

  orderNumber: string;

  inventoryId: string;
  productName: string;
  sku: string;
  productImage: string;

  price: number;
  quantity: number;
  totalPrice: number;

  offerPrice?: number | null;
  counterPrice?: number | null;

  status: 'pending' | 'accepted' | 'rejected' | 'countered';

  customerName?: string;
  createdBy: 'external' | 'admin';

  createdAt: any;
  updatedAt: any;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  firebase = inject(Firebase);
  private ordersRef = collection(this.firebase.firestore, 'orders');

  async createOrder(
    inventory: InventoryObject,
    quantity: number,
    offerPrice?: number,
  ): Promise<string> {
    const ref = doc(this.ordersRef);

    const payload = {
      orderNumber: 'ORD-' + Date.now(),

      inventoryId: inventory.sku,
      productName: inventory.productName,
      sku: inventory.sku,
      productImage: inventory.imageUrl,

      price: inventory.sellingPrice,
      quantity,
      totalPrice: inventory.sellingPrice * quantity,

      offerPrice: offerPrice ?? null,
      counterPrice: null,

      status: 'pending' as const,
      customerName: 'Simulated Customer',
      createdBy: 'external' as const,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(ref, payload);

    return ref.id;
  }

  // ========================
  // GET ONE
  // ========================

  async getOrder(id: string) {
    const ref = doc(this.firebase.firestore, 'orders', id);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...snap.data(),
    };
  }

  // ========================
  // GET ALL
  // ========================

  async getAllOrders(): Promise<OrderObject[]> {
    const q = query(this.ordersRef, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    return snap.docs.map((doc) => {
      const data = doc.data() as Omit<OrderObject, 'id'>;

      return {
        id: doc.id,
        ...data,
      };
    });
  }

  // ========================
  // UPDATE GENERIC
  // ========================

  // async updateOrder(id: string, data: Partial<Order>) {
  //   const ref = doc(this.firebase.firestore, 'orders', id);

  //   await updateDoc(ref, {
  //     ...data,
  //     updatedAt: serverTimestamp(),
  //   });
  // }

  // ========================
  // ACCEPT ORDER
  // ========================

  async acceptOrder(order: OrderObject) {
    const firestore = this.firebase.firestore;

    const orderRef = doc(firestore, 'orders', order.id!);
    const inventoryRef = doc(firestore, 'inventory', order.inventoryId);

    await runTransaction(firestore, async (transaction) => {
      const orderSnap = await transaction.get(orderRef);

      if (!orderSnap.exists()) {
        throw new Error('Order not found');
      }

      const inventorySnap = await transaction.get(inventoryRef);

      if (!inventorySnap.exists()) {
        throw new Error('Inventory item not found');
      }

      const inventoryData = inventorySnap.data() as InventoryObject;
      const currentStock = inventoryData?.quantity ?? 0;

      if (currentStock < order.quantity) {
        throw new Error('Not enough stock to accept this order');
      }

      // Deduct stock
      transaction.update(inventoryRef, {
        stock: currentStock - order.quantity,
        updatedAt: serverTimestamp(),
      });

      // Update order
      transaction.update(orderRef, {
        status: 'accepted',
        updatedAt: serverTimestamp(),
      });
    });
  }

  // ========================
  // REJECT ORDER
  // ========================

  // async rejectOrder(id: string) {
  //   const ref = doc(this.firebase.firestore, 'orders', id);

  //   await updateDoc(ref, {
  //     status: 'rejected',
  //     updatedAt: serverTimestamp(),
  //   });
  // }

  // ========================
  // COUNTER OFFER
  // ========================

  // async counterOrder(id: string, counterPrice: number) {
  //   const ref = doc(this.firebase.firestore, 'orders', id);

  //   await updateDoc(ref, {
  //     status: 'countered',
  //     counterPrice,
  //     updatedAt: serverTimestamp(),
  //   });
  // }
}

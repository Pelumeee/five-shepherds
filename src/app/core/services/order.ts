import { Injectable, inject, signal } from '@angular/core';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  runTransaction,
  onSnapshot,
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
  counterMessage?: string | null;

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
  private unsubscribeOrders?: () => void;

  isLoading = signal(false);
  totalOrders = signal<OrderObject[]>([]);

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

  getAllOrders() {
    const q = query(this.ordersRef, orderBy('createdAt', 'desc'));

    this.isLoading.set(true);

    this.unsubscribeOrders?.();

    this.unsubscribeOrders = onSnapshot(
      q,
      (snap) => {
        const orders = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<OrderObject, 'id'>),
        }));

        this.totalOrders.set(orders);
        this.isLoading.set(false); // first snapshot arrived
      },
      (error) => {
        console.error(error);
        this.isLoading.set(false);
      },
    );
  }

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
        quantity: currentStock - order.quantity,
        updatedAt: serverTimestamp(),
      });

      // Update order
      transaction.update(orderRef, {
        status: 'accepted',
        updatedAt: serverTimestamp(),
      });
    });
  }

  async rejectOrder(order: OrderObject) {
    const firestore = this.firebase.firestore;

    const orderRef = doc(firestore, 'orders', order.id!);

    await runTransaction(firestore, async (transaction) => {
      const orderSnap = await transaction.get(orderRef);

      if (!orderSnap.exists()) {
        throw new Error('Order not found');
      }

      const orderData = orderSnap.data() as OrderObject;

      if (orderData.status !== 'pending') {
        throw new Error('Order already processed');
      }

      transaction.update(orderRef, {
        status: 'rejected',
        updatedAt: serverTimestamp(),
      });
    });
  }

  async counterOfferOrder(order: OrderObject, counterPrice: number, message?: string) {
    const firestore = this.firebase.firestore;

    const orderRef = doc(firestore, 'orders', order.id!);

    await runTransaction(firestore, async (transaction) => {
      const orderSnap = await transaction.get(orderRef);

      if (!orderSnap.exists()) {
        throw new Error('Order not found');
      }

      const orderData = orderSnap.data() as OrderObject;

      if (orderData.status !== 'pending') {
        throw new Error('Order already processed');
      }

      transaction.update(orderRef, {
        status: 'countered',
        counterPrice: counterPrice,
        counterMessage: message ?? null,
        updatedAt: serverTimestamp(),
      });
    });
  }
}

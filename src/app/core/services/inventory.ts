import { Injectable } from '@angular/core';
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

export interface Inventory {
  sku: string;
  quantity: number;
  sellingPrice: number;
  costPrice?: number;
  unit?: 'pcs' | 'kg' | 'ltr';
  minStock?: number;
  createdAt?: any;
  updatedAt?: any;
}

@Injectable({
  providedIn: 'root',
})
export class Inventory {
  
}

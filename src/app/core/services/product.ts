import { Injectable, inject, signal } from '@angular/core';
import {
  collection,
  getDoc,
  getDocs,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

import axios from 'axios';

import { Firebase } from '../../core/services/firebase';
import { environment } from '../../../environments/environment';
import { ProductCategory } from '../.././constants/product-category';

export interface ProductPayload {
  name: string;
  sku: string;
  description?: string;
  unit: 'pcs' | 'kg' | 'ltr';
  status: 'active' | 'inactive';
  category: ProductCategory;
  brandName: string;
}

export interface Product extends ProductPayload {
  imageUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private firebase = inject(Firebase);

  private cloudName = environment.cloudinary.cloudName;
  private uploadPreset = environment.cloudinary.unsignedPreset;

  newlyCreatedProductSku = signal('');

  async uploadProductImage(file: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const res = await axios.post(url, formData);
    return res.data.secure_url;
  }

  async createProduct(productData: ProductPayload, imageFile?: File): Promise<string> {
    const imageUrl = imageFile ? await this.uploadProductImage(imageFile) : null;

    const ref = doc(this.firebase.firestore, 'products', productData.sku);

    await setDoc(ref, {
      ...productData,
      imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    this.newlyCreatedProductSku.set(productData.sku);
    return ref.id;
  }

  async getAllProduct(): Promise<Product[]> {
    const ref = collection(this.firebase.firestore, 'products');
    const snap = await getDocs(ref);

    return snap.docs.map((doc) => doc.data() as Product);
  }

  async getProductBySku(sku: string): Promise<Product | null> {
    const ref = doc(this.firebase.firestore, 'products', sku);
    const snap = await getDoc(ref);

    return snap.exists() ? (snap.data() as Product) : null;
  }
}

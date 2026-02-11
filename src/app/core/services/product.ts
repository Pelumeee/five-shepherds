import { Injectable, inject } from '@angular/core';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

import axios from 'axios';

import { Firebase } from '../../core/services/firebase';
import { environment } from '../../../environments/environment';

export interface ProductPayload {
  name: string;
  sku: string;
  description?: string;
  unit: 'pcs' | 'kg' | 'ltr';
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private firebase = inject(Firebase);

  private cloudName = environment.cloudinary.cloudName;
  private uploadPreset = environment.cloudinary.unsignedPreset;

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

    return ref.id;
  }
}

import { Injectable, inject } from '@angular/core';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { Firebase } from '../../core/services/firebase';

export interface ProductPayload {
  name: string;
  sku: string;
  description?: string;
  unit: 'pcs' | 'kg' | 'ltr';
  status: 'active' | 'inactive';
}





//five_shepherds_products

@Injectable({
  providedIn: 'root',
})

export class ProductService {

  private firebase = inject(Firebase)

  private async uploadProductImage(file: File, sku: string): Promise<string> {
    const filePath = `products/${sku}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.firebase.storage, filePath);

    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async createProduct(productData: ProductPayload, imageFile?: File) {
    let imageUrl: string | null = null;

    if (imageFile) {
      imageUrl = await this.uploadProductImage(imageFile, productData.sku);
    }

    return addDoc(collection(this.firebase.firestore, 'products'), {
      ...productData,
      imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

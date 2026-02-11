interface Product {
  id?: string;
  name: string;
  sku: string;
  description?: string;
  categoryId?: string;
  unit: 'pcs' | 'kg' | 'ltr';
  status: 'active' | 'inactive';
  imageUrl?: string;
  createdAt: any;
  updatedAt: any;
}

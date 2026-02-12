export const PRODUCT_CATEGORIES = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion & Apparel', value: 'fashion' },
  { label: 'Groceries', value: 'groceries' },
  { label: 'Home & Kitchen', value: 'home' },
  { label: 'Beauty & Personal Care', value: 'beauty' },
  { label: 'Health & Pharmacy', value: 'health' },
  { label: 'Sports & Fitness', value: 'sports' },
  { label: 'Automotive', value: 'automotive' },
  { label: 'Office & Stationery', value: 'office' },
  { label: 'Toys & Games', value: 'toys' },
  { label: 'Phones & Accessories', value: 'phones' },
  { label: 'Computers & Gadgets', value: 'computers' },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]['value'];

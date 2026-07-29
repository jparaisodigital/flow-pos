export type Category = "All" | "Milk Tea" | "Fruit Tea" | "Coffee" | "Snacks";

export type ProductSize = {
  id: string;       // Unique ID para sa size (e.g., "small", "medium", "large")
  name: string;     // Display name (e.g., "Small", "Medium", "Large")
  price: number;    // Presyo para sa specific na size na ito
};

export type Product = {
  id: number;
  name: string;
  category: Category;
  image: string;
  sizes: ProductSize[]; // <--- DITO ANG MALAKING PAGBABAGO: Array na ng sizes
};

export type CartItem = {
  id: number;           // Product ID
  name: string;
  image: string;
  size: ProductSize;    // <--- Dito natin ise-store kung anong size ang napili
  qty: number;
};
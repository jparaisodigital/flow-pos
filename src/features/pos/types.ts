export type Product = {
    id: number;
    name: string;
    size: string;
    price: number;
  };
  
  export type CartItem = Product & {
    qty: number;
  };
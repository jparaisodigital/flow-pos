import { useState } from "react";
import { products } from "../features/pos/data/products";
import ProductGrid from "../features/pos/components/ProductGrid";
import Cart from "../features/pos/components/Cart"; // <--- BAGONG IMPORT

type Product = (typeof products)[number];
type CartItem = Product & { qty: number };

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cash, setCash] = useState("");

  // ADD TO CART
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // REMOVE ITEM
  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // COMPUTATIONS
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cashAmount = Number(cash) || 0;
  const change = cashAmount - total;

  // CHECKOUT LOGIC (STEP 4)
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }
    if (cashAmount < total) {
      alert("Insufficient cash.");
      return;
    }
    alert("Payment Successful!");
    setCart([]);
    setCash("");
  };

  return (
    <div className="flex h-full gap-6">
      {/* LEFT SIDE */}
      <div className="flex flex-1 flex-col gap-6 h-full">
        
        {/* Categories (Pwede na rin nating gawing Component next, pero for now, nandito muna) */}
        <div className="flex gap-3">
          <button className="rounded-md bg-black px-5 py-2.5 text-white font-medium">All</button>
          <button className="rounded-md border border-gray-300 px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-50 transition">Milk Tea</button>
          <button className="rounded-md border border-gray-300 px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-50 transition">Fruit Tea</button>
          <button className="rounded-md border border-gray-300 px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-50 transition">Coffee</button>
          <button className="rounded-md border border-gray-300 px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-50 transition">Snacks</button>
        </div>

        <ProductGrid onAddToCart={addToCart} />
      </div>

      {/* RIGHT SIDE: CART COMPONENT (STEP 5) */}
      <Cart
        cart={cart}
        total={total}
        cash={cash}
        setCash={setCash}
        change={change}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
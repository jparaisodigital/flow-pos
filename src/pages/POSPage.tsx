import { useState } from "react";

const products = [
  { id: 1, name: "Wintermelon", size: "Medium", price: 120 },
  { id: 2, name: "Taro", size: "Medium", price: 130 },
  { id: 3, name: "Okinawa", size: "Medium", price: 125 },
  { id: 4, name: "Matcha", size: "Large", price: 140 },
];

// 🚨 FIX PARA WALANG RED LINES: Ginawa nating type na may qty
type Product = (typeof products)[number];
type CartItem = Product & { qty: number };

export default function POSPage() {
  // Ginamit natin ang bagong CartItem type
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cash, setCash] = useState("");

  // STEP 1: REFRACTORED ADD TO CART (May Quantity na!)
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        // Kapag nasa cart na, dagdagan lang ang qty
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      // Kapag bago, idagdag bilang bagong item na may qty: 1
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // STEP 2: REFRACTORED TOTAL (Price multiplied by Qty)
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const cashAmount = Number(cash) || 0;
  const change = cashAmount - total;

  return (
    <div className="flex h-full gap-6">
      {/* LEFT */}
      <section className="flex flex-1 flex-col gap-6">
        {/* Categories */}
        <div className="flex gap-3">
          <button className="rounded-md bg-black px-4 py-2 text-white">All</button>
          <button className="rounded-md border border-gray-300 px-4 py-2">Milk Tea</button>
          <button className="rounded-md border border-gray-300 px-4 py-2">Fruit Tea</button>
          <button className="rounded-md border border-gray-300 px-4 py-2">Coffee</button>
          <button className="rounded-md border border-gray-300 px-4 py-2">Snacks</button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md"
            >
              <h3 className="font-semibold">{product.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{product.size}</p>
              <p className="mt-4 font-bold">₱{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RIGHT */}
      <aside className="w-80 rounded-lg border border-gray-200 bg-white p-6 flex flex-col">
        <h2 className="text-lg font-semibold">Cart</h2>

        <div className="mt-6 flex-1 space-y-3 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No items yet.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id} // 🚨 PANSIN: Ginamit natin ang item.id imbes na index, kasi unique na sila ngayon!
                className="flex justify-between items-start border-b border-gray-200 pb-3"
              >
                {/* STEP 3: UPDATED CART UI */}
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>

                <span className="font-semibold">
                  ₱{item.price * item.qty}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="mb-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₱{total}</span>
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">Cash</label>
            <input
              type="number"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
              placeholder="Enter cash"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none"
            />
          </div>

          <div className="mb-6 flex justify-between font-semibold">
            <span>Change</span>
            <span>₱{change > 0 ? change : 0}</span>
          </div>

          <button
            onClick={() => {
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
            }}
            className="w-full rounded-md bg-black py-3 text-white hover:bg-gray-800 transition"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
import { useState } from "react";
import { products } from "../features/pos/data/products";
import ProductGrid from "../features/pos/components/ProductGrid";
import Cart from "../features/pos/components/Cart";
import Toast from "../components/Toast";
import SizeModal from "../features/pos/components/SizeModal";
import type { Category, Product, ProductSize, CartItem } from "../features/pos/types";
import type { Sale } from "../App";

type POSPageProps = {
  onCompleteSale: (sale: Sale) => void;
};

export default function POSPage({ onCompleteSale }: POSPageProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cash, setCash] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  
  // Toast State
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  
  // Receipt State
  const [receipt, setReceipt] = useState<{
    orderNumber: string;
    items: CartItem[];
    total: number;
    cash: number;
    change: number;
    date: string;
  } | null>(null);

  // NEW: Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

  // Toast Helper
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // 1. Buksan ang Modal (Instead na diretso sa cart)
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]); // Default sa first size
  };

  // 2. Actual Add to Cart logic pag-confirm sa modal
  const handleConfirmAddToCart = () => {
    if (!selectedProduct || !selectedSize) return;

    setCart((prevCart) => {
      // Hanapin kung nasa cart na ang EXACT product at size (productId + sizeId)
      const existingIndex = prevCart.findIndex(
        (item) => item.id === selectedProduct.id && item.size.id === selectedSize.id
      );

      if (existingIndex > -1) {
        // Kung meron na, dagdagan lang ng qty
        const newCart = [...prevCart];
        newCart[existingIndex].qty += 1;
        return newCart;
      }

      // Kung wala pa, i-add bilang bagong item
      return [
        ...prevCart,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          image: selectedProduct.image,
          size: selectedSize,
          qty: 1,
        },
      ];
    });

    // Isara ang modal
    setSelectedProduct(null);
    setSelectedSize(null);
  };

  // Cart Handlers
  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  // UPDATED: Gamitin ang item.size.price imbes na item.price
  const total = cart.reduce((sum, item) => sum + item.size.price * item.qty, 0);
  const cashAmount = Number(cash) || 0;
  const change = cashAmount - total;

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast("Add products first.", "error");
      return;
    }

    if (cashAmount < total) {
      showToast("Insufficient cash received.", "error");
      return;
    }

    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const completedSale: Sale = {
      id: orderNumber,
      items: [...cart],
      total,
      cash: cashAmount,
      change,
      date: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
    };

    onCompleteSale(completedSale);
    setReceipt({
      orderNumber,
      items: [...cart],
      total,
      cash: cashAmount,
      change,
      date: completedSale.date,
    });
    
    showToast(`Change: ${change.toFixed(2)}`, "success");
    setCart([]);
    setCash("");
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* SIZE MODAL (Nasa loob na ng return!) */}
      {selectedProduct && selectedSize && (
        <SizeModal
          product={selectedProduct}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onClose={() => {
            setSelectedProduct(null);
            setSelectedSize(null);
          }}
          onConfirm={handleConfirmAddToCart}
        />
      )}

      {/* MOBILE NOTICE */}
      <div className="flex md:hidden h-screen items-center justify-center bg-gray-50 p-6 text-center">
        <div className="max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Flow POS</h1>
          <p className="text-gray-600">This demo is optimized for Desktop, Laptop, and iPad Landscape.</p>
          <p className="text-sm text-gray-500">Please open using a larger screen.</p>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex h-full w-full p-4 gap-4 bg-gray-50">
        <div className="flex flex-1 flex-col h-full overflow-hidden">
          <div className="mb-4 flex-shrink-0">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {(["All", "Milk Tea", "Fruit Tea", "Coffee", "Snacks"] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            <h2 className="text-lg font-bold text-gray-900 mb-3 sticky top-0 bg-gray-50 py-2 z-10">Products</h2>
            <ProductGrid 
              onAddToCart={handleProductClick} 
              selectedCategory={selectedCategory} 
            />
          </div>
        </div>

        <div className="w-72 lg:w-85 h-full flex-shrink-0">
          <Cart
            cart={cart}
            total={total}
            cash={cash}
            setCash={setCash}
            change={change}
            onRemove={removeItem}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* RECEIPT MODAL */}
      {receipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="border-b border-gray-200 pb-5 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">Flow POS</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">Payment Successful</h2>
              <p className="mt-1 text-sm text-gray-500">Milk Tea Edition</p>
            </div>
            <div className="space-y-2 border-b border-gray-200 py-5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order</span>
                <span className="font-semibold text-gray-900">{receipt.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium text-gray-900">{receipt.date}</span>
              </div>
            </div>
            <div className="max-h-56 space-y-4 overflow-y-auto py-5 pr-2">
              {receipt.items.map((item, index) => (
                <div key={`${item.id}-${item.size.id}-${index}`} className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.size.name} • ₱{item.size.price.toFixed(2)} × {item.qty}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ₱{(item.size.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-t border-gray-200 pt-5">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₱{receipt.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cash Received</span>
                <span className="font-medium">₱{receipt.cash.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Change</span>
                <span className="font-semibold text-green-600">₱{receipt.change.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => setReceipt(null)}
              className="mt-6 w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
            >
              New Order
            </button>
          </div>
        </div>
      )}
    </>
  );
}
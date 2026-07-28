type CartItem = {
    id: number;
    name: string;
    price: number;
    qty?: number;
  };
  
  type CartProps = {
    cart: CartItem[];
    total: number;
    cash: string;
    setCash: (value: string) => void;
    change: number;
    onRemove: (id: number) => void;
    onCheckout: () => void;
  };
  
  export default function Cart({
    cart,
    total,
    cash,
    setCash,
    change,
    onRemove,
    onCheckout,
  }: CartProps) {
    return (
      <aside className="w-96 rounded-lg border border-gray-200 bg-white p-6 flex flex-col">
  
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Current Order
          </p>
  
          <h2 className="text-xl font-semibold">
            Cart
          </h2>
        </div>
  
        <div className="mt-2 flex-1 space-y-3 overflow-y-auto pr-2">
          {cart.length === 0 ? (
            <p className="text-gray-500">
              No items yet.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 pb-3"
              >
                <div className="flex items-center justify-between">
  
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>
  
                    <p className="text-sm text-gray-500">
                      Qty: {item.qty}
                    </p>
                  </div>
  
                  <div className="text-right">
  
                    <p className="font-semibold">
                      ₱{item.price * (item.qty ?? 1)}
                    </p>
  
                    <button
                      onClick={() => onRemove(item.id)}
                      className="mt-1 text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
  
                  </div>
  
                </div>
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
            <label className="mb-1 block text-sm font-medium">
              Cash
            </label>
  
            <input
              type="number"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
              placeholder="Enter cash"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
  
          <div className="mb-6 flex justify-between font-semibold">
            <span>Change</span>
            <span>₱{change > 0 ? change : 0}</span>
          </div>
  
          <button
            onClick={onCheckout}
            className="w-full rounded-md bg-black py-3 text-white"
          >
            Checkout
          </button>
  
        </div>
  
      </aside>
    );
  }
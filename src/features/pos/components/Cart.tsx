import { useState } from "react";
import type { CartItem } from "../types";

type CartProps = {
  cart: CartItem[];
  total: number;
  cash: string;
  setCash: (value: string) => void;
  change: number;
  onRemove: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onCheckout: () => void;
};

export default function Cart({
  cart,
  total,
  cash,
  setCash,
  change,
  onRemove,
  onIncrease,
  onDecrease,
  onCheckout,
}: CartProps) {
  const [showKeypad, setShowKeypad] = useState(false);
  const [previousCash, setPreviousCash] = useState("");

  const openKeypad = () => {
    setPreviousCash(cash);
    setShowKeypad(true);
  };

  const addDigit = (digit: string) => {
    setCash((cash + digit).slice(0, 8));
  };

  const removeLastDigit = () => {
    setCash(cash.slice(0, -1));
  };

  const clearCash = () => {
    setCash("");
  };

  const useExactCash = () => {
    setCash(total.toFixed(2));
  };

  const useQuickCash = (amount: number) => {
    setCash(amount.toString());
  };

  const getSuggestedCash = () => {
    if (total <= 0) return [500, 1000];
    const nextHundred = Math.ceil(total / 100) * 100;
    let nextLarge: number;
    if (nextHundred < 1000) {
      nextLarge = 1000;
    } else {
      nextLarge = Math.ceil(total / 1000) * 1000;
    }
    if (nextLarge === nextHundred) nextLarge += 1000;
    return [nextHundred, nextLarge];
  };

  const [suggestedCash, largeCash] = getSuggestedCash();

  const cancelKeypad = () => {
    setCash(previousCash);
    setShowKeypad(false);
  };

  const confirmKeypad = () => {
    setShowKeypad(false);
  };

  const displayCash =
    cash === ""
      ? "0.00"
      : `${Number(cash).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

  return (
    <aside className="relative flex h-full w-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-lg font-bold text-gray-900">Cart</h2>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1 min-h-0">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-gray-400">
            <svg className="w-12 h-12 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-sm font-medium">No items yet.</p>
            <p className="text-xs mt-1 text-gray-300">Add products to get started.</p>
          </div>
        ) : (
          cart.map((item) => (
            // FIX: Ginamit ang combination ng id at size.id para unique ang key
            <div key={`${item.id}-${item.size.id}`} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm leading-tight">{item.name}</p>
                  {/* FIX: Ipakita ang size name at size price */}
                  <p className="text-xs text-gray-500 mt-1">
                    {item.size.name} • ₱{item.size.price.toFixed(2)} each
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => onDecrease(item.id)}
                      className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition active:scale-90 duration-100"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-xs font-semibold text-gray-900">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onIncrease(item.id)}
                      className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition active:scale-90 duration-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right ml-2">
                  {/* FIX: Gamitin ang item.size.price */}
                  <p className="font-semibold text-gray-900 text-sm">
                    ₱{(item.size.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="mt-2 text-[10px] font-medium text-red-500 transition hover:text-red-700 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-3 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>₱{total.toFixed(2)}</span>
        </div>

        <div className="mb-3">
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            Cash Received
          </label>
          <button
            type="button"
            onClick={openKeypad}
            className="flex w-full items-center justify-end rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-right text-base font-semibold text-gray-900 transition hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-black/10 active:scale-[0.98] duration-100"
          >
            {displayCash}
          </button>
        </div>

        <div className="mb-3">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Quick Cash
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={useExactCash}
              className="rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs font-semibold text-gray-800 transition hover:border-black hover:bg-gray-50 active:scale-95 duration-100"
            >
              Exact ₱{total.toFixed(2)}
            </button>
            <button
              type="button"
              onClick={() => useQuickCash(suggestedCash)}
              className="rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs font-semibold text-gray-800 transition hover:border-black hover:bg-gray-50 active:scale-95 duration-100"
            >
              ₱{suggestedCash.toLocaleString()}
            </button>
            <button
              type="button"
              onClick={() => useQuickCash(largeCash)}
              className="rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs font-semibold text-gray-800 transition hover:border-black hover:bg-gray-50 active:scale-95 duration-100"
            >
              ₱{largeCash.toLocaleString()}
            </button>
            <button
              type="button"
              onClick={clearCash}
              className="rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs font-semibold text-gray-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 active:scale-95 duration-100"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mb-4 flex justify-between text-base font-semibold">
          <span className="text-gray-600">Change</span>
          <span className={cash !== "" && change >= 0 ? "text-green-600" : "text-gray-400"}>
            ₱{change > 0 ? change.toFixed(2) : "0.00"}
          </span>
        </div>

        <button
          type="button"
          onClick={onCheckout}
          className="w-full rounded-md bg-black py-3 text-base font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
        >
          Complete Order
        </button>
      </div>

      {showKeypad && (
        <>
          <div
            className="absolute inset-0 z-40 bg-black/10 rounded-lg cursor-pointer backdrop-blur-[1px]"
            onClick={cancelKeypad}
          />
          <div className="absolute bottom-6 right-[calc(100%+24px)] z-50 w-80 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-keypad">
            <div className="mb-6 flex items-start justify-between">
              <div className="w-full">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">Enter Cash</p>
                <p className="mt-2 border-b border-gray-200 pb-4 text-right text-5xl font-bold tracking-tight text-gray-900">
                  {cash === "" ? "₱0.00" : `₱${Number(cash).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </p>
              </div>
              <button type="button" onClick={cancelKeypad} className="ml-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 active:scale-90 duration-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                <button key={digit} type="button" onClick={() => addDigit(digit)} className="rounded-xl border border-gray-200 bg-gray-50 py-4 text-2xl font-bold text-gray-900 transition duration-100 hover:border-gray-400 hover:bg-white active:scale-90 active:bg-gray-100">{digit}</button>
              ))}
              <button type="button" onClick={() => addDigit("00")} className="rounded-xl border border-gray-200 bg-gray-50 py-4 text-xl font-bold text-gray-900 transition duration-100 hover:border-gray-400 hover:bg-white active:scale-90 active:bg-gray-100">00</button>
              <button type="button" onClick={() => addDigit("0")} className="rounded-xl border border-gray-200 bg-gray-50 py-4 text-2xl font-bold text-gray-900 transition duration-100 hover:border-gray-400 hover:bg-white active:scale-90 active:bg-gray-100">0</button>
              <button type="button" onClick={removeLastDigit} className="rounded-xl border border-gray-200 bg-gray-100 py-4 text-2xl font-bold text-gray-900 transition duration-100 hover:border-gray-400 hover:bg-gray-200 active:scale-90" aria-label="Delete last digit">⌫</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={cancelKeypad} className="rounded-xl border border-gray-300 bg-white py-4 font-semibold text-gray-700 transition duration-100 hover:bg-gray-50 active:scale-95">Cancel</button>
              <button type="button" onClick={confirmKeypad} className="rounded-xl bg-black py-4 text-lg font-bold text-white transition duration-100 hover:bg-gray-800 active:scale-[0.98]">Done</button>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
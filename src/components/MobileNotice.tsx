import { useState } from "react";

export default function MobileNotice() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-gray-100 p-6 md:hidden">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mb-6 text-6xl">🖥️</div>

        <h1 className="text-2xl font-bold text-gray-900">
          Flow POS
        </h1>

        <p className="mt-4 text-lg font-semibold text-gray-700">
          Optimized for Desktop & iPad
        </p>

        <p className="mt-4 text-sm leading-6 text-gray-500">
          For the best experience, please use a desktop
          browser or tablet device.
        </p>

        <button
          onClick={() => setDismissed(true)}
          className="mt-8 w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Continue Anyway
        </button>
      </div>
    </div>
  );
}
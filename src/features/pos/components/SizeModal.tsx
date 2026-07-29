import type { Product, ProductSize } from "../types";

type SizeModalProps = {
  product: Product;
  selectedSize: ProductSize;
  onSelectSize: (size: ProductSize) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export default function SizeModal({
  product,
  selectedSize,
  onSelectSize,
  onClose,
  onConfirm,
}: SizeModalProps) {
  return (
    // Backdrop / Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      {/* Modal Container */}
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header: Image and Title */}
        <div className="text-center">
          <img
            src={product.image}
            alt={product.name}
            className="mx-auto h-24 w-24 object-contain"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {product.name}
          </h2>
          <p className="text-sm text-gray-500">Select size to continue</p>
        </div>

        {/* Size Options */}
        <div className="mt-6 space-y-3">
          {product.sizes.map((size) => {
            const isSelected = selectedSize.id === size.id;
            return (
              <button
                key={size.id}
                onClick={() => onSelectSize(size)}
                className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 transition ${
                  isSelected
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                }`}
              >
                <span className="font-medium">{size.name}</span>
                <span className={`font-bold ${isSelected ? "text-white" : "text-gray-900"}`}>
                  ₱{size.price.toFixed(2)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
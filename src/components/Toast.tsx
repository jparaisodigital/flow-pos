import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void; // <-- Dito natin tinanggap ang onClose para mawala ang red line
};

export default function Toast({ message, type, onClose }: ToastProps) {
  // Auto-close after 2.5 seconds (Parang GCash/Shopify)
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
    className={`fixed top-6 right-6 z-[9999] min-w-[320px] rounded-xl border p-4 shadow-xl animate-toast ${
        type === "success"
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
            type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {type === "success" ? "✓" : "!"}
        </div>

        <div>
          <p className="font-semibold text-gray-900">
            {type === "success" ? "Payment Successful" : "Checkout Error"}
          </p>

          <p className="text-sm text-gray-600">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
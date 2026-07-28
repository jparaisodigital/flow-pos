// 1. TINANGGAL NA ANG "type Product = { ... }"
// 2. PINALITAN NG IMPORT GALING SA TYPES.TS
import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

export default function ProductCard({
  product,
  onClick,
}: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-5 transition hover:border-black hover:shadow-sm"
    >
      <h3 className="font-semibold">
        {product.name}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {product.size}
      </p>

      <p className="mt-4 font-bold">
        ₱{product.price}
      </p>
    </div>
  );
}
import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  // Hanapin ang pinakamababang presyo sa lahat ng sizes
  const lowestPrice = Math.min(...product.sizes.map((size) => size.price));

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition hover:border-black hover:shadow-sm h-full flex flex-col justify-between"
    >
      <div>
        <h3 className="font-semibold text-xl text-gray-900">
          {product.name}
        </h3>

        <p className="mt-3 text-sm text-gray-500">
          From ₱{lowestPrice.toFixed(2)}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <p className="text-sm font-medium text-gray-400">
          {product.sizes.length} {product.sizes.length === 1 ? 'size' : 'sizes'}
        </p>

        <img
          src={product.image}
          alt={product.name}
          className="h-20 w-20 object-contain"
        />
      </div>
    </div>
  );
}
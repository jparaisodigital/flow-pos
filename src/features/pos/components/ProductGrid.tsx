import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";
import type { Product } from "../types";

type ProductGridProps = {
  onAddToCart: (product: Product) => void;
};

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  // Dito na natin kinukuha ang data mula sa Service
  const products = getProducts();

  return (
    <div className="grid grid-cols-3 gap-4 overflow-y-auto pr-2">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
}
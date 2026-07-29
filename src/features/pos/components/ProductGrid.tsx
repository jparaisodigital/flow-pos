import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";
import type { Category, Product } from "../types";

type ProductGridProps = {
  onAddToCart: (product: Product) => void;
  selectedCategory: Category | "All";
};

export default function ProductGrid({
  onAddToCart,
  selectedCategory,
}: ProductGridProps) {
  const products = getProducts();

  // Filter logic
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="grid grid-cols-3 gap-6 overflow-y-auto pr-2">
      {filteredProducts.length === 0 ? (
        <p className="col-span-3 py-10 text-center text-gray-500 text-lg">
          No products found in this category.
        </p>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onAddToCart(product)}
          />
        ))
      )}
    </div>
  );
}
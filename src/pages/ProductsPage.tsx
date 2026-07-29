import { products } from "../features/pos/data/products";

export default function ProductsPage() {
  const productCount = products.length;

  // Calculate average based on the lowest price of each product
  const averagePrice =
    productCount > 0
      ? products.reduce((sum, product) => {
          const lowestPrice = Math.min(...product.sizes.map((s) => s.price));
          return sum + lowestPrice;
        }, 0) / productCount
      : 0;

  return (
    <div className="space-y-4 p-4 pt-2">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-gray-500">
            View the products currently available in Flow POS.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
          {productCount} product{productCount !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Products</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{productCount}</p>
          <p className="mt-1 text-sm text-gray-400">Available in the POS catalog</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Average Starting Price</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ₱{averagePrice.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-gray-400">Based on lowest size price</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Product List</h2>
          <p className="mt-1 text-sm text-gray-500">
            Products currently shown in the POS.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-semibold text-gray-700">
              No products available
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Add products to display them here.
            </p>
          </div>
        ) : (
          <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Available Sizes
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Price Range
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => {
                  const prices = product.sizes.map((s) => s.price);
                  const minPrice = Math.min(...prices);
                  const maxPrice = Math.max(...prices);
                  const priceDisplay =
                    minPrice === maxPrice
                      ? `₱${minPrice.toFixed(2)}`
                      : `₱${minPrice.toFixed(2)} - ₱${maxPrice.toFixed(2)}`;

                  return (
                    <tr key={product.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <p className="font-semibold text-gray-900">
                          {product.name}
                        </p>
                        <p className="mt-0.5 text-sm text-gray-400">
                          Product ID: {product.id}
                        </p>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.map((s) => (
                            <span
                              key={s.id}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                        {priceDisplay}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          Active
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
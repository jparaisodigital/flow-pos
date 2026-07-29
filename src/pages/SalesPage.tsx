import type { Sale } from "../App";

type SalesPageProps = {
  sales: Sale[];
};

export default function SalesPage({ sales }: SalesPageProps) {
  const totalOrders = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalItemsSold = sales.reduce(
    (sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.qty, 0),
    0
  );

  return (
    // BINAGO: p-6 to p-4 pt-2, space-y-6 to space-y-4, tinanggal ang mx-auto at max-w
    <div className="w-full p-4 pt-2 space-y-4">
      {/* PAGE HEADER */}
      {/* BINAGO: mb-8 to mb-4 */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Sales History</h1>
        <p className="mt-1 text-gray-500">View all completed orders</p>
      </div>

      {/* STATS CARDS */}
      {/* BINAGO: gap-6 to gap-4 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Orders</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalOrders}</p>
          <p className="mt-1 text-sm text-gray-400">Completed orders</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <p className="mt-2 text-3xl font-bold text-green-600">₱{totalRevenue.toFixed(2)}</p>
          <p className="mt-1 text-sm text-gray-400">From all sales</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Items Sold</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">{totalItemsSold}</p>
          <p className="mt-1 text-sm text-gray-400">Products sold</p>
        </div>
      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
        </div>

        {sales.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-semibold text-gray-700">No sales yet</p>
            <p className="mt-2 text-sm text-gray-500">
              Completed orders will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Order #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Items
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sales.map((sale) => (
                  <tr key={sale.id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <p className="font-semibold text-gray-900">{sale.id}</p>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">{sale.date}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {sale.items.length} item{sale.items.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-3 text-right text-lg font-bold text-gray-900">
                      ₱{sale.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
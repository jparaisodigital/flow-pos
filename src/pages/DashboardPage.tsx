import type { Sale } from "../App"; // I-adjust ang path kung nasa ibang folder ang App.tsx

type DashboardPageProps = {
  sales: Sale[];
};

export default function DashboardPage({ sales }: DashboardPageProps) {
  // 1. Dynamic Computation (Gaya ng sa SalesPage)
  const totalOrders = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalItemsSold = sales.reduce(
    (sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.qty, 0),
    0
  );

  // 2. Kunin ang pinakabagong 5 transactions (reverse para bago nasa taas)
  const recentSales = [...sales].reverse().slice(0, 5);

  return (
    <div className="space-y-4 p-4 pt-2">
      {/* PAGE HEADER */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          Business Overview
        </p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Monitor your sales and recent transactions.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Sales</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">₱{totalRevenue.toFixed(2)}</p>
          <p className="mt-1 text-sm text-gray-400">All completed orders</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Completed Orders</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalOrders}</p>
          <p className="mt-1 text-sm text-gray-400">Successful transactions</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Items Sold</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalItemsSold}</p>
          <p className="mt-1 text-sm text-gray-400">Total quantity sold</p>
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recent Transactions
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Latest completed orders
              </p>
            </div>

            <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              {recentSales.length} Orders
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {recentSales.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-sm text-gray-500">No transactions yet.</p>
            </div>
          ) : (
            recentSales.map((sale) => (
              <div key={sale.id} className="px-6 py-4 transition hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{sale.id}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {sale.date} · {sale.items.reduce((sum, item) => sum + item.qty, 0)} item(s)
                    </p>
                  </div>

                  <p className="text-lg font-bold text-gray-900">₱{sale.total.toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import POSPage from "./pages/POSPage";
import ProductsPage from "./pages/ProductsPage";
import SalesPage from "./pages/SalesPage";
import SettingsPage from "./pages/SettingsPage";

import type { CartItem } from "./features/pos/types";

export type Sale = {
  id: string;
  items: CartItem[];
  total: number;
  cash: number;
  change: number;
  date: string;
};

export default function App() {
  const [sales, setSales] = useState<Sale[]>([]);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1200);

  return () => clearTimeout(timer);
}, []);

  const addSale = (sale: Sale) => {
    setSales((previousSales) => [sale, ...previousSales]);
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        
        {/* DITO ANG FIX: Ibalik ang sales={sales} prop sa DashboardPage */}
        <Route path="/" element={<DashboardPage sales={sales} />} />

        <Route path="/pos" element={<POSPage onCompleteSale={addSale} />} />
        
        <Route path="/products" element={<ProductsPage />} />
        
        <Route path="/sales" element={<SalesPage sales={sales} />} />
        
        <Route path="/settings" element={<SettingsPage />} />
        
      </Route>
    </Routes>
  );
}
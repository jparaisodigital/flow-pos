import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MobileNotice from "../components/MobileNotice";

export default function MainLayout() {
  return (
    <>
      <MobileNotice />
  
      <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content - P-0 para full width ang POS */}
        <main className="flex-1 overflow-hidden bg-gray-50">
          <Outlet />
        </main>
      </div>
      </div>
  </>
);
}
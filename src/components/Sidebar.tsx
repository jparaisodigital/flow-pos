import { useLocation, Link } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "POS", path: "/pos" },
  { name: "Sales", path: "/sales" },        
  { name: "Products", path: "/products" },   
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    // BINAGO: Tinanggal ang inline style. Ginamit ang px-5 para sa balanced left padding.
    <aside className="w-56 border-r border-gray-200 bg-white h-screen flex flex-col py-6 px-5">
      
      {/* LOGO AREA */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 text-left">Flow POS</h1>
      </div>
      
      {/* NAVIGATION */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              // BINAGO: Added 'w-full' and 'text-left' para siguradong naka-left align at kumakain ng buong width
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="mt-auto pt-6 border-t border-gray-100 text-left">
        <p className="text-xs font-semibold text-gray-900">Flow POS</p>
        <p className="text-xs text-gray-500 mt-1">Milk Tea Edition</p>
        <p className="text-xs text-gray-400 mt-2">© 2026 All rights reserved.</p>
      </div>
    </aside>
  );
}
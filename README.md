# Flow POS

A modern, reusable, and config-driven Point of Sale (POS) system built for various retail businesses (Milk Tea, Coffee, Bakery, Mini Grocery, Hardware).

## 🛠️ Tech Stack

- **Frontend:** React 18+
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React Hooks (`useState`, custom `useCart`)
- **Database (Upcoming):** Supabase

## 📊 Current Status

- [x] MVP Complete (v0.1)
- [x] Git Initialized & Pushed to GitHub
- [x] Feature-Based Architecture (Components, Data, Services, Hooks separated)
- [x] Centralized TypeScript Types
- [x] Service Layer Pattern implemented

## 🗺️ Roadmap

- [ ] **v0.2:** Supabase Integration (Real Products & Sales)
- [ ] **v0.3:** Inventory Management & Categories
- [ ] **v0.4:** Reports & Analytics Dashboard
- [ ] **v0.5:** Offline Mode (PWA + IndexedDB + Auto Sync)
- [ ] **v1.0:** Config-driven Business Logic (Switch between Milk Tea, Coffee, Grocery, etc., via config files)

## 📂 Project Structure

```text
src/
├── business/         # Business-specific configurations (future)
├── components/       # Shared UI components (Header, Sidebar)
├── features/         # Feature-based modules
│   └── pos/
│       ├── components/ # POS-specific UI (Cart, ProductGrid, ProductCard)
│       ├── data/       # Mock data (temporary)
│       ├── hooks/      # Custom hooks (useCart)
│       ├── services/   # Data fetching layer (productService)
│       └── types.ts    # Centralized TypeScript definitions
├── layouts/          # Page layouts (MainLayout)
├── pages/            # Route pages (POSPage, DashboardPage, etc.)
└── routes/           # Routing configuration
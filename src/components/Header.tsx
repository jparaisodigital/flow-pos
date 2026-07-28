export default function Header() {
    const now = new Date();
  
    const currentTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    return (
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Flow POS
          </h2>
          <p className="text-sm text-gray-500">
            Point of Sale System
          </p>
        </div>
  
        <div className="text-right">
          <p className="text-sm font-medium">
            Cashier
          </p>
  
          <p className="text-sm text-gray-500">
            {currentTime}
          </p>
        </div>
      </header>
    );
  }
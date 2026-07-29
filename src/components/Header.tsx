export default function Header() {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    // px-10 para mag-match sa main content, py-5 para may hangin sa taas/baba
    <header 
    className="flex h-20 items-center justify-between border-b border-gray-200 bg-white" 
    style={{ paddingLeft: '40px', paddingRight: '40px' }}
  >
      
      {/* Left Side: Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Flow POS</h1>
        <p className="text-xs text-gray-500 mt-0.5">Milk Tea Edition</p>
      </div>

      {/* Right Side: Cashier & Time */}
      {/* gap-6 para magkahiwalay ang Cashier at Time */}
      <div className="flex items-center gap-6">
        
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-sm font-medium">Cashier</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{currentTime}</span>
        </div>

      </div>
    </header>
  );
}
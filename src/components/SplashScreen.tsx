export default function SplashScreen() {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
  
        <img
          src="/loadingsplash.png"
          alt="Loading"
          className="w-28 object-contain select-none"
          draggable={false}
        />
  
        <div className="mt-8 flex gap-2">
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
        </div>
  
      </div>
    );
  }
import { useState } from "react";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("Flow POS");
  const [storeSubtitle, setStoreSubtitle] = useState(
    "Milk Tea Edition"
  );
  const [cashierName, setCashierName] = useState("Cashier");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    // BINAGO: Tinanggal ang mx-auto at max-w-4xl para dumikit sa left at full width.
    // Pinalitan ang p-6 ng p-4 pt-2 para umangat.
    <div className="w-full p-4 pt-2">
      {/* PAGE HEADER */}
      {/* BINAGO: mb-8 to mb-4 para mas compact */}
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          System Configuration
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your store information and POS preferences.
        </p>
      </div>

      {/* STORE SETTINGS */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            Store Profile
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            These details identify your store inside Flow POS.
          </p>
        </div>

        {/* BINAGO: p-6 to p-5, space-y-6 to space-y-5 */}
        <div className="space-y-5 p-5">
          {/* STORE NAME */}
          <div>
            <label
              htmlFor="storeName"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Store Name
            </label>

            <input
              id="storeName"
              type="text"
              value={storeName}
              onChange={(event) => {
                setStoreName(event.target.value);
                setSaved(false);
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* STORE SUBTITLE */}
          <div>
            <label
              htmlFor="storeSubtitle"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Store Subtitle
            </label>

            <input
              id="storeSubtitle"
              type="text"
              value={storeSubtitle}
              onChange={(event) => {
                setStoreSubtitle(event.target.value);
                setSaved(false);
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* CASHIER NAME */}
          <div>
            <label
              htmlFor="cashierName"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Default Cashier Name
            </label>

            <input
              id="cashierName"
              type="text"
              value={cashierName}
              onChange={(event) => {
                setCashierName(event.target.value);
                setSaved(false);
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        {/* SAVE AREA */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div>
            {saved ? (
              <p className="text-sm font-semibold text-green-700">
                Settings saved successfully.
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Changes are saved for the current session.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* DEMO NOTE */}
      <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-5">
        <p className="text-sm font-semibold text-blue-800 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Demo Version Note
        </p>
        <p className="mt-1 text-sm leading-6 text-blue-700">
          Settings are currently stored only during the active browser session. Permanent saving and app-wide sync will be added when we connect the app to a database (Supabase).
        </p>
      </div>
    </div>
  );
}
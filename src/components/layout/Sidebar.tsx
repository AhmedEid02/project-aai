export default function Sidebar() {
  const menuItems = [
    "Mission Control",
    "Current Incident",
    "AI Decision Partner",
    "Early Action Plan",
    "Response Optimizer",
    "Impact Map",
    "Learning Center",
    "Settings",
  ];

  return (
    <aside className="w-72 h-screen border-r bg-slate-950 text-white flex flex-col">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold tracking-tight">AAI</h1>
        <p className="mt-1 text-sm text-slate-400">
          Adaptive Action Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item}>
              <button className="w-full rounded-lg px-4 py-3 text-left text-sm transition hover:bg-slate-800">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4 text-xs text-slate-500">
        Version 1.0 • IGAD Hackathon 2026
      </div>
    </aside>
  );
}
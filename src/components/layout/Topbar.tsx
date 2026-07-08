export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Adaptive Action Intelligence
        </h1>

        <p className="text-sm text-slate-500">
          From Early Warning to Coordinated Action
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          Ahmed
        </div>
      </div>
    </header>
  );
}
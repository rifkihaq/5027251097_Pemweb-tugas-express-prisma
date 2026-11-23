import { NavLink, Link } from "react-router";

export default function Navbar() {
  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-blue-600">
          Manajemen Produk
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={navClass}>
            Dashboard
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Produk
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
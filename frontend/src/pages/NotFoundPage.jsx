import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-5xl font-extrabold text-blue-600">404</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        URL yang kamu akses tidak terdaftar pada aplikasi ini.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Ke Halaman Utama
        </Link>
        <Link
          to="/products"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Ke Daftar Produk
        </Link>
      </div>
    </div>
  );
}
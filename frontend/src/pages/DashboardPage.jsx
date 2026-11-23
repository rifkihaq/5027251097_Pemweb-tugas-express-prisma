import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getProducts } from "../services/productService";

export default function DashboardPage() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setTotalProducts(data.length))
      .catch(() => setTotalProducts(0))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard Aplikasi</h1>
      <p className="mt-2 text-slate-600">
        Aplikasi Manajemen Produk terintegrasi dengan backend Express & Prisma.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-medium text-blue-700">Total Produk Terdaftar</p>
          <p className="mt-1 text-3xl font-bold text-blue-900">
            {loading ? "..." : totalProducts}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/products"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Kelola Daftar Produk &rarr;
        </Link>
      </div>
    </div>
  );
}
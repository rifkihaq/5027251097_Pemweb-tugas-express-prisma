import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProductById, getProducts } from "../services/productService";
import { formatPrice } from "../utils/formatPrice";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const detail = await getProductById(id);
        if (detail) {
          setProduct(detail);
          return;
        }
        const allProducts = await getProducts();
        const found = allProducts.find((p) => String(p.id) === String(id));
        setProduct(found || null);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-600">Memuat detail produk...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">
          Produk Tidak Ditemukan
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Produk dengan ID <span className="font-semibold">"{id}"</span> tidak
          tersedia di database.
        </p>
        <Link
          to="/products"
          className="mt-5 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          &larr; Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          ID Produk: #{product.id}
        </span>
        {product.stock !== undefined && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Stok: {product.stock}
          </span>
        )}
      </div>

      <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
        {product.name}
      </h1>

      <p className="mt-3 text-2xl font-bold text-blue-600">
        {formatPrice(product.price)}
      </p>

      <div className="mt-6 rounded-lg bg-slate-50 p-4">
        <h2 className="text-sm font-semibold text-slate-700">Deskripsi Produk</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          {product.description || "Tidak ada deskripsi tambahan untuk produk ini."}
        </p>
      </div>

      <div className="mt-6">
        <Link
          to="/products"
          className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          &larr; Kembali ke Daftar Produk
        </Link>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import ProductForm from "../components/organisms/ProductForm";
import ProductGrid from "../components/organisms/ProductGrid";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Gagal memuat data produk.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleSaveProduct(payload) {
    try {
      setSubmitting(true);
      setError("");
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        setEditingProduct(null);
      } else {
        await createProduct(payload);
      }
      await loadProducts();
    } catch (err) {
      setError(err.message || "Gagal menyimpan produk.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteProduct(id) {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      setError("");
      await deleteProduct(id);
      if (editingProduct?.id === id) setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      setError(err.message || "Gagal menghapus produk.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Daftar Produk</h1>
        <p className="mt-1 text-sm text-slate-600">
          Tambah, lihat detail, ubah, atau hapus produk secara langsung melalui API.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <ProductForm
        initialData={editingProduct}
        onSubmit={handleSaveProduct}
        onCancel={() => setEditingProduct(null)}
        isSubmitting={submitting}
      />

      {loading ? (
        <p className="py-8 text-center text-slate-500">Memuat data produk...</p>
      ) : (
        <ProductGrid
          products={products}
          onEdit={(product) => setEditingProduct(product)}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import "./App.css";

const API_BASE_URL = "http://localhost:3000/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProducts() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API_BASE_URL);
      if (!res.ok) throw new Error("Gagal mengambil data produk dari server");
      const result = await res.json();
      const list = Array.isArray(result) ? result : result.data || [];
      setProducts(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleOpenAdd() {
    setEditingProduct(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(product) {
    setEditingProduct(product);
    setIsModalOpen(true);
  }

  async function handleSaveProduct(payload) {
    try {
      if (editingProduct) {
        const res = await fetch(`${API_BASE_URL}/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Gagal memperbarui produk");
      } else {
        const res = await fetch(API_BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Gagal menambahkan produk");
      }
      await fetchProducts();
    } catch (err) {
      alert(err.message);
      throw err;
    }
  }

  async function handleDeleteProduct(id) {
    const confirmed = window.confirm("Yakin ingin menghapus produk ini?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus produk");
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={handleOpenAdd}>
          + Tambah Produk
        </button>
      </header>

      <div className="toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Cari nama produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="total-badge">{filteredProducts.length} produk</span>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <p className="status-text">Memuat daftar produk...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="status-text">Tidak ada produk yang ditemukan.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}

      <footer className="page-footer">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </footer>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        initialData={editingProduct}
      />
    </div>
  );
}
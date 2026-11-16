import { useState, useEffect } from "react";

export default function ProductModal({ isOpen, onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(String(initialData.price));
    } else {
      setName("");
      setPrice("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || price === "") return;

    setSubmitting(true);
    try {
      await onSave({
        name: name.trim(),
        price: Number(price),
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData ? "Edit Produk" : "Tambah Produk"}</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="product-name">Nama Produk</label>
            <input
              id="product-name"
              type="text"
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-price">Harga (Rp)</label>
            <input
              id="product-price"
              type="number"
              min="0"
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function ProductForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setPrice(initialData.price ?? "");
      setStock(initialData.stock ?? "");
      setDescription(initialData.description || "");
    } else {
      setName("");
      setPrice("");
      setStock("");
      setDescription("");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
      description: description.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-bold text-slate-900">
        {initialData ? "Edit Produk" : "Tambah Produk Baru"}
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Input
          id="product-name"
          label="Nama Produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Buku Tulis"
          required
        />
        <Input
          id="product-price"
          label="Harga (Rp)"
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Contoh: 15000"
          required
        />
        <Input
          id="product-stock"
          label="Stok"
          type="number"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Contoh: 20"
          required
        />
      </div>

      <div className="mt-4">
        <Input
          id="product-desc"
          label="Deskripsi (Opsional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Keterangan singkat produk"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Menyimpan..."
            : initialData
            ? "Simpan Perubahan"
            : "Tambah Produk"}
        </Button>
        {initialData && (
          <Button variant="secondary" onClick={onCancel}>
            Batal Edit
          </Button>
        )}
      </div>
    </form>
  );
}
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/products";

export async function getProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Gagal memuat daftar produk");
  const result = await response.json();
  return Array.isArray(result) ? result : result.data || [];
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Gagal memuat detail produk");
  const result = await response.json();
  return result.data || result;
}

export async function createProduct(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Gagal menambahkan produk");
  return response.json();
}

export async function updateProduct(id, payload) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Gagal memperbarui produk");
  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Gagal menghapus produk");
  return response.json();
}
import { formatPrice } from "../utils/formatPrice";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <span className="product-id">ID: {product.id}</span>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{formatPrice(product.price)}</p>

      <div className="card-actions">
        <button
          type="button"
          className="btn-outline-blue"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-outline-red"
          onClick={() => onDelete(product.id)}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
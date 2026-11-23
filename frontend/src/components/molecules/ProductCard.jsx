import { Link } from "react-router";
import Button from "../atoms/Button";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
          {product.stock !== undefined && (
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              Stok: {product.stock}
            </span>
          )}
        </div>

        <p className="mt-2 text-xl font-bold text-blue-600">
          {formatPrice(product.price)}
        </p>

        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            {product.description}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        <Link
          to={`/products/${product.id}`}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Detail
        </Link>
        <Button variant="warning" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(product.id)}>
          Hapus
        </Button>
      </div>
    </article>
  );
}
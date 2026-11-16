export function formatPrice(price) {
  return `Rp${new Intl.NumberFormat("id-ID").format(Number(price) || 0)}`;
}
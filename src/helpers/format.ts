/**
 * @param price price in cents
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    trailingZeroDisplay: "stripIfInteger",
  }).format(price / 100);
}

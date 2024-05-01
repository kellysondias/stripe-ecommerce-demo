export function formatPrice(price: `${number}`) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: parseFloat(price) % 1 === 0 ? 0 : 2,
  }).format(parseFloat(price));

  return formattedPrice;
}

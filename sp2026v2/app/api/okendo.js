const OKENDO_STORE_ID = "0cac0666-4535-46e7-8afd-1abecfe2e799";

export async function fetchOkendoReviews({ productId, limit = 5, orderBy = "date desc" }) {
  if (!productId) throw new Error("Product ID is required");

  const formattedProductId = `shopify-${productId}`;

  const url = `https://api.okendo.io/v1/stores/${OKENDO_STORE_ID}/products/${formattedProductId}/reviews?limit=${limit}&orderBy=${encodeURIComponent(
    orderBy
  )}`;

  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Okendo API Error: ${errorText}`);
  }

  return res.json();
}
import ProductDetails from "./ProductDetails";

const products: Record<string, any> = {
  "grand-symphonie": { id: "grand-symphonie", slug: "grand-symphonie", name: "Grand Symphonie", price: 240, image_url: "/products/Grand Symphonie.jpg", description: "A grand oriental floral signature with a luxurious European soul." },
  "silk-d-orient": { id: "silk-d-orient", slug: "silk-d-orient", name: "Silk d'Orient", price: 235, image_url: "/products/silk d orient.jpeg", description: "Soft silk, warm amber and refined oriental elegance." },
  "desert-oud": { id: "desert-oud", slug: "desert-oud", name: "Desert Oud", price: 260, image_url: "/products/desert-oud.jpg", description: "Deep oud wrapped in desert warmth and golden smoke." },
  "golden-tobacco": { id: "golden-tobacco", slug: "golden-tobacco", name: "Golden Tobacco", price: 250, image_url: "/products/golden-tobacco.jpg", description: "Rich tobacco, spice and sweet golden depth." },
  "vision-elegante": { id: "vision-elegante", slug: "vision-elegante", name: "Vision Elegante", price: 225, image_url: "/products/vision-elegante.jpg", description: "Clean elegance, modern woods and timeless presence." },
  "hibiscus-noir": { id: "hibiscus-noir", slug: "hibiscus-noir", name: "Hibiscus Noir", price: 230, image_url: "/products/Hibiscus Noir.jpg", description: "Dark hibiscus with a mysterious floral trail." },
  "elyssar": { id: "elyssar", slug: "elyssar", name: "Elyssar", price: 220, image_url: "/products/Elyssar.jpg", description: "A luminous fragrance with soft sensual brightness." },
  "rimal": { id: "rimal", slug: "rimal", name: "Rimal", price: 215, image_url: "/products/Rimal.jpg", description: "Warm sands, amber tones and smooth oriental air." },
  "arabian-nights": { id: "arabian-nights", slug: "arabian-nights", name: "Arabian Nights", price: 220, image_url: "/products/arabian-nights.jpg", description: "Nocturnal amber, spices and royal Arabian warmth." },
  "overdose": { id: "overdose", slug: "overdose", name: "Overdose", price: 230, image_url: "/products/overdose.jpg", description: "Intense, addictive and made to be remembered." },
  "eden-bloom": { id: "eden-bloom", slug: "eden-bloom", name: "Eden Bloom", price: 210, image_url: "/products/eden-bloom.jpg", description: "Fresh flowers, soft fruits and garden-like brightness." },
  "majestic-night": { id: "majestic-night", slug: "majestic-night", name: "Majestic Night", price: 240, image_url: "/products/majestic-night.jpg", description: "A majestic evening blend of amber, woods and mystery." },
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug] || products["majestic-night"];
  return <ProductDetails product={product} />;
}

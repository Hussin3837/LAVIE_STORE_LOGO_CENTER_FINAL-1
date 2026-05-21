"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "../components/CartContext";
import CartDrawer from "../components/CartDrawer";

const products = [
  { id: "grand-symphonie", name: "Grand Symphonie", price: 240, image: "/products/Grand Symphonie.jpg", description: "A grand oriental floral signature with a luxurious European soul." },
  { id: "silk-d-orient", name: "Silk d'Orient", price: 235, image: "/products/silk d orient.jpeg", description: "Soft silk, warm amber and refined oriental elegance." },
  { id: "desert-oud", name: "Desert Oud", price: 260, image: "/products/desert-oud.jpg", description: "Deep oud wrapped in desert warmth and golden smoke." },
  { id: "golden-tobacco", name: "Golden Tobacco", price: 250, image: "/products/golden-tobacco.jpg", description: "Rich tobacco, spice and sweet golden depth." },
  { id: "vision-elegante", name: "Vision Elegante", price: 225, image: "/products/vision-elegante.jpg", description: "Clean elegance, modern woods and timeless presence." },
  { id: "hibiscus-noir", name: "Hibiscus Noir", price: 230, image: "/products/Hibiscus Noir.jpg", description: "Dark hibiscus with a mysterious floral trail." },
  { id: "elyssar", name: "Elyssar", price: 220, image: "/products/Elyssar.jpg", description: "A luminous fragrance with soft sensual brightness." },
  { id: "rimal", name: "Rimal", price: 215, image: "/products/Rimal.jpg", description: "Warm sands, amber tones and smooth oriental air." },
  { id: "arabian-nights", name: "Arabian Nights", price: 220, image: "/products/arabian-nights.jpg", description: "Nocturnal amber, spices and royal Arabian warmth." },
  { id: "overdose", name: "Overdose", price: 230, image: "/products/overdose.jpg", description: "Intense, addictive and made to be remembered." },
  { id: "eden-bloom", name: "Eden Bloom", price: 210, image: "/products/eden-bloom.jpg", description: "Fresh flowers, soft fruits and garden-like brightness." },
  { id: "majestic-night", name: "Majestic Night", price: 240, image: "/products/majestic-night.jpg", description: "A majestic evening blend of amber, woods and mystery." },
];

export default function HomeClient() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const { addItem, count, isCartOpen, openCart, closeCart } = useCart();

  async function playMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    try {
      if (audio.paused) {
        await audio.play();
        setMusicStarted(true);
      } else {
        audio.pause();
        setMusicStarted(false);
      }
    } catch {
      alert("اضغط مرة أخرى لتشغيل الموسيقى");
    }
  }

  async function buyNow(product: any) {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ name: product.name, price: product.price, quantity: 1 }] }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      const text = encodeURIComponent(`Hello LA VIE, I want to order: ${product.name} - €${product.price}`);
      window.location.href = `mailto:orders@lavie.com?subject=New order - ${encodeURIComponent(product.name)}&body=${text}`;
    } catch {
      const text = encodeURIComponent(`Hello LA VIE, I want to order: ${product.name} - €${product.price}`);
      window.location.href = `mailto:orders@lavie.com?subject=New order - ${encodeURIComponent(product.name)}&body=${text}`;
    }
  }

  return (
    <main className="lavie-page">
      <CartDrawer open={isCartOpen} onClose={closeCart} />

      <header className="topbar">
        <a href="#home" className="brandmark" aria-label="LA VIE home">
          <img src="/images/logo.png" alt="LA VIE" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        </a>
        <nav>
          <a href="#collection">Collection</a>
          <a href="#story">Story</a>
          <button onClick={openCart}>Cart ({count})</button>
        </nav>
      </header>

      <section id="home" className="hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <img className="hero-logo" src="/images/logo.png" alt="LA VIE" onError={(e) => { e.currentTarget.style.display = "none"; }} />
          <div className="hero-actions">
            <a href="#collection">Explore Collection</a>
            <button onClick={playMusic}>{musicStarted ? "Pause Music" : "Play Music"}</button>
          </div>
        </div>
        <audio ref={audioRef} src="/music/background-music.mp3" loop preload="auto" />
      </section>

      <section id="story" className="story">
        <p className="eyebrow">British-inspired elegance · Oriental soul</p>
        <h2>A house of memorable perfume rituals.</h2>
        <p>LA VIE blends deep woods, amber, tobacco, florals and fresh signatures in a dark luxury store experience built for premium presentation.</p>
      </section>

      <section id="collection" className="collection">
        <p className="eyebrow">Eau de Parfum</p>
        <h2>Collection</h2>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <Link href={`/product/${product.id}`} className="product-image-wrap">
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <p className="product-type">LA VIE</p>
                <h3>{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <strong>€{product.price}</strong>
                <div className="product-actions">
                  <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price })}>Add to Cart</button>
                  <button onClick={() => buyNow(product)}>Buy</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

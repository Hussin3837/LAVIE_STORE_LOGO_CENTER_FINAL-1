"use client";

import { useCart } from "../../../components/CartContext";

export default function ProductDetails({ product }: { product: any }) {
  const { addItem } = useCart();

  async function buyNow() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ name: product.name, price: product.price, quantity: 1 }],
      }),
    });

    const data = await res.json();

    if (data.url) window.location.href = data.url;
    else alert("Checkout failed");
  }

  return (
    <main style={{ background: "#050505", color: "#f5f0e8", minHeight: "100vh" }}>
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "120px 7vw 80px",
          overflow: "hidden",
        }}
      >
        {product.video_url ? (
          <video
            src={product.video_url}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.55,
            }}
          />
        ) : (
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.5,
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,.92), rgba(0,0,0,.45), rgba(0,0,0,.82))",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 760 }}>
          <p
            style={{
              color: "#b38a52",
              letterSpacing: 6,
              fontSize: 12,
              marginBottom: 22,
            }}
          >
            EAU DE PARFUM
          </p>

          <h1
            style={{
              fontSize: "clamp(64px, 10vw, 150px)",
              lineHeight: 0.85,
              fontWeight: 300,
              margin: "0 0 30px",
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              maxWidth: 620,
              color: "#ddd",
              fontSize: 21,
              lineHeight: 1.8,
              opacity: 0.82,
              marginBottom: 34,
            }}
          >
            {product.description}
          </p>

          <h2
            style={{
              color: "#d7b27a",
              fontSize: 40,
              fontWeight: 400,
              marginBottom: 34,
            }}
          >
            €{product.price}
          </h2>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() =>
                addItem({
                  id: product.id || product.slug,
                  name: product.name,
                  price: product.price,
                })
              }
              style={primaryButton}
            >
              ADD TO CART
            </button>

            <button onClick={buyNow} style={secondaryButton}>
              BUY NOW
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

const primaryButton = {
  padding: "18px 34px",
  background: "#b38a52",
  color: "#111",
  border: 0,
  cursor: "pointer",
  letterSpacing: 3,
  fontWeight: 700,
};

const secondaryButton = {
  padding: "18px 34px",
  background: "rgba(255,255,255,.04)",
  color: "#f5f0e8",
  border: "1px solid rgba(255,255,255,.24)",
  cursor: "pointer",
  letterSpacing: 3,
};
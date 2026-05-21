"use client";

import { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";
export default function NoirAmbrePage() {
  const { addItem } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  async function buyNow() {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        items: [
          {
            name: "Noir Ambre",
            price: 260,
            quantity: 1,
          },
        ],
      }),
    });

    const data = await res.json();

    console.log(data);

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Stripe session failed");
      console.log(data);
    }
  } catch (err) {
    console.log(err);
    alert("Checkout error");
  }
}

  return (
    <main
      style={{
        background: "#070707",
        color: "#f5f0e8",
        minHeight: "100vh",
        padding: isMobile ? "110px 7% 70px" : "130px 8% 90px",
      }}
    >
      <section
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 42 : 70,
          alignItems: "center",
        }}
      >
        <video
          src="/p1.mp4"
          controls
          muted
          loop
          playsInline
          style={{
            width: "100%",
            maxWidth: isMobile ? "100%" : 560,
            borderRadius: 28,
            background: "#111",
            boxShadow: "0 40px 100px rgba(0,0,0,.55)",
          }}
        />

        <div>
          <p
            style={{
              color: "#b38a52",
              letterSpacing: 5,
              fontSize: 12,
              marginBottom: 18,
            }}
          >
            EAU DE PARFUM
          </p>

          <h1
            style={{
              fontSize: isMobile ? 58 : 110,
              fontWeight: 400,
              lineHeight: 0.9,
              marginBottom: 28,
              fontFamily: "var(--font-heading)",
            }}
          >
            Noir Ambre
          </h1>

          <p
            style={{
              fontSize: isMobile ? 17 : 20,
              lineHeight: 1.9,
              opacity: 0.78,
              marginBottom: 30,
              maxWidth: 620,
            }}
          >
            A dark amber fragrance wrapped in saffron, leather and warm woods.
            Designed for evenings, silence and unforgettable presence.
          </p>

          <strong
            style={{
              display: "block",
              color: "#d7b27a",
              fontSize: 30,
              marginBottom: 32,
            }}
          >
            €240
          </strong>

          <button
            onClick={() =>
              addItem({
                id: "noir-ambre",
                name: "Noir Ambre",
                price: 240,
              })
            }
            style={{
              width: "100%",
              padding: 20,
              background: "#b38a52",
              border: 0,
              color: "#111",
              letterSpacing: 3,
              cursor: "pointer",
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            ADD TO CART
          </button>
          
          <button
            onClick={buyNow}
            style={{
              width: "100%",
              padding: 20,
              background: "transparent",
              border: "1px solid rgba(255,255,255,.25)",
              color: "#f5f0e8",
              letterSpacing: 3,
              cursor: "pointer",
            }}
          >
            BUY NOW
          </button>
        </div>
      </section>

      <section
        style={{
          marginTop: isMobile ? 70 : 110,
          paddingTop: 60,
          borderTop: "1px solid rgba(255,255,255,.1)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
          gap: 24,
        }}
      >
        {[
          ["TOP", "Saffron"],
          ["HEART", "Dark Amber"],
          ["BASE", "Leather Woods"],
        ].map(([label, note]) => (
          <div
            key={label}
            style={{
              background: "rgba(255,255,255,.035)",
              border: "1px solid rgba(255,255,255,.08)",
              padding: 34,
              backdropFilter: "blur(12px)",
            }}
          >
            <p style={{ color: "#b38a52", letterSpacing: 4, fontSize: 12 }}>
              {label}
            </p>

            <h3 style={{ fontSize: 34, fontWeight: 400, marginTop: 12 }}>
              {note}
            </h3>
          </div>
        ))}
      </section>
    </main>
  );
}
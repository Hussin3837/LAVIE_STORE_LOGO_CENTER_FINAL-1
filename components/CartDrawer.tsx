"use client";

import { useCart } from "./CartContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const {
    items,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  if (!open) return null;

  async function checkout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <>
      <div onClick={onClose} style={overlay} />

      <aside style={drawer}>
        <div style={header}>
          <div>
            <p style={label}>LA VIE</p>
            <h2 style={title}>Your Cart</h2>
          </div>

          <button onClick={onClose} style={closeBtn}>
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p style={{ opacity: 0.65 }}>Your cart is empty.</p>
        ) : (
          <div style={{ display: "grid", gap: 18 }}>
            {items.map((item) => (
              <div key={item.id} style={itemCard}>
                <div>
                  <h3 style={itemTitle}>{item.name}</h3>
                  <p style={itemPrice}>€{item.price}</p>
                </div>

                <div style={qtyRow}>
                  <button onClick={() => decreaseQuantity(item.id)} style={qtyBtn}>
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)} style={qtyBtn}>
                    +
                  </button>
                </div>

                <button onClick={() => removeItem(item.id)} style={removeBtn}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={footer}>
          <div style={totalRow}>
            <span>Total</span>
            <strong>€{total.toFixed(2)}</strong>
          </div>

          <button
            onClick={checkout}
            disabled={items.length === 0}
            style={{
              ...checkoutBtn,
              opacity: items.length === 0 ? 0.45 : 1,
              cursor: items.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            CHECKOUT
          </button>
        </div>
      </aside>
    </>
  );
}

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,.55)",
  backdropFilter: "blur(8px)",
  zIndex: 9998,
};

const drawer = {
  position: "fixed" as const,
  top: 0,
  right: 0,
  width: "min(440px, 100vw)",
  height: "100vh",
  background: "rgba(8,8,8,.92)",
  color: "#f5f0e8",
  padding: 30,
  zIndex: 9999,
  overflowY: "auto" as const,
  boxShadow: "-30px 0 80px rgba(0,0,0,.65)",
  borderLeft: "1px solid rgba(255,255,255,.1)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 34,
};

const label = {
  color: "#b38a52",
  letterSpacing: 5,
  fontSize: 11,
  marginBottom: 8,
};

const title = {
  fontSize: 42,
  fontWeight: 300,
  margin: 0,
};

const closeBtn = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,.16)",
  color: "#fff",
  width: 42,
  height: 42,
  borderRadius: "50%",
  fontSize: 24,
  cursor: "pointer",
};

const itemCard = {
  padding: 20,
  border: "1px solid rgba(255,255,255,.1)",
  background: "rgba(255,255,255,.035)",
};

const itemTitle = {
  fontSize: 22,
  fontWeight: 300,
  margin: "0 0 8px",
};

const itemPrice = {
  color: "#d7b27a",
  margin: 0,
};

const qtyRow = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  marginTop: 18,
};

const qtyBtn = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,.18)",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
};

const removeBtn = {
  marginTop: 16,
  background: "transparent",
  border: 0,
  color: "#b38a52",
  cursor: "pointer",
};

const footer = {
  marginTop: 34,
  paddingTop: 24,
  borderTop: "1px solid rgba(255,255,255,.12)",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 22,
  marginBottom: 20,
};

const checkoutBtn = {
  width: "100%",
  padding: 18,
  background: "#b38a52",
  border: 0,
  color: "#111",
  fontWeight: 700,
  letterSpacing: 3,
};
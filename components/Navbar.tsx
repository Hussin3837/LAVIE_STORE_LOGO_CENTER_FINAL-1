"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

type Props = {
  onCartOpen: () => void;
};

export default function Navbar({
  onCartOpen,
}: Props) {
  const { count } = useCart();

  const [scrolled, setScrolled] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 30);

      setIsMobile(
        window.innerWidth < 900
      );
    };

    update();

    window.addEventListener(
      "scroll",
      update
    );

    window.addEventListener(
      "resize",
      update
    );

    return () => {
      window.removeEventListener(
        "scroll",
        update
      );

      window.removeEventListener(
        "resize",
        update
      );
    };
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: isMobile ? 12 : 18,
        left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? "94%" : "92%",
        zIndex: 999,
        padding: isMobile
          ? "12px 16px"
          : "14px 28px",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        borderRadius: 999,
        background: scrolled
          ? "rgba(8,8,8,.78)"
          : "rgba(8,8,8,.42)",
        backdropFilter:
          "blur(26px) saturate(180%)",
        border:
          "1px solid rgba(255,255,255,.08)",
        boxShadow: scrolled
          ? "0 10px 40px rgba(0,0,0,.42)"
          : "0 6px 24px rgba(0,0,0,.18)",
        transition:
          "all .35s ease",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Image
          src="/logo.png"
          alt="LA VIE"
          width={isMobile ? 42 : 54}
          height={isMobile ? 42 : 54}
          style={{
            objectFit: "contain",
            filter:
              "brightness(1.1) sepia(1) saturate(2)",
          }}
        />

        <div
          style={{
            color: "#f5f0e8",
            fontFamily:
              "var(--font-heading)",
            fontSize: isMobile
              ? 18
              : 24,
            letterSpacing: isMobile
              ? 5
              : 8,
            whiteSpace: "nowrap",
          }}
        >
          LA VIE
        </div>
      </div>

      {/* CENTER */}
      {!isMobile && (
        <nav
          style={{
            display: "flex",
            gap: 34,
            position: "absolute",
            left: "50%",
            transform:
              "translateX(-50%)",
          }}
        >
          <span style={navItem}>
            FRAGRANCES
          </span>

          <span style={navItem}>
            COLLECTIONS
          </span>

          <span style={navItem}>
            MAISON
          </span>
        </nav>
      )}

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 8 : 12,
        }}
      >
        <button style={btn(isMobile)}>
          EN
        </button>

        <button
          onClick={onCartOpen}
          style={{
            ...btn(isMobile),
            background:
              "rgba(179,138,82,.14)",
            border:
              "1px solid rgba(179,138,82,.28)",
            color: "#d7b27a",
          }}
        >
          CART ({count})
        </button>
      </div>
    </header>
  );
}

const navItem = {
  color: "#f5f0e8",
  fontSize: 12,
  letterSpacing: 3,
  opacity: 0.78,
  cursor: "pointer",
  transition: "all .25s ease",
};

const btn = (isMobile: boolean) => ({
  background:
    "rgba(255,255,255,.04)",
  border:
    "1px solid rgba(255,255,255,.1)",
  padding: isMobile
    ? "9px 12px"
    : "10px 18px",
  color: "#f5f0e8",
  cursor: "pointer",
  borderRadius: 999,
  letterSpacing: 2,
  fontSize: isMobile ? 10 : 11,
  backdropFilter: "blur(12px)",
  transition: "all .25s ease",
});
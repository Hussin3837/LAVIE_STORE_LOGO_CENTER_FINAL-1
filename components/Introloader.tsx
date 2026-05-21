"use client";

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [hide, setHide] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setHide(true);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || hide) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#050505",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        animation: "fadeLoader 1s ease forwards",
        animationDelay: "2s",
      }}
    >
      <div
        style={{
          fontSize: 110,
          letterSpacing: 24,
          color: "#f5f0e8",
          fontFamily: "var(--font-heading)",
          animation: "loaderText 2s ease",
        }}
      >
        LA VIE
      </div>

      <div
        style={{
          width: 140,
          height: 1,
          background: "rgba(255,255,255,.2)",
          marginTop: 28,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#b38a52",
            animation: "loadingBar 2s ease",
          }}
        />
      </div>
    </div>
  );
}
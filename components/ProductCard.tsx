"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartContext";

type Props = {
  id: string;
  slug: string;
  title: string;
  price: string;
  image?: string;
  video?: string;
  description: string;
};

export default function ProductCard({
  id,
  title,
  price,
  image,
  video,
  description,
}: Props) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (hovered && videoRef.current && !isMobile && video) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [hovered, isMobile, video]);

  function handleAddToCart() {
    addItem({
      id,
      name: title,
      price: Number(price.replace("€", "")),
    });
  }

  return (
    <article
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        height: "100%",
        minHeight: 550,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.018))",
        border: hovered
          ? "1px solid rgba(212, 169, 103, .75)"
          : "1px solid rgba(255,255,255,.09)",
        boxShadow: hovered
          ? "0 38px 100px rgba(0,0,0,.65), 0 0 45px rgba(179,138,82,.12)"
          : "0 20px 55px rgba(0,0,0,.38)",
        transform: hovered ? "translateY(-10px)" : "translateY(0)",
        transition: "all .45s ease",
      }}
    >
      <div
        style={{
          height: isMobile ? 340 : 400,
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, rgba(179,138,82,.1), rgba(0,0,0,.9))",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              inset: 0,
              opacity: hovered && video && !isMobile ? 0 : 1,
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "opacity .45s ease, transform .9s ease",
            }}
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b38a52",
              letterSpacing: 4,
              fontSize: 12,
            }}
          >
            LA VIE
          </div>
        )}

        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              inset: 0,
              opacity: hovered && !isMobile ? 1 : 0,
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "opacity .45s ease, transform .9s ease",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(to top, rgba(0,0,0,.72), rgba(0,0,0,.08) 55%, rgba(0,0,0,.18))",
          }}
        />
      </div>

      <div
        style={{
          padding: isMobile ? 12 : 16,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            color: "#b38a52",
            letterSpacing: 5,
            fontSize: 11,
            margin: 0,
          }}
        >
          EAU DE PARFUM
        </p>

        <h3
          style={{
            fontSize: isMobile ? 30 : 38,
            lineHeight: 1,
            margin: "12px 0 8px",
            color: "#f5f0e8",
            fontWeight: 300,
          }}
        >
          {title}
        </h3>

        <p
  style={{
    opacity: 0.68,
    lineHeight: 1.6,
    margin: 0,
    minHeight: 42,
    fontSize: 14,
  }}
>
          {description}
        </p>

        <div style={{ marginTop: "auto", paddingTop: 14 }}>
          <strong
            style={{
              color: "#d7b27a",
              fontSize: 26,
              fontWeight: 500,
            }}
          >
            {price}
          </strong>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 14,
            }}
          >
            <Link
              href={"/product/" + id}
              style={{
                flex: 1,
                border: "1px solid rgba(255,255,255,.22)",
                padding: "15px 18px",
                color: "#fff",
                textDecoration: "none",
                letterSpacing: 2,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              VIEW
            </Link>

            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                background: "#b38a52",
                border: 0,
                padding: "15px 18px",
                color: "#111",
                cursor: "pointer",
                letterSpacing: 2,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
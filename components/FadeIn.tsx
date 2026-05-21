"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0px)"
          : "translateY(70px)",
        transition: "all 1.2s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {children}
    </div>
  );
}
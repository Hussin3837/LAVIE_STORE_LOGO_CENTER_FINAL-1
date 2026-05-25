"use client";
import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", padding: 50, background: "#050505", minHeight: "100vh", color: "#f5f0e8" }}>
        <h2 style={{ fontSize: 32 }}>🔐 لوحة التحكم</h2>
        <p>أدخل كلمة السر</p>
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 12, margin: 20, width: 250, background: "#1a1a1a", color: "white", border: "1px solid #b38a52", borderRadius: 8 }}
        />
        <br />
        <button
          onClick={() => {
            if (password === "lavie2025") {
              setIsAuthenticated(true);
            } else {
              alert("كلمة سر خاطئة");
            }
          }}
          style={{ padding: "10px 30px", background: "#b38a52", color: "#111", fontWeight: "bold", cursor: "pointer", border: "none", borderRadius: 8 }}
        >
          دخول
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, background: "#050505", minHeight: "100vh", color: "#f5f0e8" }}>
      <h1>✨ مرحباً في لوحة التحكم</h1>
      <p>تم الدخول بنجاح. يمكنك الآن إدارة المنتجات والطلبات.</p>
    </div>
  );
}

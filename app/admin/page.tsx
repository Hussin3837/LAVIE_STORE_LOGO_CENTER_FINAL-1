"use client";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  if (!isAuthenticated) {
    return (
      <div style={{ padding: 50, textAlign: "center", background: "#050505", minHeight: "100vh", color: "#f5f0e8" }}>
        <h2 style={{ fontSize: 32, marginBottom: 20 }}>🔐 لوحة التحكم</h2>
        <p style={{ marginBottom: 20, opacity: 0.7 }}>أدخل اسم المستخدم وكلمة السر</p>
        
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 14, marginBottom: 15, width: 280, background: "#1a1a1a", color: "white", border: "1px solid #b38a52", borderRadius: 8, fontSize: 16, display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
        
        <br />
        
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 14, marginBottom: 20, width: 280, background: "#1a1a1a", color: "white", border: "1px solid #b38a52", borderRadius: 8, fontSize: 16, display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
        
        <br />
        
        <button
          onClick={() => {
            if (username === "lavie" && password === "lavie2025") {
              setIsAuthenticated(true);
              fetchProducts();
              fetchOrders();
            } else {
              alert("❌ اسم المستخدم أو كلمة السر خاطئة");
            }
          }}
          style={{ padding: "12px 32px", background: "#b38a52", color: "#111", fontWeight: "bold", cursor: "pointer", border: "none", borderRadius: 8, fontSize: 16 }}
        >
          دخول
        </button>
      </div>
    );
  }

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function fetchOrders() {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  }

  async function deleteProduct(id: string) {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchProducts();
    }
  }

  async function updateProduct(id: string, updates: any) {
    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    fetchProducts();
    setEditingProduct(null);
  }

  async function updateOrderStatus(id: string, status: string) {
    await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchOrders();
  }

  return (
    <div style={{ background: "#050505", minHeight: "100vh", color: "#f5f0e8", padding: 40 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, borderBottom: "1px solid #b38a52", paddingBottom: 20 }}>
          <h1 style={{ fontSize: 48, fontWeight: 300, letterSpacing: 2 }}>LA VIE ADMIN</h1>
          <button onClick={() => setIsAuthenticated(false)} style={{ background: "transparent", border: "1px solid #b38a52", padding: "8px 20px", borderRadius: 40, color: "#b38a52", cursor: "pointer" }}>تسجيل خروج</button>
        </div>
        
        <div style={{ background: "rgba(255,255,255,0.05)", padding: 30, marginBottom: 40, borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ fontSize: 28, marginBottom: 20, color: "#b38a52" }}>➕ إضافة منتج جديد</h2>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as any;
            await fetch("/api/products", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: form.name.value,
                price: parseFloat(form.price.value),
                description: form.description.value,
                category: form.category.value,
              }),
            });
            fetchProducts();
            form.reset();
          }} style={{ display: "grid", gap: 16, maxWidth: 500 }}>
            <input name="name" placeholder="اسم المنتج" required style={{ padding: 14, background: "#1a1a1a", border: "1px solid #b38a52", color: "white", borderRadius: 8 }} />
            <input name="price" type="number" placeholder="السعر (€)" required style={{ padding: 14, background: "#1a1a1a", border: "1px solid #b38a52", color: "white", borderRadius: 8 }} />
            <input name="description" placeholder="وصف المنتج" required style={{ padding: 14, background: "#1a1a1a", border: "1px solid #b38a52", color: "white", borderRadius: 8 }} />
            <input name="category" placeholder="التصنيف" style={{ padding: 14, background: "#1a1a1a", border: "1px solid #b38a52", color: "white", borderRadius: 8 }} />
            <button type="submit" style={{ padding: 14, background: "#b38a52", color: "#111", fontWeight: "bold", cursor: "pointer", border: "none", borderRadius: 8 }}>إضافة المنتج</button>
          </form>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", padding: 30, marginBottom: 40, borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ fontSize: 28, marginBottom: 20, color: "#b38a52" }}>📦 المنتجات ({products.length})</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #333" }}>
                <th style={{ padding: 12 }}>الاسم</th><th style={{ padding: 12 }}>السعر</th><th style={{ padding: 12 }}>التصنيف</th><th style={{ padding: 12 }}>العمليات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: 12 }}>{p.name}</td>
                  <td style={{ padding: 12 }}>€{p.price}</td>
                  <td style={{ padding: 12 }}>{p.category || "-"}</td>
                  <td style={{ padding: 12 }}>
                    <button onClick={() => deleteProduct(p.id)} style={{ background: "#8b0000", padding: "6px 12px", border: "none", borderRadius: 4, cursor: "pointer", color: "white" }}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", padding: 30, borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ fontSize: 28, marginBottom: 20, color: "#b38a52" }}>📋 الطلبات ({orders.length})</h2>
          {orders.length === 0 ? <p>لا توجد طلبات بعد</p> : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #333" }}>
                  <th style={{ padding: 12 }}>رقم الطلب</th><th style={{ padding: 12 }}>الإجمالي</th><th style={{ padding: 12 }}>الحالة</th><th style={{ padding: 12 }}>التاريخ</th><th style={{ padding: 12 }}>تغيير الحالة</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o: any) => (
                  <tr key={o.id} style={{ borderBottom: "1px solid #222" }}>
                    <td style={{ padding: 12 }}>{o.id.slice(0, 8)}...</td>
                    <td style={{ padding: 12 }}>€{o.total}</td>
                    <td style={{ padding: 12 }}>
                      <span style={{ padding: "4px 12px", borderRadius: 20, background: o.status === "pending" ? "#8b691b" : o.status === "paid" ? "#1b5e1b" : "#1a3a5c" }}>
                        {o.status === "pending" ? "قيد المعالجة" : o.status === "paid" ? "تم الدفع" : "تم الشحن"}
                      </span>
                    </td>
                    <td style={{ padding: 12 }}>{new Date(o.date).toLocaleDateString("ar")}</td>
                    <td style={{ padding: 12 }}>
                      <select onChange={(e) => updateOrderStatus(o.id, e.target.value)} defaultValue={o.status} style={{ background: "#222", color: "white", padding: 6, borderRadius: 4 }}>
                        <option value="pending">قيد المعالجة</option>
                        <option value="paid">تم الدفع</option>
                        <option value="shipped">تم الشحن</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
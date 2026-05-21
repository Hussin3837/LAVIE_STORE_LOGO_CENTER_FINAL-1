"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const emptyForm = {
    id: "",
    slug: "",
    name: "",
    price: "",
    description: "",
    image_url: "",
    video_url: "",
    active: true,
  };

  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const res = await fetch("/api/admin/products");
    const data = await res.json();

    setProducts(Array.isArray(data) ? data : []);
  }

  async function uploadFile(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.error) {
      alert("Upload error: " + data.error);
      return "";
    }

    return data.url;
  }

  async function saveProduct() {
    const method = editing ? "PUT" : "POST";

    const res = await fetch("/api/admin/products", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: form.id,
        slug:
          form.slug ||
          form.name.toLowerCase().replace(/\s+/g, "-"),
        name: form.name,
        price: Number(form.price),
        description: form.description,
        image_url: form.image_url,
        video_url: form.video_url,
        active: form.active,
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
      return;
    }

    alert(
      editing
        ? "Product Updated"
        : "Product Added"
    );

    setForm(emptyForm);

    setEditing(false);

    loadProducts();
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?"))
      return;

    const res = await fetch(
      "/api/admin/products",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
      return;
    }

    alert("Product Deleted");

    loadProducts();
  }

  function startEdit(product: any) {
    setEditing(true);

    setForm({
      id: product.id,
      slug: product.slug || "",
      name: product.name || "",
      price: String(product.price || ""),
      description:
        product.description || "",
      image_url:
        product.image_url || "",
      video_url:
        product.video_url || "",
      active:
        product.active ?? true,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setForm(emptyForm);

    setEditing(false);
  }

  return (
    <main style={page}>
      <h1 style={title}>
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 30,
        }}
      >
        <a href="/admin" style={navButton}>
          Products
        </a>

        <a
          href="/admin/orders"
          style={navButton}
        >
          Orders
        </a>
      </div>

      <section style={panel}>
        <h2>
          {editing
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) =>
            setForm((current) => ({
              ...current,
              slug: e.target.value,
            }))
          }
          style={input}
        />

        <input
          placeholder="اسم المنتج"
          value={form.name}
          onChange={(e) =>
            setForm((current) => ({
              ...current,
              name: e.target.value,
            }))
          }
          style={input}
        />

        <input
          placeholder="السعر"
          value={form.price}
          onChange={(e) =>
            setForm((current) => ({
              ...current,
              price: e.target.value,
            }))
          }
          style={input}
        />

        <textarea
          placeholder="الوصف"
          value={form.description}
          onChange={(e) =>
            setForm((current) => ({
              ...current,
              description:
                e.target.value,
            }))
          }
          style={{
            ...input,
            minHeight: 120,
          }}
        />

        <label style={label}>
          صورة المنتج
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file =
              e.target.files?.[0];

            if (!file) return;

            const url =
              await uploadFile(file);

            if (url) {
              setForm((current) => ({
                ...current,
                image_url: url,
              }));
            }
          }}
        />

        {form.image_url && (
          <img
            src={form.image_url}
            width={160}
            style={{
              borderRadius: 12,
              marginTop: 10,
            }}
          />
        )}

        <label style={label}>
          فيديو المنتج
        </label>

        <input
          type="file"
          accept="video/*"
          onChange={async (e) => {
            const file =
              e.target.files?.[0];

            if (!file) return;

            const url =
              await uploadFile(file);

            if (url) {
              setForm((current) => ({
                ...current,
                video_url: url,
              }));
            }
          }}
        />

        {form.video_url && (
          <video
            src={form.video_url}
            width={220}
            controls
            muted
            loop
            autoPlay
            playsInline
            style={{
              borderRadius: 12,
              marginTop: 10,
            }}
          />
        )}

        <label style={label}>
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                active:
                  e.target.checked,
              }))
            }
          />{" "}
          Active Product
        </label>

        <button
          onClick={saveProduct}
          style={button}
        >
          {editing
            ? "UPDATE PRODUCT"
            : "ADD PRODUCT"}
        </button>

        {editing && (
          <button
            onClick={cancelEdit}
            style={secondaryButton}
          >
            CANCEL EDIT
          </button>
        )}
      </section>

      <h2 style={sectionTitle}>
        Products
      </h2>

      <div style={list}>
        {products.map((product) => (
          <div
            key={product.id}
            style={card}
          >
            <div
              style={{
                display: "flex",
                gap: 18,
                alignItems: "center",
              }}
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  width={90}
                  height={90}
                  style={{
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />
              )}

              <div>
                <strong>
                  {product.name}
                </strong>

                <p>{product.slug}</p>

                <p>
                  €{product.price}
                </p>

                <p>
                  {product.active
                    ? "Active"
                    : "Inactive"}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              <button
                onClick={() =>
                  startEdit(product)
                }
                style={smallButton}
              >
                EDIT
              </button>

              <button
                onClick={() =>
                  deleteProduct(
                    product.id
                  )
                }
                style={dangerButton}
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#050505",
  color: "#f5f0e8",
  padding: 50,
};

const title = {
  fontSize: 56,
  marginBottom: 30,
};

const sectionTitle = {
  fontSize: 34,
  marginBottom: 20,
};

const panel = {
  display: "grid",
  gap: 14,
  maxWidth: 720,
  marginBottom: 70,
  padding: 28,
  border:
    "1px solid rgba(255,255,255,.12)",
  background:
    "rgba(255,255,255,.03)",
};

const input = {
  padding: 16,
  background: "#111",
  color: "#fff",
  border:
    "1px solid rgba(255,255,255,.15)",
};

const label = {
  color: "#b38a52",
  marginTop: 10,
};

const button = {
  padding: 18,
  background: "#b38a52",
  color: "#111",
  border: 0,
  cursor: "pointer",
  letterSpacing: 2,
};

const secondaryButton = {
  padding: 18,
  background: "transparent",
  color: "#fff",
  border:
    "1px solid rgba(255,255,255,.25)",
  cursor: "pointer",
};

const navButton = {
  padding: "12px 18px",
  background:
    "rgba(255,255,255,.06)",
  color: "#f5f0e8",
  border:
    "1px solid rgba(255,255,255,.14)",
  textDecoration: "none",
};

const list = {
  display: "grid",
  gap: 20,
};

const card = {
  padding: 22,
  border:
    "1px solid rgba(255,255,255,.12)",
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  gap: 20,
};

const smallButton = {
  padding: "12px 18px",
  background: "#b38a52",
  color: "#111",
  border: 0,
  cursor: "pointer",
};

const dangerButton = {
  padding: "12px 18px",
  background: "#5b1111",
  color: "#fff",
  border: 0,
  cursor: "pointer",
};
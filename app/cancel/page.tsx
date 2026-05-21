export default function CancelPage() {
  return (
    <main style={{ background: "#070707", color: "#f5f0e8", minHeight: "100vh", padding: 80 }}>
      <h1 style={{ fontSize: 64 }}>Payment Cancelled</h1>
      <p style={{ marginTop: 20 }}>Your payment was not completed.</p>
      <a href="/" style={{ color: "#b38a52", display: "inline-block", marginTop: 40 }}>
        Return to cart
      </a>
    </main>
  );
}
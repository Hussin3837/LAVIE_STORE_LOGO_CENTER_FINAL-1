export default function SuccessPage() {
  return (
    <main style={{ background: "#070707", color: "#f5f0e8", minHeight: "100vh", padding: 80 }}>
      <h1 style={{ fontSize: 64 }}>Payment Successful</h1>
      <p style={{ marginTop: 20 }}>Thank you for your LA VIE order.</p>
      <a href="/" style={{ color: "#b38a52", display: "inline-block", marginTop: 40 }}>
        Back to store
      </a>
    </main>
  );
}
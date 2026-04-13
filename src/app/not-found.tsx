import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0a0a", color: "#ededed", fontFamily: "sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "6rem", fontWeight: 700, margin: 0, lineHeight: 1 }}>404</h1>
          <p style={{ fontSize: "1.25rem", color: "#888", margin: 0 }}>
            This page could not be found.
          </p>
          <Link
            href="/"
            style={{
              marginTop: "1rem",
              padding: "0.75rem 2rem",
              border: "1px solid #ededed",
              borderRadius: "9999px",
              color: "#ededed",
              textDecoration: "none",
              fontSize: "0.95rem",
              transition: "opacity 0.2s",
            }}
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}

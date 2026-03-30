// app/layout.jsx
export const metadata = {
  title: "Mara & Gianluigi Wedding",
  description: "Il nostro matrimonio il 18 giugno 2026"
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
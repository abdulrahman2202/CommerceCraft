import "./globals.css";

export const metadata = {
  title: "CommerceCraft",
  description: "Multi Vendor Ecommerce"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
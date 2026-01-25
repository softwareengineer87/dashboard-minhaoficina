import "./globals.css";
import { AuthProvider2 } from "@/data/contexts/Auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider2>
          <div className="layout-container">
            {children}
          </div>
        </AuthProvider2>
      </body>
    </html>
  );
}

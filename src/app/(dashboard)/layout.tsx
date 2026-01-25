import { Sidebar } from "@/components/Sidebar";
import './layout.css';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <div className="layout-dashboard">
          <Sidebar />
          <div className="content">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

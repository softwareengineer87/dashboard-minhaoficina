import './layout.css';
import { Page } from "@/template/Page";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Page>{children}</Page>
      </body>
    </html>
  );
}

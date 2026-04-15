import { Page } from '@/components/template/Page';
import './layout.css';

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

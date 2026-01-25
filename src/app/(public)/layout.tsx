'use client';

import './public-layout.css';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='public-layout'>
      <div className='content-login'>
        {children}
      </div>
    </div>
  );
}

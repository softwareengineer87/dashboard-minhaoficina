import { Sidebar } from "@/components/Sidebar";
import { ReactNode } from "react";
import './page.css';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface PageProps {
  children: ReactNode;
}

function Page({ children }: PageProps) {
  return (
    <section className='page-container'>
      <Sidebar />
      <div className='content'>
        <Header />
        {children}
        <Footer />
      </div>
    </section>
  );
}

export { Page }


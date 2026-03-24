'use client';

import { Auth } from "@/data/contexts/Auth";
import { IconDashboard, IconUser } from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import './header.css';
import Image from "next/image";

function Header() {

  const {
    business,
    getLogo,
    logoData
  } = useContext(Auth);

  useEffect(() => {
    getLogo();
  }, [business]);

  return (
    <header className="header-container">
      <div className="header">
        <div className="header-left">
          <IconDashboard size={20} />
          <p>Dashboard</p>
        </div>
        <div className="header-right">
          <div className='infos'>
            <p>{business.payload?.name}</p>
            <span>{business.payload?.email}</span>
          </div>
          <span className="icon-user">
            {logoData && logoData.url ? (
              <Image
                src={logoData.url}
                width={300}
                height={150}
                alt='Logotipo da empresa'
                className='image-profile'
              />
            ) : (
              <Image
                src='./avatar.svg'
                width={300}
                height={150}
                alt='Logotipo da empresa'
                className='image-profile'
              />
            )}
          </span>
        </div>
      </div>
    </header>
  );
}

export { Header }


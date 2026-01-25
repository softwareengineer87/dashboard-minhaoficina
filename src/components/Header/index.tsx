'use client';

import { Auth } from "@/data/contexts/Auth";
import { IconDashboard, IconUser } from "@tabler/icons-react";
import { useContext } from "react";
import './header.css';

function Header() {

  const { business } = useContext(Auth);

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
            <IconUser size={30} />
          </span>
        </div>
      </div>
    </header>
  );
}

export { Header }


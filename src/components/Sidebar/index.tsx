'use client';

import { IconCalendar, IconChevronCompactLeft, IconChevronCompactRight, IconHome, IconList, IconLogout2, IconNote, IconNotes, IconTool, IconUser } from '@tabler/icons-react';
import './sidebar.css';
import { useContext, useEffect, useState } from 'react';
import { Message } from '../Message';
import Link from 'next/link';
import { Auth } from '@/data/contexts/Auth';
import Image from 'next/image';
import { useBusiness } from '@/data/hooks/useBusiness';
import { Photo } from '@/types/Photo';

function Sidebar() {

  const [open, setOpen] = useState<boolean>(false);
  const [photo, setPhoto] = useState<Photo>({} as Photo);

  const {
    business,
    logout,
    message,
    activeMessage
  } = useContext(Auth);

  const { loadPhoto } = useBusiness();

  function openSidebar() {
    setOpen((state) => !state);
  }

  async function getPhoto() {
    const data = await loadPhoto(business.payload?.businessId);
    setPhoto(data);

  }

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <section className={`sidebar-container ${open ? 'open-sidebar' : ''}`}>
      {open ? (
        <IconChevronCompactLeft className='icon-open' onClick={openSidebar} />
      ) : (
        <IconChevronCompactRight className='icon-open' onClick={openSidebar} />
      )}
      <div className="sidebar">
        <Message
          message={message}
          status={true}
          activeMessage={activeMessage}
        />
        <header className='header-sidebar'>
        </header>
        <nav className='menu'>
          <ul>
            <li><Link className='link' href='/'><IconHome stroke={1} /><span className='close'>Home</span></Link></li>
            <li><Link className='link' href='/create-note'><IconNote stroke={1} /><span className='close'>Criar nota do cliente</span></Link></li>
            <li><Link className='link' href='/notes'><IconNotes stroke={1} /><span className='close'>Notas</span></Link></li>
            <li><Link className='link' href='/stock'><IconList stroke={1} /><span className='close'>Estoque de Produtos</span></Link></li>
            <li><Link className='link' href='/business-profile'><IconTool stroke={1} /><span className='close'>Sua conta</span></Link></li>
          </ul>
        </nav>
      </div>
      <button
        onClick={logout}
        className='btn-logout'>
        <IconLogout2 className='icon-logout' stroke={1} />
        <span className='close'>Sair</span>
      </button>
    </section>
  );
}

export { Sidebar }


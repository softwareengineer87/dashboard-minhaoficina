'use client';

import { IconCalendar, IconChevronCompactLeft, IconChevronCompactRight, IconChevronDown, IconChevronUp, IconHome, IconList, IconLogout2, IconNote, IconNotes, IconTool, IconUser } from '@tabler/icons-react';
import './sidebar.css';
import { useContext, useEffect, useState } from 'react';
import { Message } from '../Message';
import { Auth } from '@/data/contexts/Auth';
import { useBusiness } from '@/data/hooks/useBusiness';
import { Photo } from '@/types/Photo';
import { MenuItem } from '../template/MenuItem';

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
            <MenuItem
              label='Home'
              icon={<IconHome />}
              url='/'
            />
            <MenuItem
              label='Criar Nota'
              icon={<IconNote />}
              url='/create-note'
            />
            <MenuItem
              label='Notas dos clientes'
              icon={<IconNotes />}
              url='/notes'
            />
            <MenuItem
              label='Estoque'
              icon={<IconList />}
              url='/stock'
            />
            <MenuItem
              label='Sua conta'
              icon={<IconTool />}
              url='/business-profile'
            />
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


'use client';

import { IconCalendar, IconChevronCompactLeft, IconChevronCompactRight, IconChevronDown, IconChevronUp, IconHome, IconList, IconLogout2, IconNote, IconNotes, IconTool, IconUser } from '@tabler/icons-react';
import './sidebar.css';
import { useContext, useEffect, useState } from 'react';
import { Message } from '../Message';
import Link from 'next/link';
import { Auth } from '@/data/contexts/Auth';
import Image from 'next/image';
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
            <div className='slide-menu'>
              <p className='close'>
                inicio
              </p>
              <MenuItem
                label='Home'
                icon={<IconHome />}
                url='/'
              />
            </div>
            <div className='slide-menu'>
              <p className='close'>
                notas
              </p>
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
            </div>
            <div className='slide-menu'>
              <p className='close'>
                estoque
              </p>
              <MenuItem
                label='Estoque'
                icon={<IconList />}
                url='/stock'
              />
            </div>
            <div className='slide-menu'>
              <p className='close'>
                configurações
              </p>
              <MenuItem
                label='Sua conta'
                icon={<IconTool />}
                url='/business-profile'
              />
            </div>
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


'use client';

import './page.css';
import { useContext, useEffect } from 'react';
import { Auth } from '@/data/contexts/Auth';
import { Message } from '@/components/Message';
import { Search } from '@/components/Search';
import { Notes } from '@/components/Notes';
import { Statistics } from '@/components/Statistics';
import { NotificationCenter } from '@/components/NotificationCenter';

export default function Home() {

  const {
    business,
    getLogo,
    message,
    activeMessage,
    status
  } = useContext(Auth);

  useEffect(() => {
    getLogo();
  }, [business]);

  return (
    <main className='container-main'>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <Search />
      <Statistics />
      <Notes />
    </main>
  );
}

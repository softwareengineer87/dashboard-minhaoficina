'use client';

import './page.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { Auth } from '@/data/contexts/Auth';
import { Message } from '@/components/Message';
import { Search } from '@/components/Search';
import { Notes } from '@/components/Notes';
import { Statistics } from '@/components/Statistics';
import { useNotification } from '@/data/hooks/useNotificaction';
import { useStock } from '@/data/hooks/useStock';
import { LiteStocks } from '@/components/LiteStocks';

export default function Home() {

  const [notification, setNotification] = useState<string>('');


  const {
    sendNotification,
    getNotifications,
    addNotification,
    notifications
  } = useNotification();

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

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <main className='container-main'>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <Search />
      <Statistics />
      <section className='middle'>
        <div className='graphic'>graficos</div>
        <div className='proucts'>
          <LiteStocks />
        </div>
      </section>
      <Notes />
    </main>
  );
}

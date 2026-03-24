'use client';

import './page.css';
import { useContext, useEffect } from 'react';
import { Auth } from '@/data/contexts/Auth';
import { StatisticCard } from '@/components/StatisticCard';
import { IconCalendar, IconCalendarMonth, IconCurrencyDollar, IconTool, IconUsers } from '@tabler/icons-react';
import { Message } from '@/components/Message';
import { Format } from '@/utils/Format';
import { Search } from '@/components/Search';
import { Notes } from '@/components/Notes';

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
      <section className='statistics'>
        <StatisticCard
          total={0}
          description='Serviços cadastrados'
          icon={<IconTool />}
        />
        <StatisticCard
          total={0}
          description='Agendamentos'
          icon={<IconCalendar />}
        />
        <StatisticCard
          total={0}
          description='Clientes cadastrados'
          icon={<IconUsers />}
        />
        <StatisticCard
          total={Format.formatPrice(0)}
          description='Valor total em agendamentos'
          icon={<IconCurrencyDollar />}
        />
      </section>
      <StatisticCard
        total={1200}
        description='Este mes'
        icon={<IconCalendarMonth />}
      />
      <Notes />
    </main>
  );
}

'use client';

import './page.css';
import { useContext, useEffect, useState } from 'react';
import { Auth } from '@/data/contexts/Auth';
import { useServices } from '@/data/hooks/useServices';
import { Service } from '@/types/Service';
import { StatisticCard } from '@/components/StatisticCard';
import { IconCalendar, IconCalendarMonth, IconCurrencyDollar, IconPigMoney, IconTool, IconUsers } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useBusiness } from '@/data/hooks/useBusiness';
import { Message } from '@/components/Message';
import { UpdateService } from '@/components/UpdateService';
import { Services } from '@/components/Services';
import { Customers } from '@/components/Customers';
import { Format } from '@/utils/Format';
import { Search } from '@/components/Search';

export default function Home() {

  const {
    updateService,
    saveService,
    deleteService,
    allServices,
    message,
    status,
    activeMessage,
  } = useServices();

  const {
    schedulesByBusinessId,
    customers
  } = useBusiness();

  const [actualService, setActualService] = useState<Service | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const [totalServices, setTotalServices] = useState<number>(allServices.length);

  const { push } = useRouter();


  function handleForm() {
    setActualService({} as Service);
    setActive(true);
  }

  function handleSelectService(service: Service) {
    setActualService(service);
  }

  function cancell() {
    setActualService(null);
    setActive(false);
  }

  async function handleUpdateService() {
    if (active && actualService) {
      await saveService(
        actualService.service_title,
        actualService.price,
        actualService.start_hour
      );
      setTotalServices(allServices.length);
    } else if (actualService) {
      await updateService(actualService);
      setTotalServices(allServices.length);
    }
    setActualService(null);
    setActive(false);
  }

  function redirectTo(url: string) {
    setTimeout(() => {
      push(url);
    }, 3000);
  }

  async function handleDeleteService(service: Service) {
    const confirm = window.confirm('Confirmar exclusão do serviço?');
    if (confirm) {
      await deleteService(service);
      setTotalServices(allServices.length);
      redirectTo('/services');
    }
  }

  useEffect(() => {
    setTotalServices(allServices.length);
  }, [allServices.length]);

  const { business } = useContext(Auth);

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
          total={totalServices}
          description='Serviços cadastrados'
          icon={<IconTool />}
        />
        <StatisticCard
          total={schedulesByBusinessId.length}
          description='Agendamentos'
          icon={<IconCalendar />}
        />
        <StatisticCard
          total={customers.length}
          description='Clientes cadastrados'
          icon={<IconUsers />}
        />
        <StatisticCard
          total={Format.formatPrice(240)}
          description='Valor total em agendamentos'
          icon={<IconCurrencyDollar />}
        />
      </section>
      <StatisticCard
        total={1200}
        description='Este mes'
        icon={<IconCalendarMonth />}
      />
      {actualService ? (
        <UpdateService
          service={actualService}
          changeService={setActualService}
          updateService={handleUpdateService}
          cancell={cancell}
        />
      ) : (
        <>
          <Services
            selectService={handleSelectService}
            deleteService={handleDeleteService}
          />
          <Customers />
        </>
      )}
    </main>
  );
}

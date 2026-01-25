
'use client';

import {
  IconCalendar,
  IconPigMoney,
  IconTool,
  IconUsers
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useBusiness } from '@/data/hooks/useBusiness';
import { useRouter } from 'next/navigation';
import { Service } from '@/types/Service';
import { Message } from '@/components/Message';
import { ModalCreateService } from '@/components/ModalCreateService';
import { StatisticCard } from '@/components/StatisticCard';
import { UpdateService } from '@/components/UpdateService';
import { Services } from '@/components/Services';
import { Customers } from '@/components/Customers';
import { useServices } from '@/data/hooks/useServices';

function InitialDashboard() {
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
    schedules,
    customers
  } = useBusiness();

  const [activeModal, setActiveModal] = useState<boolean>(false);
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
        actualService.start_hour,
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

  return (
    <main className="home-container">
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <ModalCreateService
        activeModal={activeModal}
        setActivemodal={setActiveModal}
      />
      <div className='buttons'>
        <button onClick={handleForm} className='btn-new'>Cadastrar serviço</button>
      </div>
      <section className='statistics'>
        <StatisticCard
          total={totalServices}
          description='Serviços cadastrados'
          icon={<IconTool />}
        />
        <StatisticCard
          total={schedules.length}
          description='Agendamentos'
          icon={<IconCalendar />}
        />
        <StatisticCard
          total={customers.length}
          description='Clientes cadastrados'
          icon={<IconUsers />}
        />
        <StatisticCard
          total={15}
          description='Valor total em agendamentos'
          icon={<IconPigMoney />}
        />
      </section>
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

export { InitialDashboard }


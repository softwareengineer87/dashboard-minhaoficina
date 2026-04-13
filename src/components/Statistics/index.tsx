import { Format } from "@/utils/Format";
import { StatisticCard } from "../StatisticCard";
import {
  IconCalendar,
  IconCurrencyDollar,
  IconTool,
  IconUsers
} from '@tabler/icons-react';

function Statistics() {
  return (
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
  );
}

export { Statistics }


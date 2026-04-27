import { Format } from "@/utils/Format";
import { StatisticCard } from "../StatisticCard";
import {
  IconCalendar,
  IconCurrencyDollar,
  IconList,
  IconTool
} from '@tabler/icons-react';
import { useStock } from "@/data/hooks/useStock";

function Statistics() {

  const {
    allStocks,
    totalValueProducts,
    productQuantity
  } = useStock();

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
        total={productQuantity}
        description='Total de produtos cadastrados'
        icon={<IconList />}
      />
      <StatisticCard
        total={Format.formatPrice(totalValueProducts)}
        description='Valor total em produtos'
        icon={<IconCurrencyDollar />}
      />
    </section>
  );
}

export { Statistics }


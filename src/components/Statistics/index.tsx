import { Format } from "@/utils/Format";
import { StatisticCard } from "../StatisticCard";
import {
  IconCalendar,
  IconCurrencyDollar,
  IconList,
  IconTool
} from '@tabler/icons-react';
import { useStock } from "@/data/hooks/useStock";
import { useContext, useEffect, useState } from "react";
import { Stock } from "@/models/Stock";
import { baseURL } from "@/utils/api";
import { Auth } from "@/data/contexts/Auth";

function Statistics() {

  const [totalValueProducts, setTotalValueProducts] = useState<number>(0);
  const [productQuantity, setPoductQuantity] = useState<number>(0);
  const [allStocks, setAllStocks] = useState<Stock[]>([]);

  const { business } = useContext(Auth);

  async function loadStocks(businessId: string, page: number, name?: string) {
    try {
      const convertPage = page === 0 ? 1 : Number(page);
      let response;
      if (name) {
        response = await fetch(`${baseURL}/stocks/${businessId}?page=${convertPage}&title=${name}`, {
          credentials: 'include'
        });
      } else {
        response = await fetch(`${baseURL}/stocks/${businessId}?page=${convertPage}`, {
          credentials: 'include'
        });
      }
      const data = await response.json();
      setAllStocks(data.allStocks);
    } catch (error: any) {
      console.log(`Erro ao carregar notas: ${error.message}`)
    }
  }

  function getTotalValueProducts() {
    let total = 0;
    let quantity = 0;
    for (const product of allStocks) {
      total += Number(product.price) * Number(product.quantity);
      quantity += Number(product.quantity);
    }
    setTotalValueProducts(total);
    setPoductQuantity(quantity);
  }

  useEffect(() => {
    loadStocks(business.payload?.businessId, 1);
    getTotalValueProducts();
  }, [allStocks]);

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


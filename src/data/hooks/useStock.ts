import { PaginationModel } from "@/models/PaginationModel";
import { Stock } from "@/models/Stock";
import { baseURL } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../contexts/Auth";

function useStock() {

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>({} as PaginationModel);

  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [activeMessage, setActiveMessage] = useState<boolean>(false);

  const { business } = useContext(Auth);

  function handleActiveMessage() {
    setActiveMessage(true);
    setMessage('Token invalido.');
    setTimeout(() => {
      setActiveMessage(false);
    }, 4000);
    push('sign-in');
  }

  const { push } = useRouter();

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
      if (response.status === 401) {
        handleActiveMessage();
        setStatus(response.ok);
      }
      const data = await response.json();
      setStocks(data.stocks);
      setPagination(data.pagination);
    } catch (error: any) {
      console.log(`Erro ao carregar notas: ${error.message}`)
    }
  }

  return {
    loadStocks,
    stocks,
    pagination,
    message,
    status,
    activeMessage
  }

}

export { useStock }

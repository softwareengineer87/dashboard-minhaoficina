import { PaginationModel } from "@/models/PaginationModel";
import { Stock } from "@/models/Stock";
import { baseURL } from "@/utils/api";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../contexts/Auth";

function useStock() {

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [allStocks, setAllStocks] = useState<Stock[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>({} as PaginationModel);
  const [totalValueProducts, setTotalValueProducts] = useState<number>(0);
  const [productQuantity, setPoductQuantity] = useState<number>(0);

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
  }

  async function saveStock(stock: Partial<Stock>) {
    try {
      const response = await fetch(`${baseURL}/stock/${business.payload?.businessId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: stock.title,
          price: stock.price,
          quantity: stock.quantity,
          minimum_stock: Number(stock.minimum_stock)
        })
      });
      handleActiveMessage();
      const data = await response.json();
      if (data.statusCode === 500) {
        setMessage(data.message);
        setStatus(response.ok);
      }
      setMessage(data.message);
      setStatus(response.ok);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function updateStock(stock: Partial<Stock>) {
    try {
      const response = await fetch(`${baseURL}/stock/${stock.product_id}/${stock.business_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: stock.title,
          price: stock.price,
          quantity: stock.quantity,
          minimum_stock: Number(stock.minimum_stock)
        })
      });
      handleActiveMessage();
      const data = await response.json();
      if (data.statusCode === 500) {
        setMessage(data.message);
        setStatus(response.ok);
      }
      setMessage(data.message);
      setStatus(response.ok);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function stockDelete(productId: string) {
    try {
      const response = await fetch(`${baseURL}/stock/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      handleActiveMessage();
      const data = await response.json();
      if (data.statusCode === 500) {
        setMessage(data.message);
        setStatus(response.ok);
      }
      setMessage(data.message);
      setStatus(response.ok);
    } catch (error: any) {
      console.log(error.message);
    }
  }


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
  }, [stocks]);

  return {
    loadStocks,
    stocks,
    pagination,
    allStocks,
    totalValueProducts,
    productQuantity,
    saveStock,
    updateStock,
    stockDelete,
    message,
    status,
    activeMessage
  }

}

export { useStock }

'use client';

import { useContext, useEffect, useState } from 'react';
import { Stock } from '@/models/Stock';
import './stock.css';
import { Auth } from '@/data/contexts/Auth';
import { FormStock } from '@/components/FormStock';
import { Stocks } from '@/components/Stocks';
import { useStock } from '@/data/hooks/useStock';
import { Message } from '@/components/Message';

function StockPage() {

  const [stock, setStock] = useState<Partial<Stock> | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { business } = useContext(Auth);

  const {
    loadStocks,
    stocks,
    pagination,
    saveStock,
    updateStock,
    stockDelete,
    message,
    status,
    activeMessage
  } = useStock();

  async function save() {
    if (isEdit) {
      const response = await updateStock(stock!);
      if (response?.ok) {
        setStock(null);
        setIsEdit(false);
      }
    } else {
      const response = await saveStock(stock!);
      if (response?.ok) {
        setStock(null);
        setIsEdit(false);
      }
    }
    loadStocks(business.payload.businessId, 1);
  }

  function selectedStock(stock: Partial<Stock>) {
    setStock(stock);
    setIsEdit(true);
  }

  function cancell() {
    setStock(null);
    setIsEdit(false);
  }

  async function deleteStock(productId: string) {
    const ok = confirm('Deseja realmente deletar este produto?');
    if (ok) {
      await stockDelete(productId);
    }
    loadStocks(business.payload?.businessId, 1);
  }

  useEffect(() => {
    loadStocks(business.payload?.businessId, 1);
  }, [stock]);

  return (
    <section className='stock-container'>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <div className='stock'>
        {stock ? (
          <FormStock
            deactive={cancell}
            stock={stock}
            changeStock={setStock}
            save={save}
          />
        ) : (
          <div className='box-stocks'>
            <button
              className='btn-create'
              onClick={() => setStock({})}
            >
              Cadastrar produto
            </button>
            <Stocks
              stocks={stocks}
              pagination={pagination}
              selectedStock={selectedStock}
              deleteStock={deleteStock}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default StockPage;

'use client';

import { useContext, useEffect, useState } from 'react';
import { Stock } from '@/models/Stock';
import './stock.css';
import { Auth } from '@/data/contexts/Auth';
import { FormStock } from '@/components/FormStock';
import { Stocks } from '@/components/Stocks';
import { useStock } from '@/data/hooks/useStock';

function Stock() {

  const [stock, setStock] = useState<Partial<Stock>>({} as Stock);
  const [showForm, setShowForm] = useState<boolean>(false);

  const { business } = useContext(Auth);

  const {
    loadStocks,
  } = useStock();

  function changeForm() {
    setShowForm(true);
  }

  async function save() {
    // await updateBusiness(business.payload.businessId, businessForm);
    setStock({} as Stock);
    loadStocks(business.payload.businessId, 1);
  }

  useEffect(() => {
    loadStocks(business.payload?.businessId, 1);
  }, []);

  return (
    <section className='stock-container'>
      <div className='stock'>
        {showForm ? (
          <FormStock
            showForm={showForm}
            deactive={() => setShowForm(false)}
            stock={stock!}
            changeStock={setStock}
            save={save}
          />
        ) : (
          <div className='box-stocks'>
            <button
              className='btn-create'
              onClick={changeForm}
            >
              Cadastrar produto
            </button>
            <Stocks />
          </div>
        )}
      </div>
    </section>
  );
}

export default Stock;

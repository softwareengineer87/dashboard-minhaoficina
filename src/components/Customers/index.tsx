
import './customers.css';
import { IconChevronCompactLeft, IconChevronCompactRight, IconLock, IconLockOpen2, IconTrash } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { useBusiness } from '../../data/hooks/useBusiness';
import type { Customer } from '../../models/Customer';
import { Message } from '../Message';
import { Auth } from '@/data/contexts/Auth';

function Customers() {

  const {
    customers,
    blockCustomer,
    unlockCustomer,
    canSchedule,
    setCanSchedule,
    loadBusiness,
    setOffset,
    limit,
    message,
    status,
    activeMessage
  } = useBusiness();

  const { business } = useContext(Auth);

  const totalPages = Math.ceil(customers.length / limit);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage + 1 === totalPages;

  function goToPage(index: number) {
    const current = index * limit;
    setOffset(current);
    setCurrentPage(index);
  }

  function toPreviusPage() {
    setCurrentPage((index) => {
      if (currentPage === index) {
        setOffset(0);
      } else {
        setOffset(-10);
      }
      return index === 0 ? index : index - 1
    });
    setOffset(limit);
  }

  function toNextPage() {
    setCurrentPage((index) => {
      if (index === totalPages) {
        setOffset(index * limit);
      } else {
        setOffset(limit);
      }
      return index + 1 === totalPages ? index : index + 1
    });
  }

  async function handleBlockCustomer() {
    const response = await blockCustomer(business.payload?.businessId);
    if (response?.ok) {
      setCanSchedule(false);
    }
    if (!canSchedule) {
      await unlockCustomer(business.payload?.businessId);
      setCanSchedule(true);
    }
  }

  useEffect(() => {
    loadBusiness(business.payload?.businessId);
  }, [business.payload?.businessId, loadBusiness]);

  return (
    <section className='customers-container'>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <div className='customers'>
        <h2>clientes cadastrados</h2>
        <div className='table-container'>
          <table className='table-customers'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Total de cancelamentos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <p>Nenhum cliente cadastrado</p>
              )
                : customers.map((customer: Customer) => (
                  <tr key={customer.customerId}>
                    <td>
                      <span className='cell-header'>Nome</span>
                      {customer.name}
                    </td>
                    <td>
                      <span className='cell-header'>E-mail</span>
                      {customer.email}
                    </td>
                    <td>
                      <span className='cell-header'>Celular</span>
                      {customer.phone}
                    </td>
                    <td>
                      <span className='cell-header'>Total de cancelamentos</span>
                      {customer.cancell_count}
                    </td>
                    <td className='actions'>
                      <span className='cell-header'>Ações</span>
                      <button onClick={handleBlockCustomer}>
                        {canSchedule ? (
                          <IconLockOpen2 className='edit' stroke={1} />
                        ) : (
                          <IconLock className='edit' stroke={1} />
                        )}
                      </button>
                      <button onClick={() => { }}>
                        <IconTrash className='del' stroke={1} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className='buttons-pagination'>
            <button
              disabled={isFirstPage}
              className={`page-icon link-all ${isFirstPage && 'not-allowed'}`}
              onClick={toPreviusPage}
            >
              <IconChevronCompactLeft stroke={2} />
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const isCurrent = currentPage === index;
              return (
                <button
                  disabled={isCurrent}
                  onClick={() => goToPage(index)}
                  key={index}
                  className={`link-all page-number ${isCurrent && 'active not-allowed'}`}>
                  {index + 1}
                </button>
              );
            })}
            <button
              disabled={isLastPage}
              className={`page-icon link-all ${isLastPage && 'not-allowed'}`}
              onClick={toNextPage}
            >
              <IconChevronCompactRight stroke={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Customers }


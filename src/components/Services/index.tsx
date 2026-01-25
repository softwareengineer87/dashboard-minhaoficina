
import './services.css';
import { IconChevronCompactLeft, IconChevronCompactRight, IconEdit, IconInfoCircle, IconTrash } from '@tabler/icons-react';
import { useServices } from '../../data/hooks/useServices';
import type { Service } from '../../types/Service';
import { Format } from '../../utils/Format';
import { useState } from 'react';

interface ServicesProps {
  selectService?(service: Service): void;
  deleteService(service: Service): void;
}

function Services({ selectService, deleteService }: ServicesProps) {

  const {
    services,
    allServices,
    setOffset,
    limit,
  } = useServices();

  const totalPages = Math.ceil(allServices.length / limit);
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

  function formarHour(hour: string) {
    return `${hour}:00hs`;
  }

  return (
    <section className='services-container'>
      <div className='services'>
        <h2>Serviços cadastrados</h2>
        <div className='table-container'>
          <table className='table-services'>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Preço</th>
                <th>Hora do serviço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <p>Voçê não tem serviços cadastrados</p>
              )
                : services.map((service: Service) => (
                  <tr key={service.service_id}>
                    <td>
                      <span className='cell-header'>Titulo</span>
                      {service.service_title}
                    </td>
                    <td>
                      <span className='cell-header'>Preço</span>
                      {Format.formatPrice(service.price)}
                    </td>
                    <td>
                      <span className='cell-header'>Horário</span>
                      {formarHour(service.start_hour)}
                    </td>
                    <td className='actions'>
                      <span className='cell-header'>Ações</span>
                      <button onClick={() => selectService!(service)}>
                        <IconEdit className='edit' stroke={1} />
                      </button>
                      <button onClick={() => deleteService(service)}>
                        <IconTrash className='del' stroke={1} />
                      </button>
                      <button>
                        <IconInfoCircle stroke={1} className='btn-detail' />
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

export { Services }


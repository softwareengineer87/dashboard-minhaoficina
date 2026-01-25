
import './schedules.css';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { Service } from '../../types/Service';
import { Format } from '../../utils/Format';
import { useServices } from '../../data/hooks/useServices';
import Link from 'next/link';

function Schedules() {

  const { services } = useServices();

  return (
    <section className='schedules-container'>
      <div className='schedules'>
        <h2>Agendamentos</h2>
        <div className='table-container'>
          <table className='table-schedules'>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Hora de inicio</th>
                <th>Hora final</th>
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
                      <span className='cell-header'>Descrição</span>
                      {service.description}
                    </td>
                    <td>
                      <span className='cell-header'>Preço</span>
                      {Format.formatPrice(service.price)}
                    </td>
                    <td>
                      <span className='cell-header'>hora</span>
                      {service.start_hour}
                    </td>
                    <td>
                      <span className='cell-header'>Data</span>
                      {service.start_hour}
                    </td>

                    <td className='actions'>
                      <span className='cell-header'>Ações</span>
                      <Link href='/edit'><IconEdit className='edit' stroke={1} /></Link>
                      <Link href='/delete'><IconTrash className='del' stroke={1} /></Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Link href='/all-schedules' className='link-all'>Ver todos</Link>
        </div>
      </div>
    </section>
  );
}

export { Schedules }


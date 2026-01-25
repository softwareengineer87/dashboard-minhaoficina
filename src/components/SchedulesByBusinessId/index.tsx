'use client';

import './schedules.css';
import { IconChevronCompactLeft, IconChevronCompactRight, IconTrash } from '@tabler/icons-react';
import type { Schedule } from '../../types/Service';
import { Format } from '../../utils/Format';
import { useState } from 'react';
import { useBusiness } from '@/data/hooks/useBusiness';

interface SchedulesByBusinessIdProps {
  deleteSchedule(schedule: Schedule): void;
}

function SchedulesByBusinessId({
  deleteSchedule
}: SchedulesByBusinessIdProps) {

  const {
    schedulesByBusinessId,
    setOffset,
    limit,
  } = useBusiness();

  function transformDate(date: Date) {
    const dt = String(date).split('T')[0];
    const format = new Date(dt);
    return format;
  }

  const totalPages = Math.ceil(schedulesByBusinessId.length / limit);
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
        <div className='table-container'>
          <table className='table-services'>
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora do serviço</th>
                <th>Cliente</th>
                <th>Celular</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {schedulesByBusinessId.length === 0 ? (
                <p>Voçê não tem serviços agendados</p>
              )
                : schedulesByBusinessId.map((schedule: Schedule) => (
                  <tr key={schedule.schedule_id}>
                    <td>
                      <span className='cell-header'>Data</span>
                      {Format.formatDate(transformDate(schedule.schedule_date))}
                    </td>
                    <td>
                      <span className='cell-header'>Hora</span>
                      {formarHour(schedule.schedule_hour)}
                    </td>
                    <td>
                      <span className='cell-header'>Cliente</span>
                      {schedule.name}
                    </td>
                    <td>
                      <span className='cell-header'>Celular</span>
                      {schedule.phone}
                    </td>
                    <td className='actions'>
                      <span className='cell-header'>Ações</span>
                      <button onClick={() => deleteSchedule(schedule)}>
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

export { SchedulesByBusinessId }


import { PaginationModel } from "@/models/PaginationModel";
import {
  IconChevronCompactLeft,
  IconChevronCompactRight
} from "@tabler/icons-react";

interface PaginationProps {
  pagination: PaginationModel;
  changePage(page: number): void;
}

function Pagination({ pagination, changePage }: PaginationProps) {
  return (
    <section className='pagination'>
      {pagination.actualPage >= 2 && (
        <button
          onClick={() => changePage(pagination.actualPage - 1)}
          className='icon'>
          <IconChevronCompactLeft size={25} />
        </button>
      )}
      <div className='numbers'>
        <p
          className='link-all'
          onClick={() => changePage(pagination.prevPage)}>
          {pagination.prevPage !== pagination.actualPage && pagination.prevPage}
        </p>
        <p
          className={`link-all ${pagination.actualPage && 'active'}`}
          onClick={() => changePage(pagination.actualPage)}>
          {pagination.actualPage}
        </p>
        <p
          className={`link-all ${pagination.actualPage === pagination.lastPage && 'active'}`}
          onClick={() => changePage(pagination.nextPage)}>
          {pagination.nextPage !== pagination.actualPage && pagination.nextPage !== 0 && pagination.nextPage}
        </p>
      </div>
      {pagination.actualPage !== pagination.lastPage && (
        <button
          onClick={() => changePage(pagination.actualPage + 1)}
          className='icon'>
          <IconChevronCompactRight size={25} />
        </button>
      )}
    </section>
  );
}

export { Pagination }


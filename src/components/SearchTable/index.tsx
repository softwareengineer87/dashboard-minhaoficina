import { useSearch } from "@/data/hooks/useSearch";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

interface SearchTableProps {
  searchParams: URLSearchParams;
  pathname: any;
  onCallback: (...args: any[]) => void;
}

function SearchTable({
  onCallback,
  searchParams,
  pathname
}: SearchTableProps) {
  const [nameState, setNameState] = useState<string | null>('');
  const { search } = useSearch({
    searchParams,
    pathname,
    onCallback
  });

  return (
    <section className='search-container'>
      <form onSubmit={search}>
        <div className='input-box'>
          <input
            value={nameState!}
            onChange={(e) => setNameState(e.target.value)}
            type='search'
            placeholder='Filtrar pelo nome'
          />
          <IconSearch onClick={search} className='btn-search' size={20} stroke={.5} />
        </div>
      </form>
    </section>
  );
}

export { SearchTable }


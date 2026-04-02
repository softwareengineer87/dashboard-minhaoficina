
import useNote from '@/data/hooks/useNote';
import { Message } from '../Message';
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import Note from '@/models/Note';
import { IconChevronCompactLeft, IconChevronCompactRight, IconSearch, IconTrash } from '@tabler/icons-react';
import { PaginationModel } from '@/models/PaginationModel';
import { Pagination } from '../Pagination';
import { baseURL } from '@/utils/api';
import './notes.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Auth } from '@/data/contexts/Auth';

function Notes() {

  const [notes, setNotes] = useState<Note[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>({} as PaginationModel);
  const [pagePaginate, setPagePaginate] = useState<number>(1);
  const [nameState, setNameState] = useState<string | null>('');
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

  const searchParams = useSearchParams();
  const { push } = useRouter();
  const page = Number(searchParams.get('page'));
  const name = searchParams.get('name');
  const pathname = usePathname();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  async function search(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has('page')) {
      push(`${pathname}?${createQueryString('page', String(pagePaginate))}&${createQueryString('name', nameState!)}`);
    } else {
      push(`${pathname}?${createQueryString('name', nameState!)}`);
    }
    if (name === '') {
      push(`${pathname}`);
    }
    setNameState(name);
    await loadNotes(business.payload?.businessId, pagePaginate, name!);
    setNameState('');
  }

  async function loadNotes(businessId: string, page: number, name?: string) {
    try {
      const convertPage = page === 0 ? 1 : Number(page);
      let response;
      if (name) {
        response = await fetch(`${baseURL}/dashboard/notes/${businessId}?page=${convertPage}&name=${name}`, {
          credentials: 'include'
        });
      } else {
        response = await fetch(`${baseURL}/dashboard/notes/${businessId}?page=${convertPage}`, {
          credentials: 'include'
        });
      }
      if (response.status === 401) {
        handleActiveMessage();
      }
      const data = await response.json();
      setNotes(data.notes);
      setPagination(data.pagination);
    } catch (error: any) {
      console.log(`Erro ao carregar notas: ${error.message}`)
    }
  }

  async function changePage(pageNumber: number) {
    push(`${pathname}?${createQueryString('page', String(pageNumber))}`);
    setPagePaginate(page);
    await loadNotes(business.payload?.businessId, page);
  }

  async function showAll() {
    push(pathname);
    await loadNotes(business.payload?.businessId, pagePaginate);
  }

  useEffect(() => {
    loadNotes(business.payload?.businessId, page, name!);
  }, [notes, name]);

  return (
    <section className='notes-container'>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <div className='notes'>
        <div className='table-container'>
          <div className='header-table'>
            <h2>Notas dos clientes</h2>
            <div className='box-inputs'>
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
              <button onClick={showAll} className='btn-all'>Todas</button>
            </div>
          </div>
          <table className='table-notes'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Modelo</th>
                <th>Kilometragem</th>
                <th>Placa</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(notes).map((note: Note) => (
                <tr key={note.noteId}>
                  <td>
                    <span className='cell-header'>Nome</span>
                    {note.name}
                  </td>
                  <td>
                    <span className='cell-header'>E-mail</span>
                    {note.email}
                  </td>
                  <td>
                    <span className='cell-header'>Celular</span>
                    {note.phone}
                  </td>
                  <td>
                    <span className='cell-header'>Modelo</span>
                    {note.model}
                  </td>
                  <td>
                    <span className='cell-header'>Kilometragem</span>
                    {note.kilometer}
                  </td>
                  <td>
                    <span className='cell-header'>Placa</span>
                    {note.plate}
                  </td>
                  <td className='actions'>
                    <span className='cell-header'>Ações</span>
                    <button onClick={() => { }}>
                      <IconTrash className='del' stroke={1} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          pagination={pagination}
          changePage={changePage}
        />
      </div>
    </section>
  );
}

export { Notes }


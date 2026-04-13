'use client';

import useNote from '@/data/hooks/useNote';
import { Message } from '../Message';
import { useContext, useEffect } from 'react';
import Note from '@/models/Note';
import { IconSearch, IconTrash } from '@tabler/icons-react';
import { Pagination } from '../Pagination';
import './notes.css';
import { Auth } from '@/data/contexts/Auth';
import { useSearch } from '@/data/hooks/useSearch';

function Notes() {

  const { business } = useContext(Auth);

  const {
    notes,
    pagination,
    loadNotes,
    message,
    status,
    activeMessage
  } = useNote();

  const {
    search,
    changePage,
    showAll,
    inputTitle,
    page,
    setInputTitle
  } = useSearch({ loadCb: loadNotes, paramName: 'name' });

  useEffect(() => {
    loadNotes(business.payload?.businessId, page, inputTitle!);
  }, [notes, inputTitle]);

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
                    value={inputTitle!}
                    onChange={(e) => setInputTitle(e.target.value)}
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
              {notes.map((note: Note) => (
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


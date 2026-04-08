
import { Message } from '../Message';
import { useContext, useEffect } from 'react';
import { IconEdit, IconSearch, IconTrash } from '@tabler/icons-react';
import { Pagination } from '../Pagination';
import './notes.css';
import { Auth } from '@/data/contexts/Auth';
import { Stock } from '@/models/Stock';
import { useStock } from '@/data/hooks/useStock';
import { formatPrice } from '@/utils/FormatPrice';
import { useSearch } from '@/data/hooks/useSearch';

function Stocks() {

  const { business } = useContext(Auth);

  const {
    loadStocks,
    stocks,
    pagination,
    message,
    status,
    activeMessage
  } = useStock();

  const {
    search,
    changePage,
    showAll,
    inputTitle,
    page,
    setInputTitle
  } = useSearch(loadStocks, 'title');


  useEffect(() => {
    loadStocks(business.payload?.businessId, page, inputTitle!);
  }, [stocks, inputTitle]);

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
            <h2>Produtos no estoque</h2>
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
                <th>Titulo</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock: Stock) => (
                <tr key={stock.productId}>
                  <td>
                    <span className='cell-header'>Titulo</span>
                    {stock.title}
                  </td>
                  <td>
                    <span className='cell-header'>Preço</span>
                    {formatPrice(Number(stock.price))}
                  </td>
                  <td>
                    <span className='cell-header'>Quantidade</span>
                    {stock.quantity}
                  </td>
                  <td className='actions'>
                    <span className='cell-header'>Ações</span>
                    <button onClick={() => { }}>
                      <IconEdit className='edit' stroke={1} />
                    </button>
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

export { Stocks }


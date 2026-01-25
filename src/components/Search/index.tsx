
import { IconSearch } from '@tabler/icons-react';
import './search.css';
import { useEffect, useState } from 'react';

function Search() {

  const [actualMonth, setActualMonth] = useState<string>('');

  const months = [
    'janeiro',
    'fevereiro',
    'marco',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ];

  function getActualMonth() {
    const month = new Date().getMonth();
    for (let i = 0; i < months.length; i++) {
      if (month === i) {
        setActualMonth(months[i]);
      }
    }
  }

  useEffect(() => {
    getActualMonth();
  }, [actualMonth]);

  return (
    <section className='search-container'>
      <div className='search'>
        <div className='search-left'>
          <p>Dados do mês: </p>
          <select className='months'>
            <option selected >{actualMonth}</option>
            {months.map((month, i) => (
              <option
                key={i}
                value={month}
              >
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className='search-right'>
          <form className='search-form'>
            <div className='box-input'>
              <input
                type='search'
                placeholder='Procurar...'
              />
              <button className='btn-search'>
                <IconSearch
                  size={20}
                  className='icon-search'
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export { Search }


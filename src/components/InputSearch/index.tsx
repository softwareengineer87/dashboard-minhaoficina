
import './input-search.css';
import { InputHTMLAttributes } from 'react';
import { IconSearch } from '@tabler/icons-react';

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  search(): Promise<void>;
  showAll(): void;
}

function InputSearch(props: InputSearchProps) {

  return (
    <section className='serach-container'>
      <form onSubmit={props.search}>
        <div className='input-box'>
          <label>{props.label}</label>
          <input
            type='search'
            {...props}
          />
          <IconSearch onClick={props.search} className='btn-search' size={20} stroke={.5} />
        </div>
      </form>
      <button onClick={props.showAll} className='btn-all'>Todas</button>
    </section>
  );
}

export { InputSearch }

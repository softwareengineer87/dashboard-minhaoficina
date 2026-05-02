import { IconArrowBack } from '@tabler/icons-react';
import './form-stock.css';
import { Stock } from '@/models/Stock';

interface FormStockProps {
  deactive(): void;
  stock: Partial<Stock>;
  changeStock(stock: Partial<Stock>): void;
  save(): void;
}

function FormStock({
  deactive,
  stock,
  changeStock,
  save
}: FormStockProps) {

  return (
    <section className={`
      form-stock-container
    `}>
      <div className='form-stock'>
        <form className='forms'>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='title'>Titulo</label>
              <input
                onChange={(e) => changeStock({ ...stock, title: e.target.value })}
                value={stock.title ?? ''}
                type='text'
                id='title'
                placeholder='Titulo'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='price'>Preço</label>
              <input
                onChange={(e) => changeStock({ ...stock, price: e.target.value })}
                value={stock.price ?? ''}
                type='number'
                id='price'
                placeholder='Preco'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='quantity'>Quantidade</label>
              <input
                onChange={(e) => changeStock({ ...stock, quantity: e.target.value })}
                value={stock.quantity ?? ''}
                type='number'
                id='quantity'
                placeholder='Quantidade'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='quantity'>Estoque minimo</label>
              <input
                onChange={(e) => changeStock({ ...stock, minimum_stock: e.target.value })}
                value={stock.minimum_stock ?? ''}
                type='number'
                id='quantity'
                placeholder='Estoque minimo'
              />
            </div>
          </div>
        </form>

      </div>
      <div className='buttons-form'>
        <button onClick={save} className='btn-save'>Salvar</button>
        <button
          onClick={deactive}
          className='cancell'>
          <IconArrowBack size={20} stroke={2} />
        </button>
      </div>
    </section>
  );
}

export { FormStock }


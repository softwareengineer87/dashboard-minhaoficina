import { useContext, useEffect, useState } from 'react';
import type note from '../../models/Note';
import './form-note.css';
import { Message } from '../Message';
import { IconX } from '@tabler/icons-react';
import { formatPrice } from '@/utils/FormatPrice';
import Note from '../../models/Note';
import useNote from '@/data/hooks/useNote';
import { useStock } from '@/data/hooks/useStock';
import { Stock } from '@/models/Stock';
import { Auth } from '@/data/contexts/Auth';
import { Pagination } from '../Pagination';
import { useSearch } from '@/data/hooks/useSearch';
import { ProductItems } from '@/models/ProductItems';

interface FormNoteProps {
  changeNote(note: note): void;
  note: Note;
  totalPrice: number;
  changeTotal(total: number): void;
  productList: ProductItems[];
  changePart(products: ProductItems[]): void;
}

function FormNote({
  changeNote,
  note,
  totalPrice,
  changeTotal,
  changePart,
}: FormNoteProps) {

  const [quantity, setQuantity] = useState<string>('');
  const [productId, setProductId] = useState<string>('');
  const [productItems, setProductItems] = useState<ProductItems[]>([]);

  const { business } = useContext(Auth);

  const {
    saveNote,
    message,
    status,
    activeMessage,
    setMessage,
    handleActiveMessage,
    setStatus
  } = useNote();

  const {
    loadStocks,
    updateStock,
    stocks,
    pagination
  } = useStock();

  const {
    changePage,
    page,
    inputPage,
    setInputPage,
    inputTitle
  } = useSearch({ loadCb: loadStocks, paramName: 'title' });

  async function handleForm() {
    await saveNote(note);
  }

  function generateId() {
    return Math.random().toString(36).substring(2, 20);
  }

  async function handlePart() {
    handleActiveMessage();
    const stock = stocks.find((s: Stock) => s.product_id === productId);
    if (productId === '') {
      setStatus(false);
      setMessage('Selecione um produto.');
      return;
    }
    if (quantity === '') {
      setStatus(false);
      setMessage('A quantidade precisa ser preenchida e ser maior que zero.');
      return;
    }
    setProductItems([...productItems, {
      productId: stock!.product_id,
      title: stock!.title,
      price: Number(stock!.price),
      quantity: Number(quantity),
      actualQuantity: Number(stock!.quantity)
    }]);

    await updateStock({
      ...stock,
      quantity: String(Number(stock?.quantity) - Number(quantity))
    });

    setStatus(true);
    setMessage(`Produto ${stock!.title} adicionado.`);
    setProductId('');
  }

  async function removePart(productId: string, index: number) {
    handleActiveMessage();
    const productIndex = productItems.findIndex((_, indexPart) => index === indexPart);
    const stock = stocks.find((s: Stock) => s.product_id === productId);

    await updateStock({
      ...stock,
      quantity: String(Number(stock?.quantity) + Number(quantity))
    });

    const newParts = productItems.filter((_, i) => i !== productIndex);
    setProductItems(newParts);
    changeTotal(totalParts());
    setStatus(false);
    setMessage(`Produto removido.`);
  }

  function totalParts() {
    let total: number = 0;
    for (let i = 0; i < productItems.length; i++) {
      total += productItems[i].price * productItems[i].quantity;
    }
    return total;
  }

  useEffect(() => {
    changeTotal(totalParts());
    changePart(productItems);
    loadStocks(business.payload?.businessId, page);
  }, [productItems,
    inputPage,
    setInputPage,
    pagination,
    inputTitle]);

  return (
    <section className={`
      form-note-container
      }
    `}>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <div className='form-note'>
        <form className='forms'>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='name'>E-mail</label>
              <input
                onChange={(e) => changeNote({ ...note, email: e.target.value })}
                value={note.email}
                type='text'
                id='name'
                placeholder='E-mail do cliente'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='name'>Nome</label>
              <input
                onChange={(e) => changeNote({ ...note, name: e.target.value })}
                value={note.name}
                type='text'
                id='name'
                placeholder='Nome do cliente'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='cpf'>CPF</label>
              <input
                onChange={(e) => changeNote({ ...note, cpf: e.target.value })}
                value={note.cpf}
                type='text'
                id='cpf'
                placeholder='CPF do cliente' />
            </div>
            <div className='input-form'>
              <label htmlFor='tel'>Telefone</label>
              <input
                onChange={(e) => changeNote({ ...note, phone: e.target.value })}
                value={note.phone}
                type='text'
                id='tel'
                placeholder='Telefone do cliente'
              />
            </div>
          </div>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='model'>Modelo</label>
              <input
                onChange={(e) => changeNote({ ...note, model: e.target.value })}
                value={note.model}
                type='text'
                id='model'
                placeholder='Modelo do veiculo'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='kilometer'>Kilometragem</label>
              <input
                onChange={(e) => changeNote({ ...note, kilometer: e.target.value })}
                value={note.kilometer}
                type='number'
                id='kilometer'
                placeholder='Kilometragem'
              />
            </div>
          </div>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='plate'>Placa</label>
              <input
                onChange={(e) => changeNote({ ...note, plate: e.target.value })}
                value={note.plate}
                type='text'
                id='plate'
                placeholder='Placa'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='observation'>Observação</label>
              <textarea
                onChange={(e) => changeNote({ ...note, observation: e.target.value })}
                value={note.observation}
                id='plate'
                placeholder='Observação'
              >
              </textarea>
            </div>
            <div className='input-form'>
              <label htmlFor='date'>Data</label>
              <input
                onChange={(e) => changeNote({ ...note, date: e.target.value })}
                value={note.date}
                type='date'
                id='date'
                placeholder='Data'
              />
            </div>
          </div>
        </form>
        <div className='buttons-form'>
          <button onClick={handleForm} className='btn-save'>Salvar nota</button>
        </div>

        <form className='forms'>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='quantity'>Selecione a peça</label>
              <select value={productId} onChange={(e) => setProductId(e.target.value)} className='stock-list'>
                <option disabled selected value=''>Selecione a peça</option>
                {stocks.length === 0 ? (
                  <option disabled>Nenhuma peça cadastrada</option>
                )
                  : stocks.map((stock: Stock) => (
                    <option key={stock.product_id} value={stock.product_id}>{stock.title}</option>
                  ))}
              </select>
            </div>
            <div className='input-form'>
              <label htmlFor='quantity'>Quantidade</label>
              <input
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                type='number'
                id='quantity'
                placeholder='Quantidade de peças'
              />
            </div>
          </div>
        </form>
        {/* <div className='box-inputs'> */}
        {/*   <div className='input-form'> */}
        {/*     <label htmlFor='name'>Nome da peça</label> */}
        {/*     <input */}
        {/*       onChange={(e) => setPartName(e.target.value)} */}
        {/*       value={partName} */}
        {/*       type='text' */}
        {/*       id='name' */}
        {/*       placeholder='Nome da peça' */}
        {/*     /> */}
        {/*   </div> */}
        {/*   <div className='input-form'> */}
        {/*     <label htmlFor='price'>Preço</label> */}
        {/*     <input */}
        {/*       onChange={(e) => setPartPrice(e.target.value)} */}
        {/*       value={partPrice} */}
        {/*       type='number' */}
        {/*       id='price' */}
        {/*       placeholder='Preço' */}
        {/*     /> */}
        {/*   </div> */}
        {/* </div> */}
        <Pagination
          pagination={pagination}
          changePage={changePage}
        />
        <button onClick={handlePart} className='btn-photo'>Adicionar peça</button>

      </div>
      <div className='parts'>
        {productItems.map((product: ProductItems, index: number) => (
          <div className='part' key={product.productId}>
            <h4>{product.title} x{product.quantity}</h4>
            <p>{formatPrice(product.price)}</p>
            <span
              onClick={() => removePart(product.productId, index)}
              className='icon-x'>
              <IconX size={12} />
            </span>
          </div>
        ))}
      </div>
      <p className='total-value'>Total em peças: <h4>{formatPrice(totalPrice)}</h4></p>
    </section>
  );
}

export { FormNote }


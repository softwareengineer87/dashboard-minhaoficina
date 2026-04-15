import { useContext, useEffect, useState } from 'react';
import type note from '../../models/Note';
import './form-note.css';
import { Message } from '../Message';
import { IconX } from '@tabler/icons-react';
import { PartPdf } from '@/models/Part';
import { formatPrice } from '@/utils/FormatPrice';
import Note from '../../models/Note';
import useNote from '@/data/hooks/useNote';
import { useStock } from '@/data/hooks/useStock';
import { Stock } from '@/models/Stock';
import { Auth } from '@/data/contexts/Auth';
import { Pagination } from '../Pagination';
import { useSearch } from '@/data/hooks/useSearch';

interface FormNoteProps {
  changeNote(note: note): void;
  note: Note;
  totalPrice: number;
  changeTotal(total: number): void;
  partList: PartPdf[];
  changePart(parts: PartPdf[]): void;
}

function FormNote({
  changeNote,
  note,
  totalPrice,
  changeTotal,
  changePart,
}: FormNoteProps) {

  const [partName, setPartName] = useState<string>('');
  const [partPrice, setPartPrice] = useState<string>('');
  const [parts, setParts] = useState<PartPdf[]>([]);

  const { business } = useContext(Auth);

  const {
    saveNote,
    message,
    status,
    activeMessage
  } = useNote();

  const {
    loadStocks,
    stocks,
    pagination
  } = useStock();

  const {
    changePage,
    page,
    inputPage,
    setInputPage
  } = useSearch({ loadCb: loadStocks, paramName: 'title' });

  async function handleForm() {
    await saveNote(note);
  }

  function generateId() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  async function handlePart() {
    setParts([...parts, {
      partId: generateId(),
      name: partName,
      price: Number(partPrice)
    }]);
    setPartName('');
    setPartPrice('');
  }

  function removePart(index: number) {
    const partIndex = parts.findIndex((part, indexPart) => index === indexPart);

    const newParts = parts.filter((partFilter, i) => i !== partIndex);
    setParts(newParts);
    changeTotal(totalParts());
  }

  function totalParts() {
    let total: number = 0;
    for (let i = 0; i < parts.length; i++) {
      total += parts[i].price;
    }
    return total;
  }

  useEffect(() => {
    changeTotal(totalParts());
    changePart(parts);
    loadStocks(business.payload?.businessId, page);
  }, [parts, inputPage, setInputPage, pagination]);

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
          <select>
            <option disabled selected value=''>Selecione a peça</option>
            {stocks.map((stock: Stock) => (
              <option key={stock.product_id} value={stock.product_id}>{stock.title}</option>
            ))}
          </select>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='name'>Nome da peça</label>
              <input
                onChange={(e) => setPartName(e.target.value)}
                value={partName}
                type='text'
                id='name'
                placeholder='Nome da peça'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='price'>Preço</label>
              <input
                onChange={(e) => setPartPrice(e.target.value)}
                value={partPrice}
                type='number'
                id='price'
                placeholder='Preço'
              />
            </div>
          </div>
        </form>
        <Pagination
          pagination={pagination}
          changePage={changePage}
        />
        <button onClick={handlePart} className='btn-photo'>Salvar peça</button>

      </div>
      <div className='parts'>
        {parts.map((part: PartPdf, index: number) => (
          <div className='part' key={part.partId}>
            <h4>{part.name}</h4>
            <p>{formatPrice(part.price)}</p>
            <span
              onClick={() => removePart(index)}
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


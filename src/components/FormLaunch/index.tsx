import { FormEvent, useEffect, useState } from 'react';
import type Launch from '../../models/Launch';
import './form-launch.css';
import useLaunch from '../../data/hooks/useLaunch';
import { Message } from '../Message';
import { useRouter } from 'next/navigation';
import { IconX } from '@tabler/icons-react';
import { PartPdf } from '@/models/Part';
import { formatPrice } from '@/utils/FormatPrice';

interface FormLaunchProps {
  changeLaunch(launch: Launch): void;
  launch: Launch;
  totalPrice: number;
  changeTotal(total: number): void;
  partList: PartPdf[];
  changePart(parts: PartPdf[]): void;
}

function Formlaunch({
  changeLaunch,
  launch,
  totalPrice,
  changeTotal,
  changePart,
}: FormLaunchProps) {

  const [file, setFile] = useState(null);
  const [partName, setPartName] = useState<string>('');
  const [partPrice, setPartPrice] = useState<string>('');
  const [parts, setParts] = useState<PartPdf[]>([]);
  const { push } = useRouter();


  const {
    saveLaunch,
    savePhoto,
    savePart,
    loadParts,
    partsList,
    dataPhoto,
    idLaunch,
    message,
    status,
    activeMessage
  } = useLaunch();

  async function handleForm() {
    await saveLaunch(launch);
    changeLaunch({} as Launch);
  }

  function timeMessage() {
    setTimeout(() => {
      setShowMessage(false);
      setMessagePhoto('');
    }, 5000);
  }

  function generateId() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  async function handlePart() {
    //await savePart(partName, Number(partPrice), idLaunch);
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
  }, [parts]);

  return (
    <section className={`
      form-launch-container
      }
    `}>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <div className='form-launch'>
        <form className='forms'>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='name'>Nome</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, name: e.target.value })}
                value={launch.name}
                type='text'
                id='name'
                placeholder='Nome'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='cpf'>CPF</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, cpf: e.target.value })}
                value={launch.cpf}
                type='text'
                id='cpf'
                placeholder='CPF' />
            </div>
            <div className='input-form'>
              <label htmlFor='tel'>Telefone</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, tel: e.target.value })}
                value={launch.tel}
                type='text'
                id='tel'
                placeholder='Telefone'
              />
            </div>
          </div>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='model'>Modelo</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, model: e.target.value })}
                value={launch.model}
                type='text'
                id='model'
                placeholder='Modelo'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='kilometer'>Kilometragem</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, kilometer: e.target.value })}
                value={launch.kilometer}
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
                onChange={(e) => changeLaunch({ ...launch, plate: e.target.value })}
                value={launch.plate}
                type='text'
                id='plate'
                placeholder='Placa'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='observation'>Observação</label>
              <textarea
                onChange={(e) => changeLaunch({ ...launch, observation: e.target.value })}
                value={launch.observation}
                id='plate'
                placeholder='Observação'
              >
              </textarea>
            </div>
            <div className='input-form'>
              <label htmlFor='date'>Data</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, date: e.target.value })}
                value={launch.date}
                type='date'
                id='date'
                placeholder='Data'
              />
            </div>
          </div>
        </form>
        {/*
        <div className='buttons-form'>
          <button onClick={handleForm} className='btn-save'>Salvar nota</button>
          <button
            onClick={() => { }}
            className='cancell'>
            Cancelar
          </button>
        </div>
        */}

        <form className='forms'>
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

export { Formlaunch }


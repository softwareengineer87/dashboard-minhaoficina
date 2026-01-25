
import { IconX } from '@tabler/icons-react';
import './modal-create.css';
import { useServices } from '../../data/hooks/useServices';
import { useState, type FormEvent } from 'react';
import { Message } from '../Message';

interface ModalCreateProps {
  activeModal: boolean;
  setActivemodal(state: boolean): void;
}

function ModalCreateService({ activeModal, setActivemodal }: ModalCreateProps) {

  const {
    saveService,
    message,
    status,
    activeMessage,
    getServices
  } = useServices();

  const [service_title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [start_hour, setStarthour] = useState<string>('');
  const [end_hour, setEndHour] = useState<string>('');

  function redirectTo() {
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }

  async function handleService(e: FormEvent) {
    e.preventDefault();
    const response = await saveService(
      service_title,
      Number(price),
      description
    );
    if (response.ok) {
      setTitle('');
      setDescription('');
      setPrice('');
      setStarthour('');
      setEndHour('');
      setActivemodal(false);
      getServices();
      redirectTo();
    }
  }

  return (
    <>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <section
        className={`modal-create-container ${activeModal ? 'active' : ''}`}
      >
        <IconX
          onClick={() => setActivemodal(false)}
          className='icon-close'
        />
        <div className='modal-create'>
          <h3>Cadastrar serviço</h3>
          <form onSubmit={handleService} className='form-create'>
            <label id='title'>Titulo</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type='text' id='title' value={service_title} placeholder='Titulo do serviço' />
            <label id='description'>Descrição</label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              type='text' id='description' value={description} placeholder='Descrição do serviço' />
            <label id='price'>Valor</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type='text' id='price' value={price} placeholder='Valor do serviço' />
            <label id='start'>hora de inicio</label>
            <input
              onChange={(e) => setStarthour(e.target.value)}
              type='text' id='start' value={start_hour} placeholder='ex: 10:30 ou 10' />
            <label id='end'>Hora final</label>
            <input
              onChange={(e) => setEndHour(e.target.value)}
              type='text' id='end' value={end_hour} placeholder='ex: 11:30 ou 11' />
            <input
              className='btn-create' type='submit' value='Salvar' />
          </form>
        </div>
      </section>
    </>
  );
}

export { ModalCreateService }



import './update-service.css';
import { useServices } from '../../data/hooks/useServices';
import { Message } from '../../components/Message';
import type { Service } from '../../types/Service';

interface UpdateServiceProps {
  service: Service;
  changeService(service: Service): void;
  updateService(): void;
  cancell(): void;
}

function UpdateService({
  service,
  changeService,
  updateService,
  cancell
}: UpdateServiceProps) {

  const {
    message,
    status,
    activeMessage,
  } = useServices();


  return (
    <section
      className={'update-container'}
    >
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <div className='update'>
        <h3>Atualizar serviço</h3>
        <form className='form-update'>
          <div className='box-input'>
            <div className='input-form'>
              <label id='title'>Titulo</label>
              <input
                onChange={(e) =>
                  changeService({ ...service, service_title: e.target.value })
                }
                type='text' id='title' value={service.service_title || ''} placeholder='Titulo do serviço' />
              <label id='price'>Valor</label>
              <input
                onChange={(e) =>
                  changeService({ ...service, price: Number(e.target.value) })
                }
                type='number' id='price' value={service.price || ''} placeholder='Valor do serviço' />
              <label id='hour'>Horário do serviço</label>
              <input
                onChange={(e) =>
                  changeService({ ...service, start_hour: e.target.value })
                }
                type='text' id='hour' value={service.start_hour || ''} placeholder='Horário do serviço' />
            </div>
          </div>
        </form>
        <div className='buttons'>
          <button
            onClick={updateService}
            className='btn-update'
          >
            Salvar
          </button>
          <button onClick={cancell} className='cancell'>Cancelar</button>
        </div>
      </div>
    </section>
  );
}

export { UpdateService }


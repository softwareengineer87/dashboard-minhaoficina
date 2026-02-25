import type { Business } from '../../models/Business';
import './form-business.css';

interface FormBusinessProps {
  showForm: boolean;
  deactive(): void;
  business: Partial<Business>;
  changeBusiness(business: Partial<Business>): void;
  save(): void;
}

function FormBusiness({
  showForm,
  deactive,
  business,
  changeBusiness,
  save
}: FormBusinessProps) {

  return (
    <section className={`
      form-business-container
      ${showForm && 'active'}
    `}>

      <div className='form-business'>
        <form className='forms'>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='name'>Nome</label>
              <input
                onChange={(e) => changeBusiness({ ...business, name: e.target.value })}
                value={business.name || ''}
                type='text'
                id='name'
                placeholder='Nome'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='email'>E-mail</label>
              <input
                onChange={(e) => changeBusiness({ ...business, email: e.target.value })}
                value={business.email || ''}
                type='email'
                id='email'
                placeholder='E-mail'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='password'>Senha</label>
              <input
                onChange={(e) => changeBusiness({ ...business, password: e.target.value })}
                value={business.password || ''}
                type='password'
                id='password'
                required={true}
                placeholder='Deixe em branco para manter a senha atual'
              />
            </div>
          </div>
        </form>
        <div className='buttons-form'>
          <button onClick={save} className='btn-save'>Salvar</button>
          <button
            onClick={deactive}
            className='cancell'>
            Cancelar
          </button>
        </div>

      </div>
    </section>
  );
}

export { FormBusiness }


import type { Business } from '../../models/Business';
import './form-business.css';

interface FormBusinessProps {
  showForm: boolean;
  deactive(): void;
  business: Business;
  changeBusiness(business: Business): void;
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

                type='password'
                id='password'
                required={true}
                placeholder='Senha'
              />
            </div>
          </div>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='city'>Cidade</label>
              <input
                onChange={(e) => changeBusiness({ ...business, city: e.target.value })}
                value={business.city}
                type='text'
                id='city'
                placeholder='Cidade'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='district'>Bairro</label>
              <input
                onChange={(e) => changeBusiness({ ...business, district: e.target.value })}
                value={business.district}
                type='text'
                id='district'
                placeholder='Bairro'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='number'>Nº</label>
              <input
                onChange={(e) => changeBusiness({ ...business, addressNumber: Number(e.target.value) })}
                value={business.addressNumber}
                type='number'
                id='number'
                placeholder='Número'
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


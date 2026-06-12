import { FormChecklist } from '@/components/FormChecklist';
import './checklist.css';

function Checklist() {

  return (
    <section className='checklist-container'>
      <div className='checklist'>
        <p>checklist</p>
        <button
          className='btn-checklist'
        >
          Criar Checklist de entrada
        </button>
        <FormChecklist />
      </div>
    </section>
  );

}

export default Checklist;

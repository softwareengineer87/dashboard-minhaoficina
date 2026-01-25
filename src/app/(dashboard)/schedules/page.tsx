
import { SchedulesByBusinessId } from '@/components/SchedulesByBusinessId';
import './schedules.css';

function Schedules() {

  async function handleDeleteSchedule() {
    'use server';
    console.log('deletou');
  }

  return (
    <section className='schedules-container'>
      <div className='schedules'>
        <h2>Serviços agendados</h2>
        <SchedulesByBusinessId
          deleteSchedule={handleDeleteSchedule}
        />
      </div>
    </section>
  );
}

export default Schedules;


import type { ReactNode } from 'react';
import './statistic.css';

interface StatisticProps {
  total: number | string;
  description: string;
  icon: ReactNode;
}

function StatisticCard({ total, description, icon }: StatisticProps) {
  return (
    <section className="statistic-container">
      <div className="statistic">
        <span className='icon'>{icon}</span>
        <div className='stat-right'>
          <p>{description}</p>
          <h2>{total}</h2>
        </div>
      </div>
    </section>
  );
}

export { StatisticCard }


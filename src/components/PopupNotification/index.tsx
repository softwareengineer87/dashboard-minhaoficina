
import { ReactNode } from 'react';
import './popup.css';

interface PopupNotifiationProps {
  children: ReactNode;
}

function PopupNotifiation({ children }: PopupNotifiationProps) {

  return (
    <section className='popupnotification-container'>
      <div className='popup'>
        <h4>Notificações</h4>
        {children}
      </div>
    </section>
  );

}

export { PopupNotifiation }

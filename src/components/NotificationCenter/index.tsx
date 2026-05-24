
import { IconBell } from '@tabler/icons-react';
import './notification.css';
import { useEffect, useState } from 'react';
import { PopupNotifiation } from '../PopupNotification';
import { useNotification } from '@/data/hooks/useNotificaction';
import { useStock } from '@/data/hooks/useStock';

function NotificationCenter() {

  // const [notifications, setNotifications] = useState<string[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const {
    notifications,
    getNotifications,
    notificationCount
  } = useNotification();


  async function handleNotification() {
    setOpenPopup((state) => !state);
    await getNotifications();
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <section className='notification-center-container'>
      <div onClick={handleNotification} className='notification-center'>
        <div className='count'>
          <p>{notificationCount}</p>
        </div>
        <IconBell className='icon-bell' stroke={1.5} size={30} />
        <div className='popup'>
          {openPopup &&
            <PopupNotifiation>
              <div className='notifications'>
                {notifications && notifications.map((notificaction) => (
                  <p key={notificaction.notification_id}>{notificaction.title}</p>
                ))}
              </div>
            </PopupNotifiation>
          }
        </div>
      </div>
    </section>
  );

}

export { NotificationCenter }


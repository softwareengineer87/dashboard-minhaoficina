
import { IconBell } from '@tabler/icons-react';
import './notification.css';
import { useEffect, useState } from 'react';
import { PopupNotifiation } from '../PopupNotification';
import { useNotification } from '@/data/hooks/useNotificaction';

function NotificationCenter() {

  const [notificationCount, setNotificationCount] = useState<number>(1);
  const [notifications, setNotifications] = useState<string[]>(['ererdfdfd', 'refdgfhgjghhg', 'dfdgg', 'dfdfdf']);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const {
    addNotification,
    getNotifications
  } = useNotification();

  useEffect(() => {
    getNotifications();
    console.log(notifications);
  }, []);

  return (
    <section className='notification-center-container'>
      <div onClick={() => setOpenPopup((state) => !state)} className='notification-center'>
        <div className='count'>
          <p>{notificationCount}</p>
        </div>
        <IconBell className='icon-bell' stroke={1.5} size={30} />
        <div className='popup'>
          {openPopup &&
            <PopupNotifiation>
              <div className='notifications'>
                {notifications && notifications.map((notificaction) => (
                  <p>{notificaction}</p>
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


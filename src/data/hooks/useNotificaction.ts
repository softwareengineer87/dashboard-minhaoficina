import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

function useNotification() {

  const {
    setLocalStorage,
    getLocalStorage,
    deleteLocalStorage
  } = useLocalStorage();

  const [notifications, setNotifications] = useState<string[]>(['ererdfdfd', 'refdgfhgjghhg', 'dfdgg', 'dfdfdf']);

  function addNotification(notification: string) {
    setNotifications([...notifications, notification]);
    setLocalStorage('notifications', notifications);
  }

  function getNotifications() {
    return deleteLocalStorage('notifications');
  }

  useEffect(() => {
    const arrNotifications = getLocalStorage('notifications');
    if (arrNotifications) {
      setNotifications(arrNotifications);
    }
  }, [getLocalStorage]);

  return {
    addNotification,
    getNotifications,
    notifications
  }

}

export { useNotification }


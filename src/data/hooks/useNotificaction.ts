import { useContext, useEffect, useRef, useState } from "react";
import { baseURL } from "@/utils/api";
import { Auth } from "../contexts/Auth";
import { Notification } from "@/models/Notification";
import { useStock } from "./useStock";

function useNotification() {

  const [inputValue, setInputValue] = useState<string>('');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(1);
  const socketRef = useRef<WebSocket | null>(null);

  const {
    stocks
  } = useStock();

  function send() {
    console.log('funcao send...');
    for (const stock of stocks) {
      if (Number(stock.minimum_stock) <= 5) {
        addNotification(`${stock.title} com estoque baixo`);
      }
      console.log(stock);
    }
  }


  useEffect(() => {
    // 1. Criamos a conexão apenas UMA VEZ ao montar o componente
    const socket = new WebSocket('ws://localhost:3333/ws');
    socketRef.current = socket;

    socket.onopen = () => console.log('✅ Conectado ao servidor');

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📩 Mensagem recebida:', data);

        // 2. Adiciona a nova mensagem na lista (mantendo as anteriores)
        setNotifications((prev) => [...prev, { text: data.message.message, isMe: false }]);
        console.log('mensagem do servidor: ', data);
      } catch (e) {
        // Caso o servidor envie texto puro em vez de JSON
        setNotifications((prev) => [...prev, { text: event.data, isMe: false }]);
      }
    };

    // socket.onclose = () => console.log('❌ Conexão encerrada');


    // Limpeza ao fechar a aba/componente
    return () => socket.close();
  }, []);

  async function sendNotification(notification: string) {
    // 3. Verifica se o socket está aberto e se há texto
    if (socketRef.current?.readyState === WebSocket.OPEN && notification) {
      const payload = { message: notification };
      setNotifications((prev) => [...prev, { text: notification, isMe: true }]);

      // Envia para o servidor Elysia
      socketRef.current.send(JSON.stringify(payload));
      await addNotification(notification);

      // Limpa o campo de texto
      setInputValue('');
    }
  }

  const { business } = useContext(Auth);

  async function addNotification(notification: string) {
    await fetch(`${baseURL}/business/notifications/${business.payload?.businessId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: notification
      })
    });
  }

  async function getNotifications() {
    const response = await fetch(`${baseURL}/business/notifications/${business.payload?.businessId}`);
    const notifications = await response.json();
    console.log(notifications);
    setNotifications(notifications);
  }

  useEffect(() => {
    getNotifications();
    setNotificationCount(notifications.length);
    send();
  }, []);

  return {
    addNotification,
    getNotifications,
    sendNotification,
    notifications,
    notificationCount
  }

}

export { useNotification }


import { IconSquareRoundedX } from "@tabler/icons-react";
import './message.css';

interface MessageProps {
  message: string;
  optionalMessage?: string;
  status: boolean;
  activeMessage: boolean;
}

function Message({ message, optionalMessage, status, activeMessage }: MessageProps) {
  return (
    <section
      className={`message__container ${activeMessage ? 'active' : 'close'} ${status ? 'sucess' : 'error'}`}>
      <div className="message">
        <p>{message} - {optionalMessage}</p>
        <span><IconSquareRoundedX /></span>
      </div>
    </section>
  );
}

export { Message }

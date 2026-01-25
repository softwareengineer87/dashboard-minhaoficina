
import Image from 'next/image';
import './bg-login.css';
import BgLoginImage from '../../../public/bg-login.jpg';

function BgLogin() {
  return (
    <section className='bg-login-container'>
      <Image
        src={BgLoginImage}
        fill
        alt='Background login'
      />
    </section>
  );
}

export { BgLogin }


'use client';

import { IconShieldLock } from '@tabler/icons-react';
import './login.css';
import { useContext, useState, type FormEvent } from 'react';
import { Message } from '@/components/Message';
import { Auth } from '@/data/contexts/Auth';
import Image from 'next/image';
import LoginImage from '../../../../public/login.svg';
import { useRouter } from 'next/navigation';

function SignIn() {
  const {
    login,
    message,
    status,
    activeMessage
  } = useContext(Auth);

  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    const response = await login(email, password);
    if (response.ok)
      router.push('/');
  }

  return (
    <section className='login-container container'>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <div className='login'>
        <div className='login-left'>
          <h2>Bem vindo(a) ao Sistema de Agendamentos</h2>
          <Image
            src={LoginImage}
            width={200}
            height={200}
            alt='Imagem login'
          />
          <p>
            Faça seu login para ter acesso ao dashboard
            e as funcionalidades
          </p>
        </div>
        <div className='login-right'>
          <IconShieldLock size={50} className='shield' />
          <form onSubmit={handleLogin} className='form-login'>
            <label htmlFor='email'>E-mail</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              id='email'
              placeholder='E-mail da empresa'
            />
            <label htmlFor='password'>Senha</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              id='password'
              placeholder='Senha da empresa'
            />
            <input
              type='submit'
              className='btn-login'
              value='Fazer login'
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;


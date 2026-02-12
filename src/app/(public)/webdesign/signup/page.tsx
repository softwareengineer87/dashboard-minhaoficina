'use client';

import { IconFile, IconShieldLock } from '@tabler/icons-react';
import './signup.css';
import { useContext, useState, type FormEvent } from 'react';
import { Message } from '@/components/Message';
import Link from 'next/link';
import { Auth } from '@/data/contexts/Auth';
import LoginImage from '../../../../../public/login.svg';
import Image from 'next/image';

function Signup() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [file, setFile] = useState(null);

  const {
    saveBusiness,
    savePhoto,
    message,
    status,
    activeMessage
  } = useContext(Auth);

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    const inputBusiness = {
      name,
      email,
      password,
    }
    await saveBusiness(inputBusiness);
  }

  function changeFile(e: any) {
    if (!e.target.files[0]) return;
    setFile(e.target.files[0]);
  }

  async function handleFile(e: FormEvent) {
    e.preventDefault();
    await savePhoto(file);
  }

  return (
    <section className='signup-container container'>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <div className='signup'>
        <div className='signup-left'>
          <h2>Bem vindo(a) ao Sistema de Agendamentos</h2>
          <Image
            src={LoginImage}
            width={200}
            height={200}
            alt='Imagem login'
          />
          <p>
            Crie sua conta, depois faça login.
          </p>
        </div>
        <div className='signup-right'>
          <IconShieldLock size={50} className='shield' />
          <p>Salve primeiro as informações, depois o logotipo.</p>
          <form onSubmit={handleSignup} className='form-signup'>
            <label htmlFor='name'>Nome</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type='text'
              id='name'
              placeholder='Seu nome'
            />
            <label htmlFor='email'>E-mail</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
              id='email'
              placeholder='E-mail da empresa'
            />
            <label htmlFor='password'>Senha</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              id='password'
              placeholder='Senha da empresa'
            />
            <input
              type='submit'
              className='btn-signup'
              value='Salvar'
            />
          </form>
          <form className='form-photo'>
            <label htmlFor='logo'>Logotipo</label>
            <input
              onChange={changeFile}
              type='file'
              id='logo'
              placeholder='Logotipo'
            />
          </form>
          <button
            onClick={handleFile}
            className='btn-photo'
          >
            <IconFile size={20} stroke={1} />
            <span>Salvar Logo</span>
          </button>
          <p>Já tem uma conta? <Link href='/login'>Fazer login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default Signup;


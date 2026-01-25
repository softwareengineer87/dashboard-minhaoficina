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
  const [cpf, setCpf] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [addressNumber, setAddressNumber] = useState<string>('');
  const [description, setDescription] = useState<string>('');
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
    console.log(name);
    const inputBusiness = {
      name,
      email,
      cpf,
      password,
      city,
      district,
      address_number: addressNumber,
      description
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
            <label htmlFor='email'>CPF</label>
            <input
              onChange={(e) => setCpf(e.target.value)}
              value={cpf}
              type='text'
              id='cpf'
              placeholder='CPF da empresa'
            />
            <label htmlFor='password'>Senha</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              id='password'
              placeholder='Senha da empresa'
            />
            <label htmlFor='city'>Cidade</label>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type='text'
              id='city'
              placeholder='Cidade'
            />
            <label htmlFor='district'>Bairro</label>
            <input
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              type='text'
              id='district'
              placeholder='Bairro'
            />
            <label htmlFor='address-number'>Número do estabelecimento</label>
            <input
              onChange={(e) => setAddressNumber(e.target.value)}
              value={addressNumber}
              type='number'
              id='address-number'
              placeholder='Número do estabelecimento'
            />
            <label htmlFor='description'>Descrição</label>
            <textarea
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id='description'
              placeholder='Uma descrição breve dos serviços que sua empresa presta.'
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


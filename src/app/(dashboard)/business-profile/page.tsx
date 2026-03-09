'use client';

import './profile.css';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Auth } from '@/data/contexts/Auth';
import Image from 'next/image';
import { Business } from '@/models/Business';
import { FormBusiness } from '@/components/FormBusiness';
import { Message } from '@/components/Message';
import { IconUser } from '@tabler/icons-react';
import { baseURL } from '@/utils/api';

function BusinessProfile() {

  const [logo, setLogo] = useState<File | null>(null);
  const [businessDetail, setBusinessDetail] = useState<Business>({} as Business);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [businessForm, setBusinessForm] = useState<Partial<Business> | null>(null);

  const {
    business,
    updateBusiness,
    savePhoto,
    getLogo,
    logoData,
    message,
    status,
    activeMessage
  } = useContext(Auth);

  // async function getPhoto() {
  // const data = await loadPhoto(business.payload?.businessId);
  // setPhoto(data);
  // }
  //
  async function updateLogo() {
    await savePhoto(logo);
  }

  function changeLogo(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    setLogo(e.target.files[0]);
  }

  function deactive() {
    setShowForm(false);
  }

  async function loadBusiness(businesId: string) {
    try {
      const response = await fetch(`${baseURL}/business/getbyid/${businesId}`);
      const data = await response.json();
      if (data) {
        setBusinessDetail(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function changeForm(business: Business) {
    setBusinessForm(business);
    setShowForm(true);
  }

  async function update() {
    await updateBusiness(business.payload.businessId, businessForm);
    setShowForm(false);
    loadBusiness(business.payload.businessId);
  }

  useEffect(() => {
    // getPhoto();
    loadBusiness(business.payload?.businessId);
    getLogo();
  }, [loadBusiness]);

  return (
    <section className='profile-container'>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
      <div className='box-plan'>
        <h2>Perfil da empresa</h2>
        <div className='plan'>
          <p>Seu plano <h3>{businessDetail.plan}</h3></p>
        </div>
      </div>
      {showForm ? (
        <FormBusiness
          showForm={showForm}
          deactive={deactive}
          business={businessForm!}
          changeBusiness={setBusinessForm}
          save={update}
          changeLogo={changeLogo}
          updateLogo={updateLogo}
        />
      ) : (
        <div className='profile'>
          <button
            className='edit-profile'
            onClick={() => changeForm(businessDetail)}
          >
            Editar seus dados
          </button>
          {logoData ? (
            <Image
              src={logoData.url}
              width={300}
              height={150}
              alt='Logotipo da empresa'
              className='image-profile'
            />
          ) : (
            <IconUser size={20} />
          )}
          <div className='info-business'>
            <p><h3>Nome: </h3> {businessDetail.name}</p>
            <p><h3>Email: </h3> {businessDetail.email}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default BusinessProfile;


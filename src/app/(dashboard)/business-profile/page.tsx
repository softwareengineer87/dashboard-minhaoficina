'use client';

import { useBusiness } from '@/data/hooks/useBusiness';
import './profile.css';
import { useContext, useEffect, useState } from 'react';
import { Photo } from '@/types/Photo';
import { Auth } from '@/data/contexts/Auth';
import Image from 'next/image';
import { Business } from '@/models/Business';
import { FormBusiness } from '@/components/FormBusiness';
import { Message } from '@/components/Message';

function BusinessProfile() {

  const [photo, setPhoto] = useState<Photo>({} as Photo);
  const [businessDetail, setBusinessDetail] = useState<Business>({} as Business);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [businessForm, setBusinessForm] = useState<Business>({} as Business);

  const { business } = useContext(Auth);

  const {
    loadPhoto,
    loadBusiness,
    updateBusiness,
    message,
    status,
    activeMessage
  } = useBusiness();

  async function getPhoto() {
    const data = await loadPhoto(business.payload?.businessId);
    setPhoto(data);
  }

  async function getBusinessDetail() {
    const data = await loadBusiness(business.payload?.businessId);
    setBusinessDetail(data);
  }

  async function saveBusiness() {
    await updateBusiness(business.businessId, businessForm);
    setShowForm(false);
  }

  function deactive() {
    setShowForm(false);
  }

  useEffect(() => {
    getPhoto();
    getBusinessDetail();
  }, []);

  useEffect(() => {
    setBusinessForm(businessDetail);
  }, [businessDetail]);

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
      <button
        className='edit-profile'
        onClick={() => setShowForm((state) => !state)}
      >
        Editar perfil
      </button>
      {showForm ? (
        <FormBusiness
          showForm={showForm}
          deactive={deactive}
          business={businessForm}
          changeBusiness={setBusinessForm}
          save={saveBusiness}
        />
      ) : (
        <div className='profile'>
          <Image
            src={photo.url}
            width={300}
            height={150}
            alt='Logotipo da empresa'
            className='image-profile'
          />
          <div className='info-um'>
            <p><h3>Nome: </h3> {businessDetail.name}</p>
            <p><h3>Email: </h3> {businessDetail.email}</p>
            <p><h3>Cidade: </h3> {businessDetail.city}</p>
            <p><h3>Bairro: </h3> {businessDetail.district}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default BusinessProfile;


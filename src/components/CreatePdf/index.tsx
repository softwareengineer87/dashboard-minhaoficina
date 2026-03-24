import generatePDF, { Margin } from 'react-to-pdf';
import type Launch from '../../models/Note';
import { formatPrice } from '@/utils/FormatPrice';
import { PartPdf } from '../../models/Part';
import { useContext, useEffect, useState } from 'react';
import './pdf.css';
import { Auth } from '@/data/contexts/Auth';
import Image from 'next/image';
import { IconUpload } from '@tabler/icons-react';

interface CreatePdfProps {
  data: Launch
  partsList: PartPdf[]
  totalPrice: number
}

function CreatePdf({
  data,
  partsList,
  totalPrice,
}: CreatePdfProps) {
  const getTargetElement = () => document.getElementById('content-id');

  const {
    getLogo,
    business,
    logoData,
    loadBusiness
  } = useContext(Auth);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function changeFile(e: any) {
    if (!e.target.files) return;
    if (e.target.files) {
      const files = e.target.files;
      if (files) {
        const arrayFiles = Array.from(files);
        const urls = arrayFiles.map((file: any) => URL.createObjectURL(file));
        setPreviewImages(urls);
      }
    }
  }

  function renderFormImage() {
    return (
      <form className='forms' encType='multipart/formdata'>
        <div className='input-form'>
          <label
            htmlFor='file'
            className='label-photos'
          >
            <IconUpload />
            Selecionar Fotos
          </label>
          <input
            onChange={changeFile}
            type='file'
            multiple
            accept='image/*'
            name='file'
            id='file'
            className='btn-photos'
          />
        </div>
      </form>
    );
  }

  useEffect(() => {
    loadBusiness(business.payload?.businessId);
    getLogo();
  }, []);

  return (
    <section>
      <div className='pdf-container' id="content-id">
        <h2>Nota do cliente</h2>
        <div className='header-pdf'>
          <div className='top'>
            <h4>{business.payload?.name}</h4>
            <p>{business.payload?.email}</p>
          </div>
          {logoData && (
            <Image
              src={logoData.url}
              width={100}
              height={100}
              objectFit='cover'
              loading='lazy'
              alt='Logotipo da empresa'
              className='image-pdf'
            />
          )}
        </div>
        <ul>
          <li>
            {renderFormImage()}
            {previewImages.map((url, i) => (
              <Image
                src={url}
                width={100}
                height={100}
                objectFit='cover'
                loading='lazy'
                className='preview-image'
                alt='Imagem'
              />
            ))}
            <div className='infos'>
              <p>Cliente: <strong>{data.name}</strong></p>
              <p>CPF: <strong>{data.cpf}</strong></p>
              <p>Telefone: <strong>{data.phone}</strong></p>
              <p>Data do lançamento: <strong>{data.date}</strong></p>
              <p>Modelo do veiculo: <strong>{data.model}</strong></p>
              <p>Kilometragem: <strong>{data.kilometer}</strong></p>
              <p>Placa: <strong>{data.plate}</strong></p>
              <p>Observação: {data.observation}</p>
            </div>
          </li>
        </ul>
        <div className='parts'>
          <h3>peças e serviços</h3>
          <ul>
            {partsList.map((part) => (
              <li className='part' key={part.partId}>
                <p>{part.name}</p>
                <span>{formatPrice(part.price)}</span>
              </li>
            ))}
            <h5>Valor total: <strong className='text-red-700'>{formatPrice(totalPrice)}</strong></h5>
          </ul>
        </div>
      </div>
      <button
        className='btn-pdf'
        onClick={() => generatePDF(getTargetElement, {
          filename: `note-${data.name}.pdf`,
          page: {
            margin: Margin.SMALL,
            orientation: 'landscape',
          }
        })}>
        Gerar PDF
      </button>
    </section>
  );
}

export default CreatePdf;

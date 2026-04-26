'use client';

import { useState } from 'react';
import './create.css';
import CreatePdf from '@/components/CreatePdf';
import { PartPdf } from '@/models/Part';
import { FormNote } from '@/components/FormNote';
import Note from '@/models/Note';
import { ProductItems } from '@/models/ProductItems';

function CreateLaunch() {

  const [note, setNote] = useState<Note>({} as Note);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productList, setProductList] = useState<ProductItems[]>([]);

  return (
    <section className='launch-container'>
      <h2>Criar lançamento</h2>
      <div className='launch'>
        <div className='box-form'>
          <FormNote
            note={note}
            changeNote={setNote}
            totalPrice={totalPrice}
            changeTotal={setTotalPrice}
            productList={productList}
            changePart={setProductList}
          />
        </div>
        <div className='box-pdf'>
          <CreatePdf
            data={note}
            productList={productList}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </section>
  );
}

export default CreateLaunch;


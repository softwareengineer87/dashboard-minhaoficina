'use client';

import { useState } from 'react';
import './create.css';
import CreatePdf from '@/components/CreatePdf';
import { PartPdf } from '@/models/Part';
import { FormNote } from '@/components/FormNote';
import Note from '@/models/Note';

function CreateLaunch() {

  const [note, setNote] = useState<Note>({} as Note);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [partList, setPartList] = useState<PartPdf[]>([]);

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
            partList={partList}
            changePart={setPartList}
          />
        </div>
        <div className='box-pdf'>
          <CreatePdf
            data={note}
            partsList={partList}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </section>
  );
}

export default CreateLaunch;


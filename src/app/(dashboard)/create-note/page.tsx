'use client';

import { useState } from 'react';
import './create.css';
import Launch from '@/models/Launch';
import { Formlaunch } from '@/components/FormLaunch';
import CreatePdf from '@/components/CreatePdf';
import { PartPdf } from '@/models/Part';

function CreateLaunch() {

  const [launch, setLaunch] = useState<Launch>({} as Launch);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [partList, setPartList] = useState<PartPdf[]>([]);

  return (
    <section className='launch-container'>
      <h2>Criar lançamento</h2>
      <div className='launch'>
        <div className='box-form'>
          <Formlaunch
            launch={launch}
            changeLaunch={setLaunch}
            totalPrice={totalPrice}
            changeTotal={setTotalPrice}
            partList={partList}
            changePart={setPartList}
          />
        </div>
        <div className='box-pdf'>
          <CreatePdf
            data={launch}
            partsList={partList}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </section>
  );
}

export default CreateLaunch;


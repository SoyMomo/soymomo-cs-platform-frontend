import * as React from 'react';

export default function WearerMainCard(props) {
  const wearer = props.wearer || {};

  const {
    firstName = '',
    lastName = '',
    phone = '',
    imei = '',
    hardwareModel = '',
  } = wearer;


  return (
    <div className="flex bg-gradient-to-b from-purple-custom1 to-purple-custom2 rounded-3xl shadow-sm p-4 mb-4 w-full justify-between">
        <div className='ms-4 flex'>
            <img src="/images/cs-SoyMomoLogoRound.svg" alt="SoyMomo Icon" />
            <div className="flex flex-col justify-center ms-8">
                <h1 className="text-2xl font-bold text-start text-white">{firstName} {lastName}</h1>
                <p className="text-sm text-start text-white">{phone}</p>
                <p className="text-sm text-start text-white">Imei: {imei}</p>
                <p className="text-sm text-start text-white">{hardwareModel}</p>
            </div>
        </div>
        <img src="/images/cs-defaultWatchModelShadow.svg" alt="SoyMomo default watch model" className='me-32 mb-2' />
    </div>
  );
}

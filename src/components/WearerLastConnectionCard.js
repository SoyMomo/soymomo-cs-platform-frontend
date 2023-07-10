import * as React from 'react';
import CardHeader from './CardHeader';

export default function WearerLastConnectionCard(props) {
  const lastTKQ = props.lastTKQ || { iso: '' };

  return (
    <CardHeader
      title={props.title}
      subtitle={props.subtitle}
      handleRefresh={props.handleRefresh}
    >
        <div className="bg-purple-custom3 rounded-md shadow-sm p-4 w-full">
            <p className="text-sm text-start text-white">Este imei se encuentra activo hasta: <span className='text-white font-bold'>{lastTKQ?.iso}</span></p>
        </div>
    </CardHeader>
  );
}

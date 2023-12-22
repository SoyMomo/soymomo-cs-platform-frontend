import * as React from 'react';
import CardHeader from './CardHeader';
import WearerInfoRow from './WearerInfoRow';
import formatISODate from '../utils/formater';


export default function WearerInfo(props) {
  const wearer = props.wearer || {};

  const {
    firstName = '',
    lastName = '',
    phone = '',
    lastKnownLocation = { latitude: '', longitude: '' },
    lastLocationTime = { iso: '' },
    lastTKQ = { iso: '' },
    batterySaveInUse = 'False',
    GPSMode = '',
    batteryPercentage = '',
  } = wearer;

  return (
    <CardHeader
      title={props.title}
      subtitle={props.subtitle}
      leftIcon={props.leftIcon}
      leftIconWidth={props.leftIconWidth}
      leftIconHeight={props.leftIconHeight}
      handleRefresh={props.handleRefresh}
    >
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoUser.svg"
        label="Nombre"
        value={`${firstName} ${lastName}`}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoSim.svg"
        label="Telefono"
        value={phone}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoWorld.svg"
        label="Últimas coordenadas"
        value={`(${lastKnownLocation?.latitude}, ${lastKnownLocation?.longitude})`}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoCalendar.svg"
        label="Última actualización coordenadas"
        value={formatISODate(lastLocationTime?.iso)}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoGps.svg"
        label="Modo GPS"
        value={GPSMode}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoBattery.svg"
        label="Batería"
        value={batteryPercentage}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoConnection.svg"
        label="Última conexión"
        value={formatISODate(lastTKQ?.iso)}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoSaveBattery.svg"
        label="Modo ahorro de batería (sin GPS)"
        value={batterySaveInUse.toString()}
      />
    </CardHeader>
  );
}

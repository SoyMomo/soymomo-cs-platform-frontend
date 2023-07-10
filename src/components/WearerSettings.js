import * as React from 'react';
import CardHeader from './CardHeader';
import WearerInfoRow from './WearerInfoRow';

export default function WearerSettings(props) {
  const watchSettings = props.watchSettings || {};

  const {
    timeZone = 'undefined',
    amPm = 'undefined',
    autoAnswer = 'undefined',
    soundMode = 'undefined',
    language = 'undefined',
    dialpadEnabled = 'undefined',
    GPSMode = 'undefined',
    batterySaveInUse = 'undefined',
  } = watchSettings;

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
        label="Modo GPS"
        value={GPSMode}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoSim.svg"
        label="Formato de Hora"
        value={amPm === false ? '24h' : '12h'}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoWorld.svg"
        label="Contestado automático"
        value={autoAnswer.toString()}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoCalendar.svg"
        label="Modo de sonido"
        value={soundMode} // You might need to format this date
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoGps.svg"
        label="Idioma"
        value={language}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoBattery.svg"
        label="Zona horaria"
        value={timeZone}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoConnection.svg"
        label="Teclado"
        value={dialpadEnabled.toString()}
      />
      <WearerInfoRow
        iconSrc="/images/cs-wearerInfoSaveBattery.svg"
        label="Modo ahorro de batería"
        value={batterySaveInUse.toString()}
      />
    </CardHeader>
  );
}

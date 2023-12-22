import * as React from 'react';
import styles from './WearerMainCard.module.css';


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
    <div className={styles.generalContainer}>
        <div className={styles.leftContainer}>
            <img src="/images/cs-SoyMomoLogoRound.svg" alt="SoyMomo Icon" />
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{firstName} {lastName}</h1>
                <p className={styles.hardwareDesc}>{phone}</p>
                <p className={styles.hardwareDesc}>Imei: {imei}</p>
                <p className={styles.hardwareDesc}>{hardwareModel}</p>
            </div>
        </div>
        <img src="/images/cs-defaultWatchModelShadow.svg" alt="SoyMomo default watch model" className={styles.image} />
    </div>
  );
}

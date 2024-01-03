import * as React from 'react';
import styles from '../styles/WearerMainCard.module.css';


export default function WearerSIMCard(props) {
  const wearer = props.wearer || {};

  const {
    firstName = '',
    lastName = '',
    phone = '',
    imei = '',
    hardwareModel = '',
  } = wearer;

  // TODO: Cambiar variable por prop recibida
  const state = 'vinculada';


  return (
    <div className={styles.generalContainer}>
        <div className={styles.firstRow}>
            <div className={styles.textContainer}>
                <h1 className={styles.name}>SoyMomo SIM</h1>
                <p className={styles.hardwareDesc}>{state}</p>
            </div>
            <img src="/images/cs-simCard.svg" alt="SoyMomo Icon" />
        </div>
        <div className={styles.secondRow}>
            {/* TODO: boton */}
        </div>
        <img src="/images/cs-defaultWatchModelShadow.svg" alt="SoyMomo default watch model" className={styles.image} />
    </div>
  );
}
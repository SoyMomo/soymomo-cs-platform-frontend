import * as React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/WearerSIMCard.module.css';


export default function WearerSIMCard(props) {
  const simCard = props.simCard || {};

  const {
    planName = 'Null',
    providerName = 'Null',
    phone = 'Null',
    state = 'Null',
  } = simCard;
  console.log(planName)

  // TODO: Cambiar variable por prop recibida


  return (
    <div className={styles.generalContainer}>
        <div className={styles.firstRow}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>SoyMomo SIM</h1>
                {/* <span className={styles.verticalSpace}/> */}
                <p className={styles.hardwareDesc}>
                  <strong>Plan:</strong>   {simCard.planName ? planName : <p className={styles.missingInfo}>Null</p>}
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>msisdn:</strong>   {simCard.phone ?
                    phone :
                    <p className={styles.missingInfo}>Null</p>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Proveedor:</strong>   {simCard.providerName ?
                    providerName :
                    <p className={styles.missingInfo}>Null</p>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Estado:</strong>   {simCard.state ?
                    state :
                    <p className={styles.missingInfo}>Null</p>
                  }
                </p>
                {/* <p className={styles.hardwareDesc}><strong>Estado:</strong>   {state}</p>
                <p className={styles.hardwareDesc}><strong>Plan:</strong> {planName}</p>
                <p className={styles.hardwareDesc}><strong>Proveedor:</strong> {providerName}</p> */}
            </div>
            <div className={styles.imgContainer}>
                <img src="/images/cs-simCard.svg" alt="SoyMomo Icon" className={styles.image} />
            </div>
        </div>
        <div className={styles.secondRow}>
            {/* TODO: boton */}
            {/* <button className={styles.btn}><strong>Ver Info</strong></button> */}
        </div>
    </div>
  );
}

WearerSIMCard.propTypes = {
  simCard: PropTypes.shape({
    planName: PropTypes.string,
    providerName: PropTypes.string,
    phone: PropTypes.string,
    state: PropTypes.string,
  }),
};
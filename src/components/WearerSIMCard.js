import * as React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/WearerSIMCard.module.css';
// import sharedStyles from '../styles/Common.module.css'


export default function WearerSIMCard(props) {
  const simCard = props.simCard || {};

  const {
    planName = 'Null',
    providerName = 'Null',
    phone = 'Null',
    state = 'Null',
    networkProvider = 'Null',
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
                <p className={styles.hardwareDesc}>
                  <strong>Compañía telefónica:</strong>   {simCard.networkProvider ?
                    networkProvider :
                    <p className={styles.missingInfo}>Null</p>
                  }
                </p>
                {/* <p className={styles.hardwareDesc}><strong>Estado:</strong>   {state}</p>
                <p className={styles.hardwareDesc}><strong>Plan:</strong> {planName}</p>
                <p className={styles.hardwareDesc}><strong>Proveedor:</strong> {providerName}</p> */}
            </div>
            <div className={styles.rightCol}>
              <div className={styles.refreshSuperContainer}>
                <div onClick={props.handleRefresh} className={styles.refreshContainer}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" className={styles.refreshImg} alt='Refresh Logo' />
                </div>
              </div>
              <div className={styles.imgContainer}>
                  <img src="/images/cs-simCard.svg" alt="SoyMomo Icon" className={styles.image} />
              </div>
            </div>
        </div>
        <div className={styles.secondRow}>
          <div className={styles.btnsSubset}>
            <button className={styles.btn}><strong>Cancelar Suscripción</strong></button>
            <button className={styles.btn}><strong>Reset Suscripción</strong></button>
          </div>
          <div className={styles.btnsSubset}>
            <button className={styles.btn}><strong>Pausar Suscripción</strong></button>
            <button className={styles.btn}><strong>Ver Info</strong></button>
          </div>
          <div className={styles.btnsSubset}>
            <button className={styles.btn}><strong>Ver Info</strong></button>
            <button className={styles.btn}><strong>Ver Info</strong></button>
          </div>
            {/* TODO: boton */}
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
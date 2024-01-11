import * as React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/WearerSIMCard.module.css';
// import sharedStyles from '../styles/Common.module.css'


export default function SimWearerCard(props) {
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
        <div className={styles.firstRow}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Soy Momo Watch</h1>
                {/* <span className={styles.verticalSpace}/> */}
                <p className={styles.hardwareDesc}>
                  <strong>Nombre:</strong>   {firstName ? firstName : <span className={styles.missingInfo}>Null</span>}
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Apellido:</strong>   {lastName ? lastName : <span className={styles.missingInfo}>Null</span>}
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Teléfono:</strong>   {phone ?
                    phone :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>imei:</strong>   {imei ?
                    imei :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Modelo Reloj:</strong>   {hardwareModel ?
                    hardwareModel :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                {/* <p className={styles.hardwareDesc}>
                  <strong>Compañía telefónica:</strong>   {simCard.networkProvider ?
                    networkProvider :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p> */}
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
                  <img src="/images/cs-defaultWatchModel.svg" alt="SoyMomo Icon" className={styles.image} />
              </div>
            </div>
        </div>
        <div className={styles.secondRow}>
          <button onClick={props.navWearerDashboard} className={styles.btn}><strong>Ver Info</strong></button>
{/* 
          <div className={styles.btnsSubset}>
            <button className={styles.btn}><strong>Cancelar Suscripción</strong></button>
            <button className={styles.btn}><strong>Reset Suscripción</strong></button>
          </div>
          <div className={styles.btnsSubset}>
            <button className={styles.btn}><strong>Pausar Suscripción</strong></button>
            <button onClick={props.navSimDashboard} className={styles.btn}><strong>Ver Info</strong></button>
          </div>
          <div className={styles.btnsSubset}>
            <button className={styles.btn}><strong>Ver Info</strong></button>
            <button className={styles.btn}><strong>Ver Info</strong></button>
          </div> */}
            {/* TODO: boton */}
        </div>
    </div>
  );
}

SimWearerCard.propTypes = {
  simCard: PropTypes.shape({
    planName: PropTypes.string,
    providerName: PropTypes.string,
    phone: PropTypes.string,
    state: PropTypes.string,
  }),
};
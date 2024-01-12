import * as React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/SimMainCard.module.css';
import { useNavigate } from 'react-router-dom';
// import sharedStyles from '../styles/Common.module.css'


export default function SimMainCard(props) {
  const simCard = props.simCard || {};

  const navigate = useNavigate();


  const {
    iccId = 'Null',
    plan = 'Null',
    providerName = 'Null',
    phone = 'Null',
    state = 'Null',
    networkProvider = 'Null',
    paymentProvider = 'Null',
  } = simCard;
  
  let planName;

  if (plan != 'Null') {
    planName = plan.title
  }
  
  return (
    <div className={styles.generalContainer}>
        <div className={styles.firstRow}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>SoyMomo SIM</h1>
                {/* <span className={styles.verticalSpace}/> */}
                <p className={styles.hardwareDesc}>
                  <strong>iccId:</strong>   {simCard.iccId ? iccId : <span className={styles.missingInfo}>Null</span>}
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Plan:</strong>   {plan != 'Null' ? planName : <span className={styles.missingInfo}>Null</span>}
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>msisdn:</strong>   {simCard.phone ?
                    phone :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Proveedor:</strong>   {simCard.providerName ?
                    providerName :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Estado:</strong>   {simCard.state ?
                    state :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Compañía telefónica:</strong>   {simCard.networkProvider ?
                    networkProvider :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Compañía de Pagos:</strong>   {simCard.paymentProvider ?
                    paymentProvider :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <button onClick={() => navigate(-1)} className={styles.btn}>Volver atras</button>
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
        {/* <div className={styles.secondRow}>
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
        </div> */}
    </div>
  );
}

SimMainCard.propTypes = {
  simCard: PropTypes.shape({
    planName: PropTypes.string,
    providerName: PropTypes.string,
    phone: PropTypes.string,
    state: PropTypes.string,
  }),
};
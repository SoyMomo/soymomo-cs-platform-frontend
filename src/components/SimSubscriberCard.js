import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/SimPlanCard.module.css';
import sharedStyles from '../styles/Common.module.css'
// import sharedStyles from '../styles/Common.module.css'


export default function SimSubscriberCard(props) {
  const simCard = props.simCard || {};
  const [rut, setRut] = useState('')

  const { subscriber = {} } = simCard

  const {
    name = null,
    lastname = null,
    city = null,
    phone = null,
    email = null,
    personalId = null,
  } = subscriber;

  useEffect(() => {
    // Format personalId (rut)
    if (personalId) {
      if (personalId.slice(-2,-1) !== '-') {
        setRut(personalId.slice(0,-1) + '-' + personalId.slice(-1));
      } else {
        setRut(personalId);
      }
    }
  }, [personalId])

  return (
    <div className={sharedStyles.generalCard}>
        <div className={styles.firstRow}>
            <div className={styles.textContainer}>
                <h1 className={sharedStyles.iconTitle}>Suscriptor</h1>
                <br/>
                {/* <span className={styles.verticalSpace}/> */}
                <p className={styles.hardwareDesc}>
                  <strong>Nombre:</strong>   {name ?
                    name :
                    <span className={styles.missingInfo}>Null</span>}
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Apellido:</strong>   {lastname ?
                    lastname :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Ciudad:</strong>   {city ?
                    city :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                    {/* TODO: Preguntar que es esto */}
                  <strong>Telefono:</strong>   {phone ?
                    phone :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Email:</strong>   {email ?
                    email :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Rut:</strong>   {rut ?
                    rut :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
            </div>
            <div className={styles.rightCol}>
              <div className={styles.refreshSuperContainer}>
                <div onClick={props.handleRefresh} className={sharedStyles.refreshContainer}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" className={styles.refreshImg} alt='Refresh Logo' />
                </div>
              </div>
              {/* <div className={styles.imgContainer}>
                  <img src="/images/cs-simCard.svg" alt="SoyMomo Icon" className={styles.image} />
              </div> */}
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

SimSubscriberCard.propTypes = {
  simCard: PropTypes.shape({
    planName: PropTypes.string,
    providerName: PropTypes.string,
    phone: PropTypes.string,
    state: PropTypes.string,
  }),
};
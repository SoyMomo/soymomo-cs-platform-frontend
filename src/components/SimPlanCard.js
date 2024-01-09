import * as React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/SimPlanCard.module.css';
import sharedStyles from '../styles/Common.module.css'
// import sharedStyles from '../styles/Common.module.css'


export default function SimPlanCard(props) {
  const simCard = props.simCard || {};

  const { plan = {}, remainingTrialDays = 0 } = simCard

  const {
    title = 'Null',
    data = 'Null',
    // trialDays = 'Null',
    totalVoice = 'Null',
    totalData = 'Null',
    isActive = 'Null',
    calls = 'Null',
    // billingPeriodType = 'Null',
    sms = 'Null',
    // TODO: Preguntar que es esto
    // priceStrike = 'Null',
    billingPeriod = 'Null',
    warranty = 'Null',
    price = 'Null',
  } = plan;



  return (
    <div className={sharedStyles.generalCard}>
        <div className={styles.firstRow}>
            <div className={styles.textContainer}>
                <h1 className={sharedStyles.iconTitle}>Plan Asociado a SIM</h1>
                <br/>
                {/* <span className={styles.verticalSpace}/> */}
                <p className={styles.hardwareDesc}>
                  <strong>Plan:</strong>   {plan.title ?
                    title :
                    <span className={styles.missingInfo}>Null</span>}
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Datos:</strong>   {plan.data ?
                    data :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Días de prueba restantes:</strong>   {remainingTrialDays != 0 ?
                    remainingTrialDays :
                    <span className={styles.missingInfo}>0</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                    {/* TODO: Preguntar que es esto */}
                  <strong>total Voice:</strong>   {plan.totalVoice ?
                    totalVoice :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Total Datos:</strong>   {plan.totalData ?
                    totalData :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Activo:</strong>   {plan.isActive ?
                    isActive.toString() :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Llamadas:</strong>   {plan.calls ?
                    calls :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Modalidad Cobro:</strong>   {plan.billingPeriod ?
                    billingPeriod :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>SMS:</strong>   {plan.sms ?
                    sms :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Garantía:</strong>   {plan.warranty ?
                    warranty :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                <p className={styles.hardwareDesc}>
                  <strong>Precio:</strong>   {plan.price ?
                    price :
                    <span className={styles.missingInfo}>Null</span>
                  }
                </p>
                {/* <p className={styles.hardwareDesc}><strong>Estado:</strong>   {state}</p>
                <p className={styles.hardwareDesc}><strong>Plan:</strong> {planName}</p>
                <p className={styles.hardwareDesc}><strong>Proveedor:</strong> {providerName}</p> */}
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

SimPlanCard.propTypes = {
  simCard: PropTypes.shape({
    planName: PropTypes.string,
    providerName: PropTypes.string,
    phone: PropTypes.string,
    state: PropTypes.string,
  }),
};
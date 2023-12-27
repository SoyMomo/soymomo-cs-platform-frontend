import * as React from 'react';
import CardHeader from './CardHeader';
import styles from '../styles/WearerLastConnectionCard.module.css'
import formatISODate from '../utils/formater';

export default function WearerLastConnectionCard(props) {
  const lastTKQ = props.lastTKQ || { iso: '' };

  return (
    <CardHeader
      title={props.title}
      subtitle={props.subtitle}
      handleRefresh={props.handleRefresh}
    >
        <div className={styles.textContainer}>
            <p className={styles.text}>Este imei se encuentra activo hasta: <span className={styles.variable}>{formatISODate(lastTKQ?.iso)}</span></p>
        </div>
    </CardHeader>
  );
}

import * as React from 'react';
import styles from '../styles/WearerInfoRow.module.css';

export default function WearerInfoRow({ iconSrc, label, value }) {
    return (
        <div className={styles.generalContainer}>
            <img src={iconSrc} alt={`${label} Icon`} />
            <div className={styles.textContainer}>
                <h3 className={styles.title}>{label}:</h3>
                <p className={styles.subTitle}>{value}</p>
            </div>
        </div>
    )
}

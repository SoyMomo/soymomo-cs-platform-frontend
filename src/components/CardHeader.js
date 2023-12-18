import * as React from 'react';
import styles from '../styles/CardHeader.module.css';
import sharedStyles from '../styles/Common.module.css'

export default function CardHeader(props) {

    return (
        <div className={sharedStyles.generalCard}>
            <div className={sharedStyles.cardSubContainer}>
                <div className={sharedStyles.flexCenter}>
                    {props.leftIcon && (
                            <div className={sharedStyles.iconContainer}>
                                <img src={props.leftIcon} width={props.leftIconWidth} height={props.leftIconHeight} alt='SoyMomo Logo' />
                            </div>
                        )}
                    <div className={sharedStyles.flexAndCol}>
                        <h1 className={sharedStyles.iconTitle}>{props.title}</h1>
                        <p className={sharedStyles.iconSubTitle}>{props.subtitle}</p>
                    </div>
                </div>
                <div onClick={props.handleRefresh} className={styles.refreshBtn}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" className={styles.refreshImg} alt='Refresh Logo' />
                </div>
            </div>
            <div className={sharedStyles.metaData}>
                {props.children}
            </div>
        </div>
    )
}
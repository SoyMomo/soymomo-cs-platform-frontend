import * as React from 'react';
import styles from '../styles/ListItem.module.css'
// import sharedStyles from '../styles/Common.module.css'


export function SimListItem(props) {

    const { objectId,
            iccId,
            name,
            lastname,
            phone,
            personalId,
			handleClick
    } = props

    return (
        <div className={styles.row} onClick={handleClick}>
            {objectId ?
                <div className={styles.itemInfo}>
                    <p className={styles.infoTxt}>{objectId}</p>
                </div> :
                <div className={styles.undefinedContainer}>
                    <p className={styles.undefined}>No definido</p>
                </div>
            }
            {iccId ?
                <div className={styles.itemInfo}>
                    <p className={styles.infoTxt}>{iccId}</p>
                </div> :
                <div className={styles.undefinedContainer}>
                    <p className={styles.undefined}>No definido</p>
                </div>
            }
            {name ?
                <div className={styles.itemInfo}>
                    <p className={styles.infoTxt}>{name}</p>
                </div> :
                <div className={styles.undefinedContainer}>
                    <p className={styles.undefined}>No definido</p>
                </div>
            }
            {lastname ?
                <div className={styles.itemInfo}>
                    <p className={styles.infoTxt}>{lastname}</p>
                </div> :
                <div className={styles.undefinedContainer}>
                    <p className={styles.undefined}>No definido</p>
                </div>
            }
            {personalId ?
                <div className={styles.itemInfo}>
                    <p className={styles.infoTxt}>{personalId}</p>
                </div> :
                <div className={styles.undefinedContainer}>
                    <p className={styles.undefined}>No definido</p>
                </div>
            }
            {phone ?
                <div className={styles.itemInfo}>
                    <p className={styles.infoTxt}>{phone}</p>
                </div> :
                <div className={styles.undefinedContainer}>
                    <p className={styles.undefined}>No definido</p>
                </div>
            }
        </div>
    )
}

export function SimListTitle() {

    return (
        <div className={styles.titleRow}>
            <div className={styles.titleContainer}>
                <p className={styles.titleTxt}>Object ID</p>
            </div>
            <div className={styles.titleContainer}>
                <p className={styles.titleTxt}>iccId</p>
            </div>
            <div className={styles.titleContainer}>
                <p className={styles.titleTxt}>Nombre</p>
            </div>
            <div className={styles.titleContainer}>
                <p className={styles.titleTxt}>Apellido</p>
            </div>
            <div className={styles.titleContainer}>
                <p className={styles.titleTxt}>personalId</p>
            </div>
            <div className={styles.titleContainer}>
                <p className={styles.titleTxt}>N° Telefono</p>
            </div>

        </div>
    )
}
import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'antd';
import { useAuth } from "../authContext";
import styles from "../styles/SimActionsCard.module.css"
import sharedStyles from "../styles/Common.module.css"
// import { FaChevronRight } from "react-icons/fa";

export default function SimActionsCard(props) {
    const [terminateActive, setTerminateActive] = useState(false);
    const [subPaused, setSubPaused] = useState(false);
    const [toggleTerminateModal, setToggleTerminateModal] = useState(false);
    const [togglePauseModal, setTogglePauseModal] = useState(false);
    const { tokens } = useAuth();

    // TODO: Se necesita lógica extra para determinar si una suscripción está pausada
    // Tal vez con el estado de la sub baste
    const {
        iccId,
        subscriptionId='',
        openMessageApi,
        leftIcon,
        leftIconWidth,
        leftIconHeight
    } = props
    // const subscriptionId = alaiSubscriptionId

    if (subscriptionId) {
        setTerminateActive(true);
    }

    // --------- Terminate Functions ---------
    // #region
    const showTerminateModal = () => {
        setToggleTerminateModal(true)
    }

    const handleTerminateOk = () => {
        handleTerminateSub()
        setToggleTerminateModal(false)
        // TODO: Sería bueno tener un feedback de si el terminate tuvo éxito
    }

    const handleTerminateCancel = () => {
        setToggleTerminateModal(false)
    }

    
    async function handleTerminateSub() {
        if (!subscriptionId && !iccId) {
            openMessageApi('Id suscripción e iccId inexistentes', 'error')
        } else {
            const terminatePayload = { subscriptionId, iccId }
            const response = await axios.post(
                // TODO: Implementar endpoint en backend
                process.env.REACT_APP_BACKEND_HOST + '/subscription/stop',
                terminatePayload,
                {
                    headers:
                        { Authorization: `Bearer ${tokens.AccessToken}` }
                }
            );
            if (response.status === 201) {
                setTerminateActive(false)
            } else {
                // TODO: Revisar si se devuelve un message en error. (desde watch cloud)
                // TODO: Implementar manejo de error en backend
                openMessageApi(`Error: ${response.message}`, 'error')
            }
        }
    }
    // #endregion
    // --------- End Terminate Functions ---------

    // --------- Pause Functions ---------s
    // #region
    const showPauseModal = () => {
        setTogglePauseModal(true)
    }

    const handlePauseOk = () => {
        handlePauseSub()
        setTogglePauseModal(false)
        // TODO: Sería bueno tener un feedback de si el pause tuvo éxito
    }

    const handlePauseCancel = () => {
        setTogglePauseModal(false)
    }

    
    async function handlePauseSub() {
        if (!subscriptionId && !iccId) {
            openMessageApi('Id suscripción e iccId inexistentes', 'error')
        } else {
            const pausePayload = { subscriptionId, iccId }
            const response = await axios.post(
                // TODO: Implementar endpoint en backend
                process.env.REACT_APP_BACKEND_HOST + '/subscription/pause',
                pausePayload,
                {
                    headers:
                        { Authorization: `Bearer ${tokens.AccessToken}` }
                }
            );
            if (response.status === 201) {
                setSubPaused(!subPaused)
            } else {
                // TODO: Revisar si se devuelve un message en error. (desde watch cloud)
                // TODO: Implementar manejo de error en backend
                openMessageApi(`Error: ${response.message}`, 'error')
            }
        }
    }
    // #endregion
    // --------- End Pause Functions ---------

    return (
        <div className={styles.generalContainer}>
            <div className={sharedStyles.generalCard}>
                <div className={sharedStyles.cardSubContainer}>
                    <div className={sharedStyles.flexCenter}>
                        <div className={sharedStyles.iconContainer}>
                            <img src={leftIcon} width={leftIconWidth} height={leftIconHeight} alt='SoyMomo Logo' />
                        </div>
                        <div className={sharedStyles.flexAndCol}>
                            <h1 className={sharedStyles.iconTitle}>Comandos SIM</h1>
                            <p className={sharedStyles.iconSubTitle}>Ejecutar</p>
                        </div>
                    </div>
                </div>
                <div className={sharedStyles.metaData}>
                    <button disabled={!terminateActive} onClick={showTerminateModal} className={styles.shutDownBtn}><strong>Cancelar Suscripción</strong></button>
                    {/* TODO: hacer condición para que sea un toggle dependiendo de si la suscripción está pausada o no */}
                    <button disabled={!terminateActive} onClick={showPauseModal} className={styles.shutDownBtn}><strong>Pausar Suscripción</strong></button>
                    <Modal
                        title="Cancelar Suscripción"
                        open={toggleTerminateModal}
                        onOk={handleTerminateOk}
                        onCancel={handleTerminateCancel}
                        okButtonProps={{ className: styles.okBtn }}
                        cancelButtonProps={{ className: styles.cancelBtn }}
                        className="my-custom-modal-class"
                    >
                        Estás seguro/a que quieres cancelar la suscripción? Esta acción no se puede deshacer.
                    </Modal>
                    <Modal
                        title="Pausar Suscripción"
                        open={togglePauseModal}
                        onOk={handlePauseOk}
                        onCancel={handlePauseCancel}
                        okButtonProps={{ className: styles.okBtn }}
                        cancelButtonProps={{ className: styles.cancelBtn }}
                        className="my-custom-modal-class"
                    >
                        Estás seguro/a que quieres pausar la suscripción?
                    </Modal>
                </div>
            </div>
        </div>
    )
}


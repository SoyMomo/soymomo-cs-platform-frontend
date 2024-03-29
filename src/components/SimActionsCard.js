import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Input } from 'antd';
import { useAuth } from "../authContext";
import styles from "../styles/SimActionsCard.module.css"
import sharedStyles from "../styles/Common.module.css"


export default function SimActionsCard(props) {
    const [subTerminated, setSubTerminated] = useState(false);
    const [subPaused, setSubPaused] = useState(false);
    const [toggleTerminateModal, setToggleTerminateModal] = useState(false);
    const [togglePauseModal, setTogglePauseModal] = useState(false);
    const [cancelSubExpl, setCancelSubExpl] = useState('');
    const { tokens } = useAuth();

    const { TextArea } = Input;

    const {
        openMessageApi,
        simCard,
    } = props

    const {
        iccId,
        subscriptionId='',
        state='',
        providerName=''
    } = simCard

    const leftIcon = '/images/cs-comands.svg';
    const leftIconHeight = 24;
    const leftIconWidth = 24;

    useEffect(() => {
        console.log(props)
        if (providerName !== 'ALAI' && providerName !== 'GIGS' && providerName !== "ENTEL") {
            setSubTerminated(true);
        } else if ((subscriptionId || providerName == "ENTEL") && state === 'TERMINATED') {
            setSubTerminated(true);
        } else if ((subscriptionId || providerName == "ENTEL") && state === 'SUSPENDED') {
            setSubTerminated(false);
            setSubPaused(true);
        } else if (!subscriptionId && providerName !== "ENTEL") {
            setSubTerminated(true);
        } else {
            setSubTerminated(false);
        }
    }, [subscriptionId, state, simCard])

    // --------- Terminate Functions ---------
    // #region
    const showTerminateModal = () => {
        setToggleTerminateModal(true)
    }

    const handleTerminateOk = () => {
        handleTerminateSub()
        setToggleTerminateModal(false)
    }

    const handleTerminateCancel = () => {
        setToggleTerminateModal(false)
    }

    
    async function handleTerminateSub() {
        try {
            openMessageApi('Loading...', 'loading');
            if (!subscriptionId && !iccId) {
                openMessageApi('Id suscripción e iccId inexistentes', 'error')
            } else {
                const terminatePayload = { iccId, reason: cancelSubExpl }
                const response = await axios.put(
                    process.env.REACT_APP_BACKEND_HOST + '/subscription/terminate',
                    terminatePayload,
                    {
                        headers:
                            { Authorization: `Bearer ${tokens.AccessToken}` }
                    }
                );
                if (response.status === 201) {
                    setSubTerminated(true)
                    openMessageApi('Success!', 'success');
                } else {
                    openMessageApi(`${response.message}`, 'error')
                }
            }
        } catch (error) {
            openMessageApi(`${error.message}`, 'error')
        }
    }
    // #endregion
    // --------- End Terminate Functions ---------

    // --------- Pause Functions ---------
    // #region
    const showPauseModal = () => {
        setTogglePauseModal(true)
    }

    async function handlePauseOk() {
        await handlePauseSub()
        setTogglePauseModal(false)
    }

    const handlePauseCancel = () => {
        setTogglePauseModal(false)
    }

    
    async function handlePauseSub() {
        try {
            openMessageApi('Loading...', 'loading');
            if (!subscriptionId && !iccId) {
                openMessageApi('Id suscripción e iccId inexistentes', 'error')
            } else {
                let path;
                if (subPaused || subTerminated) {
                    path = '/subscription/resume';
                } else {
                    path = '/subscription/pause';
                }
                const pausePayload = { iccId }
                const response = await axios.put(
                    process.env.REACT_APP_BACKEND_HOST + path,
                    pausePayload,
                    {
                        headers:
                            { Authorization: `Bearer ${tokens.AccessToken}` }
                    }
                );
                if (response.status === 201) {
                    setSubPaused(false)
                    setSubTerminated(false)
                    openMessageApi('Success!', 'success');
                } else {
                    openMessageApi(`${response.message}`, 'error')
                }
            }
        } catch (error) {
            openMessageApi(`${error.message}`, 'error')
        }
    }
    // #endregion
    // --------- End Pause Functions ---------

    const handleChangeCancelExpl = (e) => {
        setCancelSubExpl(e.target.value)
    }

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
                    {
                        !subTerminated ?
                        <button disabled={subTerminated || subPaused} onClick={showTerminateModal} className={styles.shutDownBtn}><strong>Cancelar Suscripción</strong></button>
                        : null
                    }
                    {
                    subTerminated && providerName === "ENTEL" ? 
                        <button disabled={subTerminated && providerName !== "ENTEL"} onClick={showPauseModal} className={styles.pausedBtn}><strong> Reanudar Suscripción</strong></button> : null
                    }
                    {
                        !subPaused && providerName !== "ENTEL" ? 
                        <button disabled={subTerminated} onClick={showPauseModal} className={styles.shutDownBtn}><strong>Pausar Suscripción</strong></button> : null
                    }
                    <Modal
                        title="Cancelar Suscripción"
                        open={toggleTerminateModal}
                        onOk={handleTerminateOk}
                        onCancel={handleTerminateCancel}
                        okButtonProps={{
                            className: styles.okBtn,
                            disabled: !cancelSubExpl
                        }}
                        cancelButtonProps={{ className: styles.cancelBtn }}
                        className="my-custom-modal-class"
                    >
                        Estás seguro/a que quieres cancelar la suscripción? Esta acción no se puede deshacer.
                        <br/>
                        Escribe una justificación de la cancelación:
                        <TextArea
                            rows={4}
                            placeholder="Justificación de la cancelación"
                            onChange={handleChangeCancelExpl}
                            value={cancelSubExpl}
                            className={styles.textArea}
                        />
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
                        {
                            subPaused || subTerminated ? 'Estás seguro/a que quieres reanudar la suscripción?' : 'Estás seguro/a que quieres pausar la suscripción?'
                        }
                    </Modal>
                </div>
            </div>
        </div>
    )
}


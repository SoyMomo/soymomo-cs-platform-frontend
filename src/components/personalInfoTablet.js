import { Modal, Input, Button, message } from 'antd';
import { useState } from 'react';
import { useAuth } from "../authContext";
import { updateTablet, updateParentalControlSettings } from '../services/tabletService';
import styles from '../styles/personalInfoTablet.module.css'
import sharedStyles from '../styles/Common.module.css'


export default function PersonalInfoTablet(Props) {
    const personalInfo = Props.personalInfo;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [type, setType] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const { tokens } = useAuth();

    async function handleName() {
        setInputValue(personalInfo.profileName)
        setIsModalVisible(true);
        setType('name');
    }

    function handleEmail() {
        setInputValue(personalInfo.recoveryEmail)
        setIsModalVisible(true);
        setType('email');
    }

    function handlePin() {
        setInputValue(personalInfo.pin)
        setIsModalVisible(true);
        setType('pin');
    }

    async function handleInternetNavigation() {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
        try {
            const browserAllowed = !Props.personalInfo.browserAllowed
            const parentalControlSettings = {
                browserAllowed
            }
            const response = await updateParentalControlSettings({ hid: Props.hid, parentalControlSettings, token: tokens.AccessToken });
            if (response) {
                Props.setTablet(response);
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'Loaded!',
                    duration: 2,
                    });
            } else {
                messageApi.open({
                    key,
                    type: 'error',
                    content: 'Error updating tablet!',
                    duration: 2,
                    });
            }
        } catch(error) {
            messageApi.open({
                key,
                type: 'error',
                content: 'Error updating tablet!',
                duration: 2,
                });
        }
    }

    
    async function handleRemoteBlocked() {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
          try {
            const remoteBlocked = !Props.personalInfo.remoteBlocked
            const parentalControlSettings = {
                remoteBlocked
            }
            const response = await updateParentalControlSettings({ hid: Props.hid, parentalControlSettings, token: tokens.AccessToken });
            if (response) {
                Props.setTablet(response);
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'Loaded!',
                    duration: 2,
                    });
            } else {
                messageApi.open({
                    key,
                    type: 'error',
                    content: 'Error updating tablet!',
                    duration: 2,
                    });
            }
          } catch(error) {
            messageApi.open({
                key,
                type: 'error',
                content: 'Error updating tablet!',
                duration: 2,
                });
          }
      }

    async function handleDetectionAlgorithm() {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
          try {
            const smartDetectionEnabled = !Props.personalInfo.smartDetectionEnabled
            const parentalControlSettings = {
                smartDetectionEnabled
            }
            const response = await updateParentalControlSettings({ hid: Props.hid, parentalControlSettings, token: tokens.AccessToken });
            if (response) {
                Props.setTablet(response);
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'Loaded!',
                    duration: 2,
                    });
            } else {
                messageApi.open({
                    key,
                    type: 'error',
                    content: 'Error updating tablet!',
                    duration: 2,
                    });
            }
          } catch(error) {
            messageApi.open({
                key,
                type: 'error',
                content: 'Error updating tablet!',
                duration: 2,
                });
          }
    }

    async function handleCyberbullying() {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
          try {
            const profanityDetectionEnabled = !Props.personalInfo.profanityDetectionEnabled
            const parentalControlSettings = {
                profanityDetectionEnabled
            }
            const response = await updateParentalControlSettings({ hid: Props.hid, parentalControlSettings, token: tokens.AccessToken });
            if (response) {
                Props.setTablet(response);
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'Loaded!',
                    duration: 2,
                    });
            } else {
                messageApi.open({
                    key,
                    type: 'error',
                    content: 'Error updating tablet!',
                    duration: 2,
                    });
            }
          } catch(error) {
            messageApi.open({
                key,
                type: 'error',
                content: 'Error updating tablet!',
                duration: 2,
                });
          }
    }
    
    const handleOk = async () => {
        setIsModalVisible(false);
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
        try {
            if (type === 'name') {
                const response = await updateTablet({ hid: Props.hid, profileName: inputValue, recoveryEmail: null, pin: null, token: tokens.AccessToken});
                if (response) {
                    Props.setTablet(response);
                }
            } else if (type === 'email') {
                const response = await updateTablet({ hid: Props.hid, profileName: null, recoveryEmail: inputValue, pin: null, token: tokens.AccessToken});
                if (response) {
                    Props.setTablet(response);
                }
            } else if (type === 'pin') {
                const response = await updateTablet({ hid: Props.hid, profileName: null, recoveryEmail: null, pin: inputValue, token: tokens.AccessToken});
                if (response) {
                    Props.setTablet(response);
                }
            }
            messageApi.open({
                key,
                type: 'success',
                content: 'Loaded!',
                duration: 2,
                });
        } catch(error) {
            messageApi.open({
                key,
                type: 'error',
                content: 'Error updating tablet!',
                duration: 2,
                });
        }
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    return (
        <>
        {contextHolder}
        <Modal title="Basic Modal"  onOk={handleOk} onCancel={handleCancel} open={isModalVisible}  footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" style={styles.submitBtn} onClick={handleOk}>
            OK
          </Button>,
        ]}>
            <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </Modal>
        <div className={styles.generalContainer}>
            <div className={sharedStyles.cardSubContainer}>
                <div className={sharedStyles.flexCenter}>
                    <div className={sharedStyles.imgContainer}>
                        <img src="/images/tableIcons/cs-infoPrincipal.svg" width={23} height={23} alt='SoyMomo Logo' />
                    </div>
                    <div className={sharedStyles.flexAndCol}>
                        <h1 style={styles.title}>Datos personales</h1>
                        <p style={styles.subtitle}>Tablet</p>
                    </div>
                </div>
                <div style={sharedStyles.refreshContainer} onClick={Props.handleRefresh}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" style={sharedStyles.refreshImg} alt='SoyMomo Logo' />
                </div>
            </div>
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeaderStyle}>Datos principales</th>
                            <th style={styles.tableHeaderStyle}></th>
                            <th style={styles.tableHeaderStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.tableCellStyle}>Nombre:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.profileName}</td>
                            <td style={styles.tableCellStyle}><button onClick={handleName} style={{borderRadius: '1rem', backgroundColor: 'lightgray', color: '#22478E', padding: '0.25rem', width: '100px', marginTop: '0.5rem' }}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>Email de recuperación:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.recoveryEmail}</td>
                            <td style={styles.tableCellStyle}><button onClick={handleEmail} style={{borderRadius: '1rem', backgroundColor: 'lightgray', color: '#22478E', padding: '0.25rem', width: '100px', marginTop: '0.5rem' }}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>PIN:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.pin}</td>
                            <td style={styles.tableCellStyle}><button onClick={handlePin} style={{borderRadius: '1rem', backgroundColor: 'lightgray', color: '#22478E', padding: '0.25rem', width: '100px', marginTop: '0.5rem' }}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>Modelo de Tablet</td>
                            <td style={styles.tableCellStyle}>{personalInfo.hardwareModel}</td>
                            <td style={styles.tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>Versión software</td>
                            <td style={styles.tableCellStyle}>{personalInfo.versionName}</td>
                            <td style={styles.tableCellStyle}></td>
                        </tr>
                        {/* <tr>
                            <td style={styles.tableCellStyle}>País</td>
                            <td style={styles.tableCellStyle}>{personalInfo.country}</td>
                            <td style={styles.tableCellStyle}></td>
                        </tr> */}
                        <tr>
                            <td style={styles.tableCellStyle}>Navegación internet:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.browserAllowed ? "Si" : "No"}</td>
                            <td style={styles.tableCellStyle}><button onClick={handleInternetNavigation} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>Bloqueo remoto:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.remoteBlocked ? "Si" : "No"}</td>
                            <td style={styles.tableCellStyle}><button onClick={handleRemoteBlocked} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>Algoritmo de detección:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.smartDetectionEnabled ? "Si" : "No"}</td>
                            <td style={styles.tableCellStyle}><button onClick={handleDetectionAlgorithm} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>Detección de cyberbulling:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.profanityDetectionEnabled ? "Si" : "No"}</td>
                            <td style={styles.tableCellStyle}><button onClick={handleCyberbullying} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>Ingreso a BD:</td>

                            <td style={styles.tableCellStyle}>{personalInfo.updatedAt}</td>
                            <td style={styles.tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>Última modificación:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.updatedAt}</td>

                            <td style={styles.tableCellStyle}></td>
                        </tr>
                        {/* <tr>
                            <td style={styles.tableCellStyle}>Último envío de Stats:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.lastStats}</td>
                            <td style={styles.tableCellStyle}></td>
                        </tr> */}
                        <tr>
                            <td style={styles.tableCellStyle}>Cumpleaños:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.kidBirthday?.iso ?? "Not data"}</td>
                            <td style={styles.tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>Fabricante hardware:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.hardwareManufacturer}</td>
                            <td style={styles.tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={styles.tableCellStyle}>Brand de hardware:</td>
                            <td style={styles.tableCellStyle}>{personalInfo.hardwareBrand}</td>
                            <td style={styles.tableCellStyle}></td>
                        </tr>
                        {/* <tr>
                            <td style={styles.tableCellStyle}>Salud de la batería</td>
                            <td style={styles.tableCellStyle}>{personalInfo.battery}</td>
                            <td style={styles.tableCellStyle}></td>
                        </tr> */}

                    </tbody>
                </table>

            </div>
        </div>
        </>
    )
}
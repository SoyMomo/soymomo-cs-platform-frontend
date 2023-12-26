import { Modal, Input, Button, message } from 'antd';
import { useState } from 'react';
import { useAuth } from "../authContext";
import { updateTablet, updateParentalControlSettings } from '../services/tabletService';
import styles from '../styles/personalInfoTablet.module.css'
import sharedStyles from '../styles/Common.module.css'
import formatISODate from '../utils/formater';


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
          <Button key="submit" type="primary" className={styles.submitBtn} onClick={handleOk}>
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
                        <h1 className={styles.title}>Datos personales</h1>
                        <p className={styles.subtitle}>Tablet</p>
                    </div>
                </div>
                <div className={sharedStyles.refreshContainer} onClick={Props.handleRefresh}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" className={sharedStyles.refreshImg} alt='SoyMomo Logo' />
                </div>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeaderStyle}>Datos principales</th>
                            <th className={styles.tableHeaderStyle}></th>
                            <th className={styles.tableHeaderStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={styles.tableCellStyle}>Nombre:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.profileName}</td>
                            <td className={styles.tableCellStyle}><button onClick={handleName} className={styles.modBtn}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>Email de recuperación:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.recoveryEmail}</td>
                            <td className={styles.tableCellStyle}><button onClick={handleEmail} className={styles.modBtn}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>PIN:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.pin}</td>
                            <td className={styles.tableCellStyle}><button onClick={handlePin} className={styles.modBtn}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>Modelo de Tablet</td>
                            <td className={styles.tableCellStyle}>{personalInfo.hardwareModel}</td>
                            <td className={styles.tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>Versión software</td>
                            <td className={styles.tableCellStyle}>{personalInfo.versionName}</td>
                            <td className={styles.tableCellStyle}></td>
                        </tr>
                        {/* <tr>
                            <td className={styles.tableCellStyle}>País</td>
                            <td className={styles.tableCellStyle}>{personalInfo.country}</td>
                            <td className={styles.tableCellStyle}></td>
                        </tr> */}
                        <tr>
                            <td className={styles.tableCellStyle}>Navegación internet:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.browserAllowed ? "Si" : "No"}</td>
                            <td className={styles.tableCellStyle}><button onClick={handleInternetNavigation} className={styles.deactivateBtn}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>Bloqueo remoto:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.remoteBlocked ? "Si" : "No"}</td>
                            <td className={styles.tableCellStyle}><button onClick={handleRemoteBlocked} className={styles.deactivateBtn}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>Algoritmo de detección:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.smartDetectionEnabled ? "Si" : "No"}</td>
                            <td className={styles.tableCellStyle}><button onClick={handleDetectionAlgorithm} className={styles.deactivateBtn}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>Detección de cyberbulling:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.profanityDetectionEnabled ? "Si" : "No"}</td>
                            <td className={styles.tableCellStyle}><button onClick={handleCyberbullying} className={styles.deactivateBtn}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>Ingreso a BD:</td>

                            <td className={styles.tableCellStyle}>{personalInfo.updatedAt}</td>
                            <td className={styles.tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>Última modificación:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.updatedAt}</td>

                            <td className={styles.tableCellStyle}></td>
                        </tr>
                        {/* <tr>
                            <td className={styles.tableCellStyle}>Último envío de Stats:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.lastStats}</td>
                            <td className={styles.tableCellStyle}></td>
                        </tr> */}
                        <tr>
                            <td className={styles.tableCellStyle}>Cumpleaños:</td>
                            <td className={styles.tableCellStyle}>{formatISODate(personalInfo.kidBirthday?.iso)}</td>
                            <td className={styles.tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>Fabricante hardware:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.hardwareManufacturer}</td>
                            <td className={styles.tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td className={styles.tableCellStyle}>Brand de hardware:</td>
                            <td className={styles.tableCellStyle}>{personalInfo.hardwareBrand}</td>
                            <td className={styles.tableCellStyle}></td>
                        </tr>
                        {/* <tr>
                            <td className={styles.tableCellStyle}>Salud de la batería</td>
                            <td className={styles.tableCellStyle}>{personalInfo.battery}</td>
                            <td className={styles.tableCellStyle}></td>
                        </tr> */}

                    </tbody>
                </table>

            </div>
        </div>
        </>
    )
}
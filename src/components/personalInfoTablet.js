import { Modal, Input, Button, message } from 'antd';
import { useState } from 'react';
import { useAuth } from "../authContext";
import { updateTablet, updateParentalControlSettings } from '../services/tabletService';

const tableHeaderStyle = {
    padding: '12px 16px',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    textAlign: 'left',
    borderBottom: '1px solid #e8e8e8',
};

const tableCellStyle = {
    padding: '10px 16px',
    borderBottom: '1px solid #e8e8e8',
    textAlign: 'left',
};

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
          <Button key="submit" type="primary" style={{backgroundColor: 'blue', color: 'white'}} onClick={handleOk}>
            OK
          </Button>,
        ]}>
            <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </Modal>
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', marginBottom: '0.625rem', Width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '1rem' }}>
                        <img src="/images/tableIcons/cs-infoPrincipal.svg" width={23} height={23} alt='SoyMomo Logo' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#603BB0', marginLeft: '0.75rem' }}>Datos personales</h1>
                        <p style={{ fontSize: '0.875rem', color: '#603BB0', alignSelf: 'flex-start', marginLeft: '0.75rem' }}>Tablet</p>
                    </div>
                </div>
                <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '0.5rem 1rem', cursor: 'pointer' }} onClick={Props.handleRefresh}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" width={16} height={16} alt='SoyMomo Logo' />
                </div>
            </div>
            <div style={{ maxWidth: '100%', marginTop: '0.75rem', display: "flex", flexWrap: 'wrap' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Datos principales</th>
                            <th style={tableHeaderStyle}></th>
                            <th style={tableHeaderStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={tableCellStyle}>Nombre:</td>
                            <td style={tableCellStyle}>{personalInfo.profileName}</td>
                            <td style={tableCellStyle}><button onClick={handleName} style={{borderRadius: '1rem', backgroundColor: 'lightgray', color: '#22478E', padding: '0.25rem', width: '100px', marginTop: '0.5rem' }}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Email de recuperación:</td>
                            <td style={tableCellStyle}>{personalInfo.recoveryEmail}</td>
                            <td style={tableCellStyle}><button onClick={handleEmail} style={{borderRadius: '1rem', backgroundColor: 'lightgray', color: '#22478E', padding: '0.25rem', width: '100px', marginTop: '0.5rem' }}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>PIN:</td>
                            <td style={tableCellStyle}>{personalInfo.pin}</td>
                            <td style={tableCellStyle}><button onClick={handlePin} style={{borderRadius: '1rem', backgroundColor: 'lightgray', color: '#22478E', padding: '0.25rem', width: '100px', marginTop: '0.5rem' }}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Modelo de Tablet</td>
                            <td style={tableCellStyle}>{personalInfo.hardwareModel}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Versión software</td>
                            <td style={tableCellStyle}>{personalInfo.versionName}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        {/* <tr>
                            <td style={tableCellStyle}>País</td>
                            <td style={tableCellStyle}>{personalInfo.country}</td>
                            <td style={tableCellStyle}></td>
                        </tr> */}
                        <tr>
                            <td style={tableCellStyle}>Navegación internet:</td>
                            <td style={tableCellStyle}>{personalInfo.browserAllowed ? "Si" : "No"}</td>
                            <td style={tableCellStyle}><button onClick={handleInternetNavigation} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Bloqueo remoto:</td>
                            <td style={tableCellStyle}>{personalInfo.remoteBlocked ? "Si" : "No"}</td>
                            <td style={tableCellStyle}><button onClick={handleRemoteBlocked} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Algoritmo de detección:</td>
                            <td style={tableCellStyle}>{personalInfo.smartDetectionEnabled ? "Si" : "No"}</td>
                            <td style={tableCellStyle}><button onClick={handleDetectionAlgorithm} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Detección de cyberbulling:</td>
                            <td style={tableCellStyle}>{personalInfo.profanityDetectionEnabled ? "Si" : "No"}</td>
                            <td style={tableCellStyle}><button onClick={handleCyberbullying} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Ingreso a BD:</td>

                            <td style={tableCellStyle}>{personalInfo.updatedAt}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Última modificación:</td>
                            <td style={tableCellStyle}>{personalInfo.updatedAt}</td>

                            <td style={tableCellStyle}></td>
                        </tr>
                        {/* <tr>
                            <td style={tableCellStyle}>Último envío de Stats:</td>
                            <td style={tableCellStyle}>{personalInfo.lastStats}</td>
                            <td style={tableCellStyle}></td>
                        </tr> */}
                        <tr>
                            <td style={tableCellStyle}>Cumpleaños:</td>
                            <td style={tableCellStyle}>{personalInfo.kidBirthday?.iso ?? "Not data"}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Fabricante hardware:</td>
                            <td style={tableCellStyle}>{personalInfo.hardwareManufacturer}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Brand de hardware:</td>
                            <td style={tableCellStyle}>{personalInfo.hardwareBrand}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        {/* <tr>
                            <td style={tableCellStyle}>Salud de la batería</td>
                            <td style={tableCellStyle}>{personalInfo.battery}</td>
                            <td style={tableCellStyle}></td>
                        </tr> */}

                    </tbody>
                </table>

            </div>
        </div>
        </>
    )
}
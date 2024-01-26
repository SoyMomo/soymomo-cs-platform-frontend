import React, { useState } from 'react';
import axios from 'axios';
import { Space, Modal, Select } from 'antd';
import { useAuth } from "../authContext";
import styles from "../styles/Commands.module.css"
import sharedStyles from "../styles/Common.module.css"
import { FaChevronRight } from "react-icons/fa";


export default function ComandsComponent(props) {

    // const [sendLoading, setSendLoading] = useState(false);
    const [message, setMessage] = useState('')

    // const [messageApi, contextHolder] = message.useMessage();
    const [tcpMsg, setTcpMsg] = useState(null);
    const [toggleResetModal, setToggleResetModal] = useState(false);
    const [toggleShutdownModal, setToggleShutdownModal] = useState(false);
    // const [tcpParamValues, setTcpParamValues] = useState(['', '']);
    const [tcpParam1, setTcpParam1] = useState('');
    const [tcpParam2, setTcpParam2] = useState('');
    const [tcpRequiredParams, setTcpRequiredParams] = useState([]);
    const { tokens } = useAuth();
    const { Option } = Select;

    const tcpParamValues = [tcpParam1, tcpParam2];

    const {
        openMessageApi,
        imei,
        leftIcon,
        leftIconWidth,
        leftIconHeight,
        title,
        subtitle,
        resetWatch,
        tcpOptions,
    } = props

    let { deviceId='' } = props

    const options = tcpOptions;

    const showResetModal = () => {
        setToggleResetModal(true)
    }

    const handleResetOk = () => {
        resetWatch(deviceId, imei);
        setToggleResetModal(false)
        // TODO: Sería bueno tener un feedback de si el reset tuvo éxito
    }

    const handleResetCancel = () => {
        setToggleResetModal(false)
    }

    const showShutdownModal = () => {
        setToggleShutdownModal(true)
    }

    const handleShutdownOk = () => {
        shutDown()
        setToggleShutdownModal(false)
        // TODO: Sería bueno tener un feedback de si el shutdown tuvo éxito
    }

    const handleShutdownCancel = () => {
        setToggleShutdownModal(false)
    }

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSelectChange = (value) => {
        setTcpMsg(value);
        let selectedOption = options.find(option => option.value.toLowerCase() === value.toLowerCase());
        if (!selectedOption) {
            selectedOption = options.find(option => option.label.toLowerCase() === value.toLowerCase());
        }
        if (selectedOption) {
            setTcpRequiredParams(selectedOption.params)
        }

        setTcpParam1('');
        setTcpParam2('');
    }

    const handleChangeParam1 = (event) => {
        setTcpParam1(event.target.value);
    }

    const handleChangeParam2 = (event) => {
        setTcpParam2(event.target.value);
    }

    async function onSendTCP() {
        console.log(tcpParamValues);
        
        openMessageApi('Loading...', 'loading')
        if (!deviceId && imei) {
            deviceId = imei.slice(4, 14);
        }
        // Verificamos que existe el comando
        let selectedOption = options.find(option => option.value.toLowerCase() === tcpMsg.toLowerCase());

        // Si no encontramos por valor, buscamos por label
        if (!selectedOption) {
            selectedOption = options.find(option => option.label.toLowerCase() === tcpMsg.toLowerCase());
        }

        if (selectedOption) {

            try {

                if (selectedOption.value === 'wPowerOff') {
                    showShutdownModal()
                    return;
                }
                const body = { tcpCommand: selectedOption.value, deviceId };
                const optionParams = selectedOption.params;

                // Construimos el body del request dependiendo del número de parametros necesitados por el comando
                for (let i=0; i<optionParams.length; i++) {
                    body[optionParams[i]] = tcpParamValues[i]
                }

                console.log(body);

                const response = await axios.post(
                    process.env.REACT_APP_BACKEND_HOST +'/wearer/executeTcpCommand',
                    body,
                    { 
                        headers: { Authorization: `Bearer ${tokens.AccessToken}` }
                    }
                );

                if (response.status === 200) {
                    openMessageApi('Success!', 'success')
                } else {
                    openMessageApi(`Error ${response.status}: ${response.data.message}`, 'error', 8)
                }

                console.log(selectedOption)
            } catch (error) {
                let message = 'Error Intentando enviar comando'
                if (error.isAxiosError && error.response?.data?.message) {
                    message = error.response.data.message
                }
                openMessageApi(message, 'error', 5)
                console.error(error);
            }
        } else {
            openMessageApi('Comando TCP Inválido', 'error')
        }
    }

    async function onSendMessage() {
        // console.log('success');
        // return;
        // setSendLoading(true);
        if (!deviceId && imei) {
            deviceId = imei.slice(4, 14);
        }
        if (message !== "") {
            await axios.post(process.env.REACT_APP_BACKEND_HOST +'/wearer/sendMessageToWearer', { message, deviceId }, { headers: { Authorization: `Bearer ${tokens.AccessToken}` } });
        }
        // setSendLoading(false);
    }

    async function shutDown() {
        openMessageApi('Loading...', 'loading')
        try {
            if (!deviceId && imei) {
                deviceId = imei.slice(4, 14);
            }
            const response = await axios.post(process.env.REACT_APP_BACKEND_HOST +'/wearer/powerOff', { deviceId }, { headers: { Authorization: `Bearer ${tokens.AccessToken}` } });

            console.log(response);
            if (response.status === 200) {
                openMessageApi('Success!', 'success')
            } else {
                openMessageApi(`Error ${response.status}: ${response.data.message}`, 'error')
            }
        } catch (error) {
            openMessageApi(`Error: ${error.message}`, 'error')
        }
    }

    return (

        <div className={sharedStyles.generalCard}>
            <div className={sharedStyles.cardSubContainer}>
                <div className={sharedStyles.flexCenter}>
                    <div className={sharedStyles.iconContainer}>
                        <img src={leftIcon} width={leftIconWidth} height={leftIconHeight} alt='SoyMomo Logo' />
                    </div>
                    <div className={sharedStyles.flexAndCol}>
                        <h1 className={sharedStyles.iconTitle}>{title}</h1>
                        <p className={sharedStyles.iconSubTitle}>{subtitle}</p>
                    </div>
                </div>
            </div>
            <div className={sharedStyles.metaData}>
                <h3 className={styles.comandTitle2}><strong>Enviar mensaje</strong></h3>
                <Space.Compact className={styles.inputContainer}>
                    {/* eslint-disable-next-line react/no-unknown-property */}
                    <input placeholder="Ingrese mensaje a enviar" onChange={handleChange} value={message} onKeyDown={(e) => e.key === 'Enter' && onSendMessage()} className={styles.textBox}/>
                    <div className={styles.space}/>
                    <div  className={styles.sendIcon}><FaChevronRight onClick={onSendMessage}/></div>
                </Space.Compact>
                
                <h3 className={styles.comandTitle2}><strong>Ejecutar Comando</strong></h3>
                <Space.Compact className={styles.inputContainer}>
                    <Select
                        showSearch
                        placeholder="Selecciona un comando TCP"
                        optionFilterProp="children"
                        onChange={handleSelectChange}
                        value={tcpMsg}
                        filterOption={(input, option) => {
                            setTcpMsg(input);
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }}
                        className={styles.selectBox}
                    >
                        {options.map(option => (
                            <Option key={option.value} value={option.value}>
                            {option.label}
                            </Option>
                        ))}
                    </Select>
                    <div className={styles.space}/>
                    <div  className={styles.sendIcon}><FaChevronRight onClick={onSendTCP}/></div>
                </Space.Compact>
                {/* TODO: Queda hardcoded con 2 atributos extra, no se necesitan más por ahora */}
                {tcpRequiredParams.length === 2 ?
                    <div>
                        {/* TODO: Arreglar estilos de inputs */}
                        <Space.Compact className={styles.inputContainer}>
                            {/* eslint-disable-next-line react/no-unknown-property */}
                            <input placeholder={tcpRequiredParams[0]} onChange={handleChangeParam1} value={tcpParam1} className={styles.parameterBox}/>
                            <div className={styles.parameterSpace}/>
                        </Space.Compact>
                        <Space.Compact className={styles.inputContainer}>
                            {/* eslint-disable-next-line react/no-unknown-property */}
                            <input placeholder={tcpRequiredParams[1]} onChange={handleChangeParam2} value={tcpParam2} className={styles.parameterBox}/>
                            <div className={styles.parameterSpace}/>
                        </Space.Compact>
                    </div>
                    : tcpRequiredParams.length === 1 ? 
                        <Space.Compact className={styles.inputContainer}>
                            {/* eslint-disable-next-line react/no-unknown-property */}
                            <input placeholder={tcpRequiredParams[0]} onChange={handleChangeParam1} value={tcpParam1} className={styles.parameterBox}/>
                            <div className={styles.parameterSpace}/>
                        </Space.Compact>
                    : null

                }
                {/* <Search loading={sendLoading} placeholder="Ingrese mensaje a enviar" onSearch={onSendMessage} enterButton="Enviar" className='bg-[#603BB0] hover:bg-[#3CB5C7] rounded-lg'/> */}
                <button onClick={showShutdownModal} className={styles.shutDownBtn}><strong>Apagar</strong></button>
                <button onClick={showResetModal} className={styles.shutDownBtn}><strong>Resetear Reloj</strong></button>
                <Modal
                    title="Resetear Reloj"
                    open={toggleResetModal}
                    onOk={handleResetOk}
                    onCancel={handleResetCancel}
                    okButtonProps={{ className: styles.okBtn }}
                    cancelButtonProps={{ className: styles.cancelBtn }}
                    // Add your custom styles here
                    // bodyStyle={{ /* Your custom styles */ }}
                    // You can also add a className and define your styles in a CSS file
                    className="my-custom-modal-class"
                >
                    Estás seguro/a que quieres resetear el reloj a sus configuraciones de fábrica?
                </Modal>
                <Modal
                    title="Apagar Reloj"
                    open={toggleShutdownModal}
                    onOk={handleShutdownOk}
                    onCancel={handleShutdownCancel}
                    okButtonProps={{ className: styles.okBtn }}
                    cancelButtonProps={{ className: styles.cancelBtn }}
                    // Add your custom styles here
                    // bodyStyle={{ /* Your custom styles */ }}
                    // You can also add a className and define your styles in a CSS file
                    className="my-custom-modal-class"
                >
                    Estás seguro/a que quieres apagar el reloj?
                </Modal>
            </div>
        </div>

    )
}
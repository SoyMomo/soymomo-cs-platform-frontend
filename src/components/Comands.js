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
    const { tokens } = useAuth();
    const { Option } = Select;

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

    // function onSearchCambiarReloj(value) {
    //     console.log(value)
    // }

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSelectChange = (value) => {
        setTcpMsg(value);
    }

    async function onSendTCP() {
        console.log(tcpMsg);
        const selectedOption = options.find(option => option.label === tcpMsg);

        if (selectedOption) {
            // TODO: Send TCP Command with selectedOption.value
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
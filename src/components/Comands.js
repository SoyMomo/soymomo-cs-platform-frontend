import React, { useState } from 'react';
import axios from 'axios';
import { Space, Modal, Select } from 'antd';
import { useAuth } from "../authContext";
import styles from "../styles/Commands.module.css"
import sharedStyles from "../styles/Common.module.css"
import { FaChevronRight } from "react-icons/fa";


export default function ComandsComponent(Props) {

    // const [sendLoading, setSendLoading] = useState(false);
    const [message, setMessage] = useState("")
    const [toggleResetModal, setToggleResetModal] = useState(false);
    const [toggleShutdownModal, setToggleShutdownModal] = useState(false);
    const { tokens } = useAuth();

    const { Option } = Select;

    // eslint-disable-next-line no-unused-vars
    const [options, setOptions] = useState([
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        // ... more options
    ]);

    const showResetModal = () => {
        setToggleResetModal(true)
    }

    const handleResetOk = () => {
        resetWatch()
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
        apagar()
        setToggleShutdownModal(false)
        // TODO: Sería bueno tener un feedback de si el shutdown tuvo éxito
    }

    const handleShutdownCancel = () => {
        setToggleShutdownModal(false)
    }

    // function onSearchCambiarReloj(value) {
    //     console.log(value)
    // }

    const handleChange = (message) => {
        setMessage(message)
    }

    async function onSendMessage(message) {
        // setSendLoading(true);
        let deviceId;
        if (Props.imei) {
            deviceId = Props.imei.slice(4, 14);
        } else {
            deviceId = Props.deviceId;
        }
        if (message !== "") {
            await axios.post(process.env.REACT_APP_BACKEND_HOST +'/wearer/sendMessageToWearer', { message, deviceId }, { headers: { Authorization: `Bearer ${tokens.AccessToken}` } });
        }
        // setSendLoading(false);
    }

    async function apagar() {
        let deviceId;
        if (Props.imei) {
            deviceId = Props.imei.slice(4, 14);
        } else {
            deviceId = Props.deviceId;
        }
        await axios.post(process.env.REACT_APP_BACKEND_HOST +'/wearer/powerOff', { deviceId }, { headers: { Authorization: `Bearer ${tokens.AccessToken}` } });
    }

    async function resetWatch() {
        // TODO: RESET WATCH FUNCTION
    }

    return (

        <div className={sharedStyles.generalCard}>
            <div className={sharedStyles.cardSubContainer}>
                <div className={sharedStyles.flexCenter}>
                    <div className={sharedStyles.iconContainer}>
                        <img src={Props.leftIcon} width={Props.leftIconWidth} height={Props.leftIconHeight} alt='SoyMomo Logo' />
                    </div>
                    <div className={sharedStyles.flexAndCol}>
                        <h1 className={sharedStyles.iconTitle}>{Props.title}</h1>
                        <p className={sharedStyles.iconSubTitle}>{Props.subtitle}</p>
                    </div>
                </div>
            </div>
            <div className={sharedStyles.metaData}>
                <h3 className={styles.comandTitle2}><strong>Enviar mensaje</strong></h3>
                <Space.Compact className={styles.inputContainer}>
                    {/* eslint-disable-next-line react/no-unknown-property */}
                    <input placeholder="Ingrese mensaje a enviar" onChange={handleChange} value={message} onPressEnter={onSendMessage} className={styles.textBox}/>
                    <div className={styles.space}/>
                    <div  className={styles.sendIcon}><FaChevronRight onClick={onSendMessage}/></div>
                </Space.Compact>
                <h3 className={styles.comandTitle2}><strong>Ejecutar Comando</strong></h3>
                <Space.Compact className={styles.inputContainer}>
                    <Select
                        showSearch
                        placeholder="Selecciona un comando TCP"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        className={styles.selectBox}
                    >
                        {options.map(option => (
                            <Option key={option.value} value={option.value}>
                            {option.label}
                            </Option>
                        ))}
                    </Select>
                    <div className={styles.space}/>
                    <div  className={styles.sendIcon}><FaChevronRight onClick={onSendMessage}/></div>
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
                    Estás seguro/a que quieres resetear el reloj?
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
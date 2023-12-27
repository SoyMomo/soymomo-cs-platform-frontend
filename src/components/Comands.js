import React, { useState } from 'react';
import axios from 'axios';
import { Space } from 'antd';
import { useAuth } from "../authContext";
import styles from "../styles/Commands.module.css"
import sharedStyles from "../styles/Common.module.css"
import { FaChevronRight } from "react-icons/fa";


export default function ComandsComponent(Props) {

    // const [sendLoading, setSendLoading] = useState(false);
    const [message, setMessage] = useState("")
    const { tokens } = useAuth();

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
                <h3 className={styles.comandTitle2}><strong>Enviar mensaje a reloj</strong></h3>
                <Space.Compact className={styles.inputContainer}>
                    <input placeholder="Ingrese mensaje a enviar" onChange={handleChange} value={message} onPressEnter={onSendMessage} className={styles.textBox}/>
                    <div className={styles.space}/>
                    <div  className={styles.sendIcon}><FaChevronRight onClick={onSendMessage}/></div>
                </Space.Compact>
                {/* <Search loading={sendLoading} placeholder="Ingrese mensaje a enviar" onSearch={onSendMessage} enterButton="Enviar" className='bg-[#603BB0] hover:bg-[#3CB5C7] rounded-lg'/> */}
                <button onClick={apagar} className={styles.shutDownBtn}>Apagar</button>
            </div>
        </div>

    )
}
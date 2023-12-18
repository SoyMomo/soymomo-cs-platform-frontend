import React, { useState } from 'react';
import axios from 'axios';
import { Input, Space, Button } from 'antd';
import { useAuth } from "../authContext";
import styles from "../styles/Commands.module.css"
import sharedStyles from "../styles/Common.module.css"
import { FaChevronRight } from "react-icons/fa";

const { Search } = Input;

export default function ComandsComponent(Props) {

    const [sendLoading, setSendLoading] = useState(false);
    const [message, setMessage] = useState("")
    const { tokens } = useAuth();

    // function onSearchCambiarReloj(value) {
    //     console.log(value)
    // }

    const handleChange = (message) => {
        setMessage(message)
    }

    async function onSendMessage(message) {
        setSendLoading(true);
        let deviceId;
        if (Props.imei) {
            deviceId = Props.imei.slice(4, 14);
        } else {
            deviceId = Props.deviceId;
        }
        if (message !== "") {
            await axios.post(process.env.REACT_APP_BACKEND_HOST +'/wearer/sendMessageToWearer', { message, deviceId }, { headers: { Authorization: `Bearer ${tokens.AccessToken}` } });
        }
        setSendLoading(false);
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
                <h3 style={{ fontSize: '1rem', color: '#603BB0', marginLeft: '0.75rem', textAlign:'start', marginTop: '0.5rem', marginBottom: '0.5rem' }}><strong>Enviar mensaje a reloj</strong></h3>
                <Space.Compact style={{ width: '100%' }}>
                    <input placeholder="Ingrese mensaje a enviar" loading={sendLoading} onChange={handleChange} onPressEnter={onSendMessage} style={{padding: 5}} className='w-full border-2 border-slate-300 rounded-lg'/>
                    <div className='flex w-3'/>
                    <div  className='flex items-center px-2 rounded-3xl aspect-square hover:bg-slate-300 hover:cursor-pointer'><FaChevronRight onClick={onSendMessage}/></div>
                </Space.Compact>
                {/* <Search loading={sendLoading} placeholder="Ingrese mensaje a enviar" onSearch={onSendMessage} enterButton="Enviar" className='bg-[#603BB0] hover:bg-[#3CB5C7] rounded-lg'/> */}
                <button onClick={apagar} style={{backgroundColor: '#F93C7C', color: 'white', padding: '0.25rem', borderRadius: '1rem', width: '100%', marginTop: '0.5rem'}}>Apagar</button>
            </div>
        </div>

    )
}
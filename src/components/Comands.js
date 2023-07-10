import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import AuthContext from "../authContext";

const { Search } = Input;

export default function ComandsComponent(Props) {

    const [searchLoading, setSearchLoading] = useState(false);
    const { tokens } = useContext(AuthContext);

    // function onSearchCambiarReloj(value) {
    //     console.log(value)
    // }

    async function onSearchMessage(message) {
        setSearchLoading(true);
        let deviceId;
        if (Props.imei) {
            deviceId = Props.imei.slice(4, 14);
        } else {
            deviceId = Props.deviceId;
        }
        await axios.post(process.env.REACT_APP_BACKEND_HOST +'/wearer/sendMessageToWearer', { message, deviceId }, { headers: { Authorization: `Bearer ${tokens.AccessToken}` } });
        setSearchLoading(false);
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

        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', marginBottom: '0.625rem', maxWidth: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '1rem' }}>
                        <img src={Props.leftIcon} width={Props.leftIconWidth} height={Props.leftIconHeight} alt='SoyMomo Logo' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#603BB0', marginLeft: '0.75rem' }}>{Props.title}</h1>
                        <p style={{ fontSize: '0.875rem', color: '#603BB0', alignSelf: 'flex-start', marginLeft: '0.75rem' }}>{Props.subtitle}</p>
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: '100%', marginTop: '0.75rem' }}>
                {/* <h3 style={{ fontSize: '1rem', color: '#603BB0', marginLeft: '0.75rem' }}>Cambiar reloj (transferir info.)</h3>
                <Search loading={isLoading} placeholder="Imei/ID nuevo" onSearch={onSearchCambiarReloj} style={{ padding: 5 }} /> */}
                <h3 style={{ fontSize: '1rem', color: '#603BB0', marginLeft: '0.75rem', textAlign:'start', marginTop: '0.5rem', marginBottom: '0.5rem' }}><strong>Enviar mensaje a reloj</strong></h3>
                <Search loading={searchLoading} placeholder="Ingrese mensaje a enviar" onSearch={onSearchMessage} style={{ padding: 5 }} />

                {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flexBasis: '50%', display: 'flex', flexDirection: 'column' }}>
                        <button onClick={filtroLlamadas} style={{backgroundColor: '#32B8C0', color: 'white', padding: '0.25rem', borderRadius: '1rem', width: '95%', marginTop: '0.5rem' }}>Filtro llamadas</button>
                        <button onClick={hacerSonar} style={{backgroundColor: '#32B8C0', color: 'white', padding: '0.25rem', borderRadius: '1rem', width: '95%', marginTop: '0.5rem'}}>Hacer sonar </button>
                        <button onClick={factory} style={{backgroundColor: '#32B8C0', color: 'white', padding: '0.25rem', borderRadius: '1rem', width: '95%', marginTop: '0.5rem'}}>Factory</button>
                    </div>
                    <div style={{ flexBasis: '50%', display: 'flex', flexDirection: 'column' }}>
                        <button onClick={cargarConfiguracion} style={{backgroundColor: '#32B8C0', color: 'white', padding: '0.25rem', borderRadius: '1rem', width: '95%', marginTop: '0.5rem'}}>Cargar configuración</button>
                        <button onClick={cargarContactos} style={{backgroundColor: '#32B8C0', color: 'white', padding: '0.25rem', borderRadius: '1rem', width: '95%', marginTop: '0.5rem'}}>Cargar contactos</button>
                        <button onClick={resetear} style={{backgroundColor: '#32B8C0', color: 'white', padding: '0.25rem', borderRadius: '1rem', width: '95%', marginTop: '0.5rem'}}>Resetear</button>
                    </div>
                </div> */}
                <button onClick={apagar} style={{backgroundColor: '#F93C7C', color: 'white', padding: '0.25rem', borderRadius: '1rem', width: '100%', marginTop: '0.5rem'}}>Apagar</button>
            </div>
        </div>

    )
}
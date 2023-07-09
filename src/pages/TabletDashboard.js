import MainLayout from '../layouts/layout';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Row, Space, Col, Input } from 'antd'
import { aplicationColumns, userColumns } from '../components/tables/tabletColumns';
//import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import TableComponent from '../components/tables/table'
import useQuery from '../utils/hooks/UseQuery';
import ComandsComponent from '../components/Comands';
import DugHistoryCard from '../components/DugHistoryCard';
import PersonalInfoTablet from '../components/personalInfoTablet';
import { useNavigate } from 'react-router-dom';


const { Search } = Input;

async function getAplicationsData() {
    const aplicationsData = [];
    for (let i = 0; i < 100; i++) {
        aplicationsData.push({
            key: i,
            name: `Netflix ${i}`,
            installed: `Si`,
            allowed: `No permitido.`,
        });
    }
    return aplicationsData;
}

async function getUsersData() {
    const usersData = [];
    for (let i = 0; i < 100; i++) {
        usersData.push({
            key: i,
            name: `Usuario ${i}`,
            email: `francisco.ordenes@gmail.com`,
            bd: `Si`,
            os: `Android`,
            version: `10`,
            country: `Chile`
        });
    }
    return usersData;
}

async function getDugHistory() {
    const dugHistory = [];
    for (let i = 0; i < 100; i++) {
        dugHistory.push({
            image: "/images/aaa.png",
            date: "2020-10-10",
            category: "Porn",
            app: "Youtube",
            time: "10:00",
        });
    }
    return dugHistory;
}

async function getPersonalInfo() {
    const personalInfo = {
        name: "Francisco",
        email: "francisco@ordenes.gmail",
        pin: "1111",
        model: "Samsung Galaxy S10",
        software: "Android 10",
        country: "Chile",
        internet: "Activado",
        blocked: "Desactivado",
        detection: "Activado",
        cyberbulling: "Activado",
        bd: "7 de febrero de 2020",
        lastModification: "31 de octubre de 2020",
        lastStats: "31 de octubre de 2020",
        birthday: "31 de febrero de 2025",
        hardware: "Samsung Galaxy S10",
        brandHardware: "Samsung",
        battery: "Buena"
    }
    return personalInfo;
}



//<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
export default function TabletDashboard() {

    const [aplicationsData, setAplicationsData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [dugHistory, setDugHistory] = useState([]);
    const [personalInfo, setPersonalInfo] = useState([]);

    let query = useQuery();
    const [wearer, setWearer] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const hid = query.get('hid');
        if (!hid) {
            navigate('/404');
            return
        }
        const getWearer = async () => {
            const deviceId = query.get('deviceId');
            const imei = query.get('imei');
            let params = {};
            if (deviceId) {
                params = { deviceId };
            } else if (imei) {
                params = { imei };
            }
            const response = await axios.get('http://localhost/wearer/getWearerByDeviceIdOrImei', { params });
            setWearer(response.data.data[0]);
        }
        getWearer().catch(console.error);
    }, [query, navigate])

    useEffect(() => {
        console.log(wearer)
    }, [wearer])



    useEffect(() => {
        getAplicationsData().then((data) => {
            setAplicationsData(data);
        });
        getUsersData().then((data) => {
            setUsersData(data);
        });
        getDugHistory().then((data) => {
            setDugHistory(data);
        });
        getPersonalInfo().then((data) => {
            setPersonalInfo(data);
        });



    }, []);

    async function onSearch(value) {
        console.log(value);
    }


    return (
        <MainLayout
            children={
                <>
                    <div style={{ padding: 20 }}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 500, padding: 5 }} />
                        <h1>{wearer.firstName}</h1>
                        <Space direction="vertical" size={24} style={{ display: 'flex' }}>
                            <Row gutter={[24, 32]}>
                                <Col xs={24} sm={24} md={24} lg={16} xl={16}>

                                    {/* Dimensiones 240 + 24 + 424 + 24 + 256 = 968 */}
                                    <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                                        {/* Nombre, numero, imei: card principal */}

                                        {/* Nombre, numero, imei: card principal */}

                                        {/* Datos principales y Ultima conexion con SoyMomoSIM */}
                                        <Row gutter={[24, 32]}>

                                            {/* Datos principales */}
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>

                                            </Col>
                                            {/* Datos principales */}

                                            {/* Ultima conexion con SoyMomoSIM */}
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                                                    {/* Ultima conexion */}

                                                    {/* Ultima conexion */}

                                                    {/* SoyMomoSIM */}

                                                    {/* SoyMomoSIM */}

                                                </Space>
                                            </Col>
                                            {/* Ultima conexion con SoyMomoSIM */}

                                        </Row>
                                        {/* Datos principales y Ultima conexion con SoyMomoSIM */}

                                        {/* Historial de bateria */}


                                        {/* Historial de bateria */}

                                    </Space>

                                </Col>

                                <Col xs={24} sm={12} md={12} lg={8} xl={8}>

                                    {/* Dimensiones 120 + 24 + 400 + 24 + 400 = 968 */}
                                    <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                                        {/* Ultima actualizacion */}

                                        {/* Ultima actualizacion */}

                                        {/* Comandos */}
                                        {/* Comandos */}


                                        {/* Ajustes reloj */}

                                        {/* Ajustes reloj */}

                                    </Space>

                                </Col>
                            </Row>



                            <Space direction="vertical" size={12} style={{ display: 'flex' }}>
                                    <PersonalInfoTablet
                                        personalInfo={personalInfo}
                                    />

                                <Row>
                                    <TableComponent
                                        columns={aplicationColumns}
                                        data={aplicationsData}
                                        leftIcon="/images/tableIcons/cs-aplicationsTablet.svg"
                                        leftIconHeight={29}
                                        leftIconWidth={38}
                                        refreshLink="/api/refresh"
                                        title='Aplicaciones'
                                        subtitle='Tablet'
                                    />
                                </Row>
                                <Row>
                                    <TableComponent
                                        columns={userColumns}
                                        data={usersData}
                                        leftIcon="/images/tableIcons/cs-usersIcon.svg"
                                        leftIconHeight={29}
                                        leftIconWidth={38}
                                        refreshLink="/api/refresh"
                                        title='Usuarios'
                                        subtitle='Tablet'
                                    />
                                </Row>

                                <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', marginBottom: '0.625rem', maxWidth: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '1rem' }}>
                                                <img src="/images/tableIcons/cs-history.svg" width={23} height={23} alt='SoyMomo Logo' />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#603BB0', marginLeft: '0.75rem' }}>Historial de Dugs</h1>
                                                <p style={{ fontSize: '0.875rem', color: '#603BB0', alignSelf: 'flex-start', marginLeft: '0.75rem' }}>Tablet</p>
                                            </div>
                                        </div>
                                        <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                                            <img src="/images/tableIcons/cs-refreshIcon.svg" width={16} height={16} alt='SoyMomo Logo' />
                                        </div>
                                    </div>
                                    <div style={{ maxWidth: '100%', marginTop: '0.75rem', display: "flex", flexWrap: 'wrap', overflow: 'auto', scrollbarColor: 'dark', maxHeight: '300px' }}>
                                        {dugHistory.length > 0 &&
                                            dugHistory.map((item, index) => {
                                                return (
                                                    <DugHistoryCard
                                                        image={item.image}
                                                        date={item.date}
                                                        category={item.category}
                                                        app={item.app}
                                                        time={item.time}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                            </Space>
                        </Space>
                    </div>
                </>
            }
        />
    )
}




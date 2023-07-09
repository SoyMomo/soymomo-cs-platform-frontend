import MainLayout from '../layouts/layout';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Row, Space, Col, Input, DatePicker } from 'antd'
import { aplicationColumns, userColumns } from '../components/tables/tabletColumns';
//import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import TableComponent from '../components/tables/table'
import useQuery from '../utils/hooks/UseQuery';
import ComandsComponent from '../components/Comands';
import DugHistoryCard from '../components/DugHistoryCard';
import PersonalInfoTablet from '../components/personalInfoTablet';
import { useNavigate } from 'react-router-dom';
import { getTablet, getInstalledApps, getTabletUsers, getDugHistory } from '../services/tabletService.js';

const { RangePicker } = DatePicker;


const { Search } = Input;

//<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
export default function TabletDashboard() {

    const [aplicationsData, setAplicationsData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [dugHistory, setDugHistory] = useState([]);
    const [personalInfo, setPersonalInfo] = useState([]);
    const [dugFromDate, setDugFromDate] = useState(null);
    const [dugToDate, setDugToDate] = useState(null);

    let query = useQuery();
    const [tablet, setTablet] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const hid = query.get('hid');
        if (!hid) {
            navigate('/404');
            return
        } else {
            getTablet(hid).then((tablet) => {
                if (!tablet) navigate('/404');
                setTablet(tablet);
            }).catch(() => {
            });
        }        
    }, [query, navigate])

    useEffect(() => {
        if (tablet) {
            setPersonalInfo(tablet);

            getTabletUsers(tablet.hid).then((users) => {
                setUsersData(users);
            }).catch(console.error);

            getInstalledApps(tablet.objectId).then((apps) => {
                setAplicationsData(apps);
            }).catch(console.error);
        }
    }, [tablet])

    useEffect(() => {
        if (tablet) {
            if (dugFromDate !== null && dugToDate !== null) {
                getDugHistory(dugFromDate, dugToDate, tablet.hid).then((dugHistory) => {
                    setDugHistory(dugHistory);
                }).catch(console.error);
            }
        }
    }, [dugFromDate, dugToDate, tablet])

    async function onSearch(value) {
        console.log(value);
    }


    return (
        <MainLayout
            children={
                <>
                    <div style={{ padding: 20 }}>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 500, padding: 5 }} />
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
                                                        key={index}
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
                                    <RangePicker onChange={(dates, dateString)=> {
                                            setDugFromDate(dateString[0])
                                            setDugToDate(dateString[1])
                                        }
                                    } />
                                </div>

                            </Space>
                        </Space>
                    </div>
                </>
            }
        />
    )
}



